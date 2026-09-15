namespace SpecStudioExamplesTestsCSharp
{
    using System;
    using System.Net.Http;
    using System.Text;

    /// <summary>
    /// The transport for a specification that tests a live service.
    ///
    /// It lives beside the glue rather than in common/, which every build
    /// rewrites. It knows nothing about addresses: give it the pieces of a call
    /// and it returns the status and the body. Deciding what the answer should
    /// be is the specification's job, and comparing is the glue's.
    ///
    /// A call that cannot be made at all throws, naming the URL. That is a
    /// broken test rather than a failed assertion, and the two should not look
    /// alike in the output.
    /// </summary>
    public class RestCall
    {
        private static readonly HttpClient Client =
            new HttpClient { Timeout = TimeSpan.FromSeconds(30) };

        public int Status { get; }
        public string Body { get; }
        public string Url { get; }

        private RestCall(int status, string body, string url)
        {
            Status = status;
            Body = body;
            Url = url;
        }

        /// <summary>
        /// Sends one request and returns the result.
        /// </summary>
        /// <param name="parameter">
        /// Appended after the page. A parameter beginning with '?' is a query
        /// string and is appended as it stands; anything else is a path segment
        /// and is joined with a slash. So posts/1 is page "posts" with parameter
        /// "1", and a search is page "search" with parameter "?q=hat".
        /// </param>
        public static RestCall Send(string method, string baseUrl, string page,
                                    string parameter, string request)
        {
            var url = BuildUrl(baseUrl, page, parameter);
            var verb = (method ?? string.Empty).Trim().ToUpperInvariant();

            var message = new HttpRequestMessage(new HttpMethod(verb), url);
            message.Headers.Add("Accept", "application/json");
            if (!string.IsNullOrWhiteSpace(request))
                message.Content = new StringContent(request, Encoding.UTF8, "application/json");

            try
            {
                var response = Client.Send(message);
                var body = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                return new RestCall((int)response.StatusCode, body ?? string.Empty, url);
            }
            catch (Exception e)
            {
                // An unreachable service is a failed call, not a failed
                // assertion; the glue turns this into a test failure naming the
                // URL.
                throw new InvalidOperationException("Could not call " + url + " -- " + e.Message, e);
            }
        }

        /// <summary>Joins the pieces with exactly one slash, dropping any that are empty.</summary>
        internal static string BuildUrl(string baseUrl, string page, string parameter)
        {
            var url = new StringBuilder(TrimSlashes(baseUrl));

            var cleanPage = TrimSlashes(page);
            if (cleanPage.Length > 0) url.Append('/').Append(cleanPage);

            if (!string.IsNullOrEmpty(parameter))
            {
                if (parameter.StartsWith("?", StringComparison.Ordinal))
                    url.Append(parameter);
                else
                    url.Append('/').Append(TrimSlashes(parameter));
            }
            return url.ToString();
        }

        private static string TrimSlashes(string s)
        {
            return (s ?? string.Empty).Trim().Trim('/');
        }
    }
}
