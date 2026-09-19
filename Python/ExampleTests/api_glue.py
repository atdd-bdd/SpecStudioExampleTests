"""Exercises a live REST API over HTTP.

There are no production classes behind this one: the API itself is the thing
under test. RestCall does the transport, so what is left here is only the three
things glue should do -- turn a table into JSON with the generated to_json(),
turn the reply back into objects with the generated from_json(), and compare
whole objects with ==.

The status and the body are separate steps because they come from separate
places. Keeping them apart is what lets the body go straight through the
generated reader: while a status was mixed into the body's attribute set, the
reader demanded a "status" field no API response ever contains.

Two rules this file follows, and did not always:

It never touches JSON. Every reply goes through PostTyped.from_json or
from_json_list. Glue that navigates a reply is a sign the specification is not
describing that reply honestly, and glue that parses one is doing work the
generator already did.

It compares objects, not fields. A full table becomes a PostTyped and is
compared to the reply's PostTyped, so the comparison covers the conversion as
well as the text. A CompareOnly table leaves its unstated columns holding
?DNC?, which only the String class skips, so that case compares PostString to
PostString instead. Nothing here inspects a field by name.
"""
from common import *
from rest_call import RestCall, RestCallFailed

DNC_STRING = '?DNC?'


class APIGlue:
    DNC_STRING = DNC_STRING

    def __init__(self):
        self.base_page = ''
        # Bodies offered by Given steps, keyed by the attribute set that carried them.
        self.bodies = {}
        self.call = None

    # ---- given -----------------------------------------------------------

    def given_base_page_is(self, values: list):
        for row in values:
            for cell in row:
                if cell.strip():
                    self.base_page = cell.strip()
        assert self.base_page, 'no base Page given'

    def given_new_post_data(self, values: list):
        for value in values:
            self.bodies['NewPost'] = NewPostTyped.from_string_obj(value).to_json()

    def given_replacement_data(self, values: list):
        for value in values:
            self.bodies['ReplacePost'] = ReplacePostTyped.from_string_obj(value).to_json()

    def given_patch_data(self, values: list):
        for value in values:
            self.bodies['PatchTitle'] = PatchTitleTyped.from_string_obj(value).to_json()

    # ---- when ------------------------------------------------------------

    def when_sending_request(self, values: list):
        for value in values:
            request = ApiRequestTyped.from_string_obj(value)

            # Body names an attribute set a Given step already turned into JSON.
            body_name = (request.body or '').strip()
            payload = ''
            if body_name:
                assert body_name in self.bodies, \
                    'no Given step supplied a body named ' + body_name
                payload = self.bodies[body_name]

            try:
                self.call = RestCall.send(request.method, self.base_page,
                                          request.page, request.parameter, payload)
            except RestCallFailed as error:
                raise AssertionError(str(error))

    # ---- then ------------------------------------------------------------

    def then_response_status_is(self, values: list):
        assert self.call is not None, 'no request was sent'
        for expected in values:
            assert ApiStatusTyped.from_string_obj(expected).code == self.call.status, \
                'HTTP status from ' + self.call.url

    def then_response_body_is(self, values: list):
        assert self.call is not None, 'no request was sent'
        actual = PostTyped.from_json(self.call.body)
        for expected in values:
            _compare_post('', expected, actual)

    def then_response_array_contains_this_many_items(self, values: list):
        assert self.call is not None, 'no request was sent'
        expected = int(values[0][0].strip())
        items = PostTyped.from_json_list(self.call.body)
        assert expected == len(items), \
            'number of items returned by %s: expected %d but was %d' % (
                self.call.url, expected, len(items))


# ---- the one comparison --------------------------------------------------

def _compare_post(where: str, expected: PostString, actual: PostTyped):
    """One expected row against one returned post.

    A table that states every column is compared typed, so that the values are
    checked as the types the specification declares and not merely as matching
    text. A CompareOnly table cannot be: its unstated columns hold ?DNC?, which
    has no typed meaning, and only the String class knows to skip it. So that
    case compares the string form of both sides instead.
    """
    if _states_every_column(expected):
        want = PostTyped.from_string_obj(expected)
        assert want == actual, '%spost: expected %r but was %r' % (where, want, actual)
    else:
        got = actual.to_string_obj()
        assert expected == got, '%spost: expected %r but was %r' % (where, expected, got)


def _states_every_column(row: PostString) -> bool:
    """False when any column was left to CompareOnly, and so holds ?DNC?."""
    return DNC_STRING not in (row.user_id, row.id, row.title, row.body)
