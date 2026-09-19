namespace SpecStudioExamplesTestsCSharp.API
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Text.Json;
    using System.Text.RegularExpressions;
    using SpecStudioExamplesTestsCSharp;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    /// <summary>
    /// Exercises a live REST API over HTTP.
    ///
    /// There are no production classes behind this one: the API itself is the
    /// thing under test. RestCall does the transport, so what is left here is
    /// only the three things glue should do -- turn a table into JSON with the
    /// generated ToJSON(), turn the reply back into objects with the generated
    /// FromJSON(), and compare whole objects with Equals.
    ///
    /// The status and the body are separate steps because they come from
    /// separate places. Keeping them apart is what lets the body go straight
    /// through the generated reader: while a status was mixed into the body's
    /// attribute set, the reader demanded a "status" field no API response ever
    /// contains.
    ///
    /// Two rules this file follows, and did not always. It never touches JSON:
    /// every reply goes through PostTyped.FromJSON or FromJSONList. And it
    /// compares objects rather than fields: a full table becomes a PostTyped so
    /// the comparison covers the conversion as well as the text, while a
    /// CompareOnly table leaves its unstated columns holding ?DNC?, which only
    /// the String class skips, so that case compares PostString instead.
    /// </summary>
    public class API_glue
    {
        const string DNCString = "?DNC?";

        private string _basePage = "";

        /// <summary>Bodies offered by Given steps, keyed by the attribute set that carried them.</summary>
        private readonly Dictionary<string, string> _bodies = new Dictionary<string, string>();

        private RestCall _call;

        // ---- given -----------------------------------------------------------

        public void Given_base_Page_is(List<List<string>> values)
        {
            foreach (var row in values)
                foreach (var cell in row)
                    if (cell.Trim().Length > 0) _basePage = cell.Trim();

            IsTrue(_basePage.Length > 0, "no base Page given");
        }

        public void Given_new_post_data(List<NewPostString> values)
        {
            foreach (var value in values)
                _bodies["NewPost"] = value.ToNewPostTyped().ToJSON();
        }

        public void Given_replacement_data(List<ReplacePostString> values)
        {
            foreach (var value in values)
                _bodies["ReplacePost"] = value.ToReplacePostTyped().ToJSON();
        }

        public void Given_patch_data(List<PatchTitleString> values)
        {
            foreach (var value in values)
                _bodies["PatchTitle"] = value.ToPatchTitleTyped().ToJSON();
        }

        // ---- when ------------------------------------------------------------

        public void When_sending_request(List<ApiRequestString> values)
        {
            foreach (var value in values)
            {
                var request = value.ToApiRequestTyped();

                // Body names an attribute set a Given step already turned into JSON.
                var bodyName = (request.body ?? "").Trim();
                var payload = "";
                if (bodyName.Length > 0)
                {
                    IsTrue(_bodies.ContainsKey(bodyName),
                           "no Given step supplied a body named " + bodyName);
                    payload = _bodies[bodyName];
                }

                try
                {
                    _call = RestCall.Send(request.method, _basePage,
                                          request.page, request.parameter, payload);
                }
                catch (InvalidOperationException e)
                {
                    Fail(e.Message);
                }
            }
        }

        // ---- then ------------------------------------------------------------

        public void Then_response_status_is(List<ApiStatusString> values)
        {
            IsNotNull(_call, "no request was sent");

            foreach (var expected in values)
                AreEqual(expected.ToApiStatusTyped().code, _call.Status,
                         "HTTP status from " + _call.Url);
        }

        public void Then_response_body_is(List<PostString> values)
        {
            IsNotNull(_call, "no request was sent");

            var actual = PostTyped.FromJSON(_call.Body);

            foreach (var expected in values)
                ComparePost("", expected, actual);
        }

        public void Then_response_array_contains_this_many_items(List<List<string>> values)
        {
            IsNotNull(_call, "no request was sent");

            var expected = int.Parse(values[0][0].Trim(), CultureInfo.InvariantCulture);

            AreEqual(expected, PostTyped.FromJSONList(_call.Body).Count,
                     "number of items returned by " + _call.Url);
        }

        // ---- the one comparison ----------------------------------------------

        /// <summary>
        /// One expected row against one returned post.
        ///
        /// A table that states every column is compared typed, so that the
        /// values are checked as the types the specification declares and not
        /// merely as matching text. A CompareOnly table cannot be: its unstated
        /// columns hold ?DNC?, which has no typed meaning, and only the String
        /// class knows to skip it. So that case compares the string form of both
        /// sides instead.
        /// </summary>
        private static void ComparePost(string where, PostString expected, PostTyped actual)
        {
            if (StatesEveryColumn(expected))
                AreEqual(expected.ToPostTyped(), actual, where + "post");
            else
                AreEqual(expected, actual.ToPostString(), where + "post");
        }

        /// <summary>False when any column was left to CompareOnly, and so holds ?DNC?.</summary>
        private static bool StatesEveryColumn(PostString row)
        {
            return row.userId != DNCString
                && row.id != DNCString
                && row.title != DNCString
                && row.body != DNCString;
        }
    }
}
