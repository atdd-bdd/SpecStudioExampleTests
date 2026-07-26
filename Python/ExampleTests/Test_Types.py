import pytest
from common import *
from types_glue import TypesGlue

# --- DataType Tests ---

def test_DataType_Dollar():
    glue = TypesGlue()
    object_list_1 = [
        ValidValuesString('0', 'true', ''),
        ValidValuesString('0.01', 'true', ''),
        ValidValuesString('-1', 'false', 'Negative not allowed'),
        ValidValuesString('0.001', 'false', 'Only 2 decimal digits'),
    ]
    glue.examples_DataType_Dollar(object_list_1)

def test_DataType_SimpleText():
    glue = TypesGlue()
    object_list_2 = [
        ValidValuesString('abc', 'y', ''),
        ValidValuesString('ab.', 'y', 'period okay'),
        ValidValuesString('1234567890', 'y', 'digits'),
        ValidValuesString('@', 'n', ''),
        ValidValuesString('-a-b', 'y', 'hyphens'),
    ]
    glue.examples_DataType_SimpleText(object_list_2)

