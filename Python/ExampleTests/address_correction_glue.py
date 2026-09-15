"""Glue for a specification that tests a live service.

There are no production classes: the Census Bureau geocoder is the thing under
test. So this file does only three things -- build the call, hand the reply to
the generated from_json, and compare. It never touches the JSON itself.

That is possible because the attribute sets in the specification mirror the
shape of the reply, so ResponseTyped.from_json reads all of it. Glue navigating
a reply is a sign the specification is not describing it honestly.
"""
import urllib.parse

from common import *
from rest_call import RestCall, RestCallFailed


class AddressCorrectionGlue:
    DNC_STRING = '?DNC?'

    def __init__(self):
        self.base_url = ''
        self.response = None

    def given_base_page_is(self, values: list):
        self.base_url = values[0][0]

    def when_sending_request(self, values: list):
        request = values[0]
        try:
            self.response = RestCall.send(request.method, self.base_url,
                                          request.page, _query(request), '')
        except RestCallFailed as error:
            raise AssertionError(str(error))

    def then_response_status_is(self, values: list):
        expected = StatusTyped.from_string_obj(values[0])
        assert expected.code == self.response.status, \
            'HTTP status from %s: expected %d but was %d' % (
                self.response.url, expected.code, self.response.status)

    def then_the_matched_addresses_are(self, values: list):
        actual = list(self._matches())
        assert len(values) == len(actual), \
            'number of matches\n  expected: %s\n  actual:   %s' % (values, actual)

        # Compared as a set rather than in order: each expected row must find an
        # actual row it has not already claimed. A test that fails because a
        # service reordered its results is testing the wrong thing.
        #
        # The comparison is on the String form, not the Typed one. Only the
        # String classes skip a field marked ?DNC?, which is what makes a
        # CompareOnly table check its own columns and no others.
        for expected in values:
            match = next((i for i, c in enumerate(actual) if c == expected), None)
            assert match is not None, \
                'no returned address matched %s\n  remaining: %s' % (expected, actual)
            actual.pop(match)

    def then_there_are_no_matched_addresses(self):
        assert len(self._matches()) == 0, \
            'expected no match for an address that does not exist'

    # ---- the two translations --------------------------------------------

    def _matches(self) -> list:
        """The reply, read by the generated reader, as the rows a table compares."""
        reply = ResponseTyped.from_json(self.response.body)
        return MatchTyped.to_string_list(reply.result.address_matches)


def _query(request) -> str:
    """The query string the geocoder expects, from the fields of the table."""
    return ('?address=' + urllib.parse.quote_plus(request.address)
            + '&benchmark=' + urllib.parse.quote_plus(request.benchmark)
            + '&format=' + urllib.parse.quote_plus(request.format))
