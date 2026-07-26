from common import *
from production import Dollar, SimpleText


class TypesGlue:
    DNC_STRING = '?DNC?'

    def examples_DataType_Dollar(self, values: list):
        for value in values:
            vvt = ValidValuesTyped.from_string_obj(value)
            failed = False
            try:
                Dollar(vvt.value)
            except ValueError:
                failed = True
            assert vvt.is_valid == (not failed), f' Value {vvt.value}'

    def examples_DataType_SimpleText(self, values: list):
        for value in values:
            vvt = ValidValuesTyped.from_string_obj(value)
            failed = False
            try:
                SimpleText(vvt.value)
            except ValueError:
                failed = True
            assert vvt.is_valid == (not failed), f' Value {vvt.value}'
