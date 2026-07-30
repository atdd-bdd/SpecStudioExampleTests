import pytest
from common import *
from json_glue import JsonGlue

def test_Scenario_ConvertToJson():
    glue = JsonGlue()

    object_list_1 = [
        SimpleClassString('1', 'B'),
    ]
    glue.given_one_object_is(object_list_1)

    glue.then_json_should_be('{anInt:"1",aString:"B"}')


def test_Scenario_ConvertFromJson():
    glue = JsonGlue()

    glue.given_json_is('{anInt:  "1"   ,   aString:"B"  }')

    object_list_2 = [
        SimpleClassString('1', 'B'),
    ]
    glue.then_the_converted_object_is(object_list_2)


def test_Scenario_ConvertToJsonArray():
    glue = JsonGlue()

    object_list_3 = [
        SimpleClassString('1', 'B'),
        SimpleClassString('2', 'C'),
    ]
    glue.given_a_table_is(object_list_3)

    glue.then_json_for_table_should_be('[ {anInt:"1",aString:"B"} \n, {anInt:"2",aString:"C"} \n]')


def test_Scenario_ConvertFromJsonArray():
    glue = JsonGlue()

    glue.given_json_for_table_is('[    {anInt:  "1"   ,   aString:"B"  },\n{anInt:  "2"   ,   aString:"C"  }\n]\n')

    object_list_4 = [
        SimpleClassString('1', 'B'),
        SimpleClassString('2', 'C'),
    ]
    glue.then_the_converted_table_should_be(object_list_4)


