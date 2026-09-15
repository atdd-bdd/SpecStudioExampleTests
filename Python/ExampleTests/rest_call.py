"""The transport for a specification that tests a live service.

It lives beside the glue rather than in common/, which every build rewrites. It
knows nothing about addresses: give it the pieces of a call and it returns the
status and the body. Deciding what the answer should be is the specification's
job, and comparing is the glue's.

A call that cannot be made at all raises, naming the URL. That is a broken test
rather than a failed assertion, and the two should not look alike in the output.
"""
import urllib.error
import urllib.request

TIMEOUT_SECONDS = 30


class RestCallFailed(Exception):
    """An unreachable service: a failed call, not a failed assertion."""


class RestCall:
    def __init__(self, status: int, body: str, url: str):
        self.status = status
        self.body = body
        self.url = url

    @staticmethod
    def send(method: str, base_url: str, page: str, parameter: str, request: str) -> 'RestCall':
        """Sends one request and returns the result.

        A parameter beginning with '?' is a query string and is appended as it
        stands; anything else is a path segment and is joined with a slash. So
        posts/1 is page "posts" with parameter "1", and a search is page
        "search" with parameter "?q=hat".
        """
        url = build_url(base_url, page, parameter)
        verb = (method or '').strip().upper()

        payload = None
        if request and request.strip():
            payload = request.encode('utf-8')

        http_request = urllib.request.Request(
            url, data=payload, method=verb,
            headers={'Accept': 'application/json',
                     'Content-Type': 'application/json; charset=UTF-8'})

        try:
            with urllib.request.urlopen(http_request, timeout=TIMEOUT_SECONDS) as response:
                body = response.read().decode('utf-8')
                return RestCall(response.status, body, url)
        except urllib.error.HTTPError as error:
            # A 4xx or 5xx is an answer, not a failure -- the specification
            # states status codes and some of them are meant to be errors.
            body = error.read().decode('utf-8') if error.fp else ''
            return RestCall(error.code, body, url)
        except Exception as error:
            raise RestCallFailed('Could not call %s -- %s' % (url, error))


def build_url(base_url: str, page: str, parameter: str) -> str:
    """Joins the pieces with exactly one slash, dropping any that are empty."""
    url = (base_url or '').strip().strip('/')

    clean_page = (page or '').strip().strip('/')
    if clean_page:
        url += '/' + clean_page

    if parameter:
        if parameter.startswith('?'):
            url += parameter
        else:
            url += '/' + parameter.strip().strip('/')
    return url
