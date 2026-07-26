import pytest
from common import *
from calculator_glue import CalculatorGlue

# --- Calculation Tests ---

def test_Calculation_AddTwoNumbers():
    glue = CalculatorGlue()
    object_list_1 = [
        AdderString('2', '3', '5'),
        AdderString('10', '20', '30'),
        AdderString('-1', '1', '0'),
    ]
    glue.examples_Calculation_AddTwoNumbers(object_list_1)

