import pytest
from common import *
from record_filter_example_glue import RecordFilterExampleGlue

def test_Scenario_FilterDataByID():
    glue = RecordFilterExampleGlue()

    object_list_1 = [
        IDValueString('Q1234', '1'),
        IDValueString('Q9999', '2'),
        IDValueString('Q1234', '3'),
    ]
    glue.given_list_of_numbers(object_list_1)

    string_list_list_2 = [
        ['Q1234'],
    ]
    glue.when_filtered_by_id_with_value(string_list_list_2)

    string_list_list_3 = [
        ['4'],
    ]
    glue.then_sum_is(string_list_list_3)


def test_Scenario_FilterDataAnotherWay():
    glue = RecordFilterExampleGlue()

    object_list_4 = [
        IDValueString('Q1234', '1'),
        IDValueString('Q9999', '2'),
        IDValueString('Q1234', '3'),
    ]
    glue.given_list_of_numbers(object_list_4)

    object_list_5 = [
        FilterValueString('Q1234'),
    ]
    glue.when_filtered_by(object_list_5)

    object_list_6 = [
        ResultValueString('4'),
    ]
    glue.then_result(object_list_6)


def test_Scenario_AddAnotherValue():
    glue = RecordFilterExampleGlue()

    object_list_7 = [
        IDValueString('Q1234', '1'),
        IDValueString('Q9999', '2'),
        IDValueString('Q1234', '3'),
    ]
    glue.given_list_of_numbers(object_list_7)

    object_list_8 = [
        IDValueString('Q1234', '4'),
    ]
    glue.when_element_added(object_list_8)

    object_list_9 = [
        FilterValueString('Q1234'),
    ]
    glue.when_filtered_by(object_list_9)

    object_list_10 = [
        ResultValueString('8'),
    ]
    glue.then_result(object_list_10)


# --- Calculation Tests ---

def test_Calculation_ConvertFToC():
    glue = RecordFilterExampleGlue()
    object_list_11 = [
        FandCString('32', '0', 'Freezing'),
        FandCString('212', '100', 'Boiling'),
        FandCString('-40', '-40', 'Below zero'),
        FandCString('68', '20', 'Photo chem'),
    ]
    glue.examples_Calculation_ConvertFToC(object_list_11)

# --- DataType Tests ---

def test_DataType_IDForm():
    glue = RecordFilterExampleGlue()
    object_list_12 = [
        ValidValuesString('Q1234', 'true', ''),
        ValidValuesString('Q123', 'false', 'Too short'),
        ValidValuesString('Q12345', 'false', 'Too long'),
        ValidValuesString('A1234', 'false', 'Must begin with Q'),
    ]
    glue.examples_DataType_IDForm(object_list_12)

