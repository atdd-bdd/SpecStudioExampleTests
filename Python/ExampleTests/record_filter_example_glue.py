from common import *
from production import IDForm, IDValue, RecordFilter, TemperatureConverter


class RecordFilterExampleGlue:
    DNC_STRING = '?DNC?'

    def __init__(self):
        self.record_filter = RecordFilter()
        self.computed_sum = 0

    def given_list_of_numbers(self, values: list):
        self.record_filter = RecordFilter()
        for value in values:
            typed = IDValueTyped.from_string_obj(value)
            self.record_filter.add(IDValue(IDForm(typed.id), typed.value))

    def when_filtered_by_id_with_value(self, values: list):
        if values and values[0]:
            self.computed_sum = self.record_filter.sum_by_label(IDForm(values[0][0]))

    def then_sum_is(self, values: list):
        if values and values[0]:
            assert int(values[0][0]) == self.computed_sum, 'Sum'

    def when_filtered_by(self, values: list):
        for value in values:
            typed = FilterValueTyped.from_string_obj(value)
            self.computed_sum = self.record_filter.sum_by_label(IDForm(typed.value))

    def then_result(self, values: list):
        for value in values:
            typed = ResultValueTyped.from_string_obj(value)
            assert typed.sum == self.computed_sum, 'Filtered sum'

    def when_element_added(self, values: list):
        for value in values:
            typed = IDValueTyped.from_string_obj(value)
            self.record_filter.add(IDValue(IDForm(typed.id), typed.value))

    def examples_Calculation_ConvertFToC(self, values: list):
        for value in values:
            typed = FandCTyped.from_string_obj(value)
            actual = TemperatureConverter.fahrenheit_to_celsius(typed.f)
            assert typed.c == actual, f'Convert {typed.f}F to C'

    def examples_DataType_IDForm(self, values: list):
        for value in values:
            vvt = ValidValuesTyped.from_string_obj(value)
            failed = False
            try:
                IDForm(vvt.value)
            except ValueError:
                failed = True
            assert vvt.is_valid == (not failed), f' Value {vvt.value}'
