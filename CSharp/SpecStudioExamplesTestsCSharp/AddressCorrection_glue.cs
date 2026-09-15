namespace SpecStudioExamplesTestsCSharp.AddressCorrection
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Net;
    using SpecStudioExamplesTestsCSharp;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    /// <summary>
    /// Glue for a specification that tests a live service.
    ///
    /// There are no production classes: the Census Bureau geocoder is the thing
    /// under test. So this file does only three things -- build the call, hand
    /// the reply to the generated FromJSON, and compare. It never touches the
    /// JSON itself.
    ///
    /// That is possible because the attribute sets in the specification mirror
    /// the shape of the reply, so ResponseTyped.FromJSON reads all of it. Glue
    /// navigating a reply is a sign the specification is not describing it
    /// honestly.
    /// </summary>
    public class AddressCorrection_glue
    {
        const string DNCString = "?DNC?";

        private string _baseUrl;
        private RestCall _response;

        public void Given_base_Page_is(List<List<string>> values)
        {
            _baseUrl = values[0][0];
        }

        public void When_sending_request(List<RequestString> values)
        {
            var request = values[0];
            _response = RestCall.Send(request.method, _baseUrl, request.page,
                                      Query(request), "");
        }

        public void Then_response_status_is(List<StatusString> values)
        {
            AreEqual(values[0].ToStatusTyped().code, _response.Status,
                     "HTTP status from " + _response.Url);
        }

        public void Then_the_matched_addresses_are(List<MatchString> values)
        {
            var actual = new List<MatchString>(Matches());
            AreEqual(values.Count, actual.Count,
                     "number of matches\n  expected: " + Show(values)
                     + "\n  actual:   " + Show(actual));

            // Compared as a set rather than in order: each expected row must
            // find an actual row it has not already claimed. A test that fails
            // because a service reordered its results is testing the wrong
            // thing.
            //
            // The comparison is on the String form, not the Typed one. Only the
            // String classes skip a field marked ?DNC?, which is what makes a
            // CompareOnly table check its own columns and no others.
            foreach (var expected in values)
            {
                var found = actual.FindIndex(candidate => candidate.Equals(expected));
                IsTrue(found >= 0, "no returned address matched " + expected
                                   + "\n  remaining: " + Show(actual));
                actual.RemoveAt(found);
            }
        }

        public void Then_there_are_no_matched_addresses()
        {
            AreEqual(0, Matches().Count,
                     "expected no match for an address that does not exist");
        }

        // ---- the two translations -------------------------------------------

        /// <summary>The query string the geocoder expects, from the fields of the table.</summary>
        private static string Query(RequestString request)
        {
            return "?address=" + WebUtility.UrlEncode(request.address)
                 + "&benchmark=" + WebUtility.UrlEncode(request.benchmark)
                 + "&format=" + WebUtility.UrlEncode(request.format);
        }

        /// <summary>The reply, read by the generated reader, as the rows a table compares.</summary>
        private List<MatchString> Matches()
        {
            var reply = ResponseTyped.FromJSON(_response.Body);
            return MatchTyped.ToStringList(reply.result.addressMatches);
        }

        private static string Show(List<MatchString> rows)
        {
            return "[" + string.Join(", ", rows) + "]";
        }
    }
}
