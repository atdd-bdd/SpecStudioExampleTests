from common import *
from production import Calculator


class CalculatorGlue:
    DNC_STRING = '?DNC?'

    def examples_Calculation_AddTwoNumbers(self, values: list):
        calc = Calculator()
        for value in values:
            typed = AdderTyped.from_string_obj(value)
            actual = calc.add(typed.number1, typed.number2)
            assert typed.result == actual, \
                f'Add {typed.number1} + {typed.number2}'
