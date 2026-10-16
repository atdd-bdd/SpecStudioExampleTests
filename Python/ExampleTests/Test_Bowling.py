import pytest
from common import *
from bowling_glue import BowlingGlue

def test_Scenario_AddingARoll():
    glue = BowlingGlue()

    typed_list_1 = [PinsString('5'), PinsString('5'), PinsString('4'), PinsString('5'), PinsString('8'), PinsString('2'), PinsString('10'), PinsString('0'), PinsString('10'), PinsString('10'), PinsString('6'), PinsString('2'), PinsString('10'), PinsString('4'), PinsString('6'), PinsString('10')]
    glue.given_rolls_are(typed_list_1)

    typed_list_2 = [PinsString('10')]
    glue.when_roll_is(typed_list_2)

    typed_list_3 = [PinsString('5'), PinsString('5'), PinsString('4'), PinsString('5'), PinsString('8'), PinsString('2'), PinsString('10'), PinsString('0'), PinsString('10'), PinsString('10'), PinsString('6'), PinsString('2'), PinsString('10'), PinsString('4'), PinsString('6'), PinsString('10'), PinsString('10')]
    glue.then_rolls_become(typed_list_3)


def test_Scenario_FullGameComputeAndDisplay():
    glue = BowlingGlue()

    typed_list_4 = [PinsString('5'), PinsString('5'), PinsString('4'), PinsString('5'), PinsString('8'), PinsString('2'), PinsString('10'), PinsString('0'), PinsString('10'), PinsString('10'), PinsString('6'), PinsString('2'), PinsString('10'), PinsString('4'), PinsString('6'), PinsString('10'), PinsString('10')]
    glue.given_rolls_are(typed_list_4)

    glue.when_scored()

    glue.then_display_is('| 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |\n| 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |')


def test_Scenario_AGameInSteps():
    glue = BowlingGlue()

    typed_list_5 = [PinsString('5'), PinsString('5'), PinsString('4'), PinsString('5'), PinsString('8'), PinsString('2'), PinsString('10'), PinsString('0'), PinsString('10'), PinsString('10'), PinsString('6'), PinsString('2'), PinsString('10'), PinsString('4'), PinsString('6'), PinsString('10'), PinsString('10')]
    glue.given_rolls_are(typed_list_5)

    glue.when_scored()

    object_list_6 = [
        FrameValuesString('1', '5', '5', '4', '14', '14'),
        FrameValuesString('2', '4', '5', '8', '9', '23'),
        FrameValuesString('3', '8', '2', '10', '20', '43'),
        FrameValuesString('4', '10', '0', '10', '20', '63'),
        FrameValuesString('5', '0', '10', '10', '20', '83'),
        FrameValuesString('6', '10', '6', '2', '18', '101'),
        FrameValuesString('7', '6', '2', '10', '8', '109'),
        FrameValuesString('8', '10', '4', '6', '20', '129'),
        FrameValuesString('9', '4', '6', '10', '20', '149'),
        FrameValuesString('10', '10', '10', '-1', '-1', '-1'),
    ]
    glue.then_frame_values_are(object_list_6)

    glue.given_frame_values_are_as_previous()

    object_list_7 = [
        FrameDisplayString('1', '5', '/', '', '14'),
        FrameDisplayString('2', '4', '5', '', '23'),
        FrameDisplayString('3', '8', '/', '', '43'),
        FrameDisplayString('4', 'X', '', '', '63'),
        FrameDisplayString('5', '-', '/', '', '83'),
        FrameDisplayString('6', 'X', '', '', '101'),
        FrameDisplayString('7', '6', '2', '', '109'),
        FrameDisplayString('8', 'X', '', '', '129'),
        FrameDisplayString('9', '4', '/', '', '149'),
        FrameDisplayString('10', 'X', 'X', '', ''),
    ]
    glue.then_display_values_are(object_list_7)

    typed_list_8 = ['false'.lower() in ('true', 't', 'yes', 'y', '1')]
    glue.then_game_complete_is(typed_list_8)

    object_list_9 = [
        InputControlValuesString('10', '3', '10'),
    ]
    glue.then_input_control_is(object_list_9)


def test_Scenario_CheckForGameComplete():
    glue = BowlingGlue()

    typed_list_10 = [PinsString('5'), PinsString('5'), PinsString('4'), PinsString('5'), PinsString('8'), PinsString('2'), PinsString('10'), PinsString('0'), PinsString('10'), PinsString('10'), PinsString('6'), PinsString('2'), PinsString('10'), PinsString('4'), PinsString('6'), PinsString('10'), PinsString('10'), PinsString('10')]
    glue.given_rolls_are(typed_list_10)

    glue.when_scored()

    typed_list_11 = ['true'.lower() in ('true', 't', 'yes', 'y', '1')]
    glue.then_game_complete_is(typed_list_11)


def test_Scenario_ValuesForTenthFrame():
    glue = BowlingGlue()

    typed_list_12 = [PinsString('10'), PinsString('10')]
    glue.given_rolls_for_tenth_frame_are(typed_list_12)

    glue.when_scored()

    object_list_13 = [
        FrameValuesString('10', '10', '10', '-1', '-1', '-1'),
    ]
    glue.then_then_tenth_frame_values_are(object_list_13)


def test_Scenario_InputControlShouldBeForNextFrame():
    glue = BowlingGlue()

    typed_list_14 = [PinsString('10')]
    glue.given_rolls_are(typed_list_14)

    glue.when_scored()

    object_list_15 = [
        InputControlValuesString('2', '1', '10'),
    ]
    glue.then_input_control_is(object_list_15)


def test_Scenario_TryToAddInvalidRoll():
    glue = BowlingGlue()

    typed_list_16 = [PinsString('5')]
    glue.given_rolls_are(typed_list_16)

    glue.when_scored()

    typed_list_17 = [PinsString('6')]
    glue.when_roll_is(typed_list_17)

    typed_list_18 = [PinsString('5')]
    glue.then_rolls_become(typed_list_18)


# --- DataType Tests ---

def test_DataType_Pins():
    glue = BowlingGlue()
    object_list_19 = [
        ValidValuesString('0', 'true', ''),
        ValidValuesString('10', 'true', ''),
        ValidValuesString('11', 'false', ''),
        ValidValuesString('-2', 'false', ''),
        ValidValuesString('-1', 'true', 'Used for To Be Rolled'),
    ]
    glue.examples_DataType_Pins(object_list_19)

def test_DataType_Score():
    glue = BowlingGlue()
    object_list_20 = [
        ValidValuesString('0', 'yes', ''),
        ValidValuesString('300', 'yes', ''),
        ValidValuesString('301', 'no', ''),
        ValidValuesString('-1', 'yes', 'To be scored'),
    ]
    glue.examples_DataType_Score(object_list_20)

