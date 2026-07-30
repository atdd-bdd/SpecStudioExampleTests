from common import *
from production import SimpleJson


class JsonGlue:
    DNC_STRING = '?DNC?'

    def __init__(self):
        self.simple_class_values = []
        self.given_json = ''
        self.actual_json = ''
        self.parsed_object = []

    # SimpleJson takes plain name/value maps, so it stays independent of the
    # generated test classes. These two moves are the whole of the mapping —
    # the conversion itself belongs to SimpleJson.
    @staticmethod
    def _fields_of(value: SimpleClassString) -> dict:
        return {'anInt': value.an_int, 'aString': value.a_string}

    @staticmethod
    def _object_of(fields: dict) -> SimpleClassString:
        return SimpleClassString(fields.get('anInt'), fields.get('aString'))

    def given_one_object_is(self, values: list):
        for value in values:
            print(value)
        self.simple_class_values = values
        self.actual_json = SimpleJson.to_object(self._fields_of(values[0]))

    def then_json_should_be(self, value: str):
        print(value)
        # Text to text, with the whitespace between tokens removed from both
        # sides. Whitespace inside a quoted value is kept.
        assert SimpleJson.without_whitespace(value) == \
               SimpleJson.without_whitespace(self.actual_json)

    def given_json_is(self, value: str):
        print(value)
        self.given_json = value
        self.parsed_object = [self._object_of(SimpleJson.parse_object(value))]

    def then_the_converted_object_is(self, values: list):
        for value in values:
            print(value)
        assert values == self.parsed_object

    def given_a_table_is(self, values: list):
        for value in values:
            print(value)
        self.simple_class_values = values
        self.actual_json = SimpleJson.to_array([self._fields_of(v) for v in values])

    def then_json_for_table_should_be(self, value: str):
        print(value)
        assert SimpleJson.without_whitespace(value) == \
               SimpleJson.without_whitespace(self.actual_json)

    def given_json_for_table_is(self, value: str):
        print(value)
        self.given_json = value
        self.parsed_object = [self._object_of(row)
                              for row in SimpleJson.parse_array(value)]

    def then_the_converted_table_should_be(self, values: list):
        for value in values:
            print(value)
        assert values == self.parsed_object
