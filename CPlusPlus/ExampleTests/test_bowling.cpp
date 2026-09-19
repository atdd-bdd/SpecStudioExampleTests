#include <gtest/gtest.h>
#include <iostream>
#include "common/common.h"
#include "bowling_glue.h"

TEST(Bowling, Scenario_AddingARoll) {
    BowlingGlue glue;
    std::vector<std::vector<std::string>> stringListList1 = {
        {"5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10"},
    };
    glue.given_rolls_are(stringListList1);

    std::vector<std::vector<std::string>> stringListList2 = {
        {"10"},
    };
    glue.when_roll_is(stringListList2);

    std::vector<std::vector<std::string>> stringListList3 = {
        {"5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"},
    };
    glue.then_rolls_become(stringListList3);

}

TEST(Bowling, Scenario_FullGameComputeAndDisplay) {
    BowlingGlue glue;
    std::vector<std::vector<std::string>> stringListList4 = {
        {"5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"},
    };
    glue.given_rolls_are(stringListList4);

    glue.when_scored();
    glue.then_display_is("| 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |\n| 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |");
}

TEST(Bowling, Scenario_AGameInSteps) {
    BowlingGlue glue;
    std::vector<std::vector<std::string>> stringListList5 = {
        {"5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10"},
    };
    glue.given_rolls_are(stringListList5);

    glue.when_scored();
    std::vector<FrameValuesString> objectList6 = {
        FrameValuesString::from_vec({"1", "5", "5", "4", "14", "14"}),
        FrameValuesString::from_vec({"2", "4", "5", "8", "9", "23"}),
        FrameValuesString::from_vec({"3", "8", "2", "10", "20", "43"}),
        FrameValuesString::from_vec({"4", "10", "0", "10", "20", "63"}),
        FrameValuesString::from_vec({"5", "0", "10", "10", "20", "83"}),
        FrameValuesString::from_vec({"6", "10", "6", "2", "18", "101"}),
        FrameValuesString::from_vec({"7", "6", "2", "10", "8", "109"}),
        FrameValuesString::from_vec({"8", "10", "4", "6", "20", "129"}),
        FrameValuesString::from_vec({"9", "4", "6", "10", "20", "149"}),
        FrameValuesString::from_vec({"10", "10", "10", "-1", "-1", "-1"}),
    };
    glue.then_frame_values_are(objectList6);

    glue.given_frame_values_are_as_previous();
    std::vector<FrameDisplayString> objectList7 = {
        FrameDisplayString::from_vec({"1", "5", "/", "", "14"}),
        FrameDisplayString::from_vec({"2", "4", "5", "", "23"}),
        FrameDisplayString::from_vec({"3", "8", "/", "", "43"}),
        FrameDisplayString::from_vec({"4", "X", "", "", "63"}),
        FrameDisplayString::from_vec({"5", "-", "/", "", "83"}),
        FrameDisplayString::from_vec({"6", "X", "", "", "101"}),
        FrameDisplayString::from_vec({"7", "6", "2", "", "109"}),
        FrameDisplayString::from_vec({"8", "X", "", "", "129"}),
        FrameDisplayString::from_vec({"9", "4", "/", "", "149"}),
        FrameDisplayString::from_vec({"10", "X", "X", "", ""}),
    };
    glue.then_display_values_are(objectList7);

    std::vector<std::vector<std::string>> stringListList8 = {
        {"false"},
    };
    glue.then_game_complete_is(stringListList8);

    std::vector<InputControlValuesString> objectList9 = {
        InputControlValuesString::from_vec({"10", "3", "10"}),
    };
    glue.then_input_control_is(objectList9);

}

TEST(Bowling, Scenario_CheckForGameComplete) {
    BowlingGlue glue;
    std::vector<std::vector<std::string>> stringListList10 = {
        {"5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10", "10"},
    };
    glue.given_rolls_are(stringListList10);

    glue.when_scored();
    std::vector<std::vector<std::string>> stringListList11 = {
        {"true"},
    };
    glue.then_game_complete_is(stringListList11);

}

TEST(Bowling, Scenario_ValuesForTenthFrame) {
    BowlingGlue glue;
    std::vector<std::vector<std::string>> stringListList12 = {
        {"10", "10"},
    };
    glue.given_rolls_for_tenth_frame_are(stringListList12);

    glue.when_scored();
    std::vector<FrameValuesString> objectList13 = {
        FrameValuesString::from_vec({"10", "10", "10", "-1", "-1", "-1"}),
    };
    glue.then_then_tenth_frame_values_are(objectList13);

}

TEST(Bowling, Scenario_InputControlShouldBeForNextFrame) {
    BowlingGlue glue;
    std::vector<std::vector<std::string>> stringListList14 = {
        {"10"},
    };
    glue.given_rolls_are(stringListList14);

    glue.when_scored();
    std::vector<InputControlValuesString> objectList15 = {
        InputControlValuesString::from_vec({"2", "1", "10"}),
    };
    glue.then_input_control_is(objectList15);

}

TEST(Bowling, Scenario_TryToAddInvalidRoll) {
    BowlingGlue glue;
    std::vector<std::vector<std::string>> stringListList16 = {
        {"5"},
    };
    glue.given_rolls_are(stringListList16);

    glue.when_scored();
    std::vector<std::vector<std::string>> stringListList17 = {
        {"6"},
    };
    glue.when_roll_is(stringListList17);

    std::vector<std::vector<std::string>> stringListList18 = {
        {"5"},
    };
    glue.then_rolls_become(stringListList18);

}

TEST(Bowling, DataType_Pins) {
    BowlingGlue glue;
    std::vector<ValidValuesString> objectList19 = {
        ValidValuesString::from_vec({"0", "true", ""}),
        ValidValuesString::from_vec({"10", "true", ""}),
        ValidValuesString::from_vec({"11", "false", ""}),
        ValidValuesString::from_vec({"-2", "false", ""}),
        ValidValuesString::from_vec({"-1", "true", "Used for To Be Rolled"}),
    };
    glue.examples_datatype_pins(objectList19);
}

TEST(Bowling, DataType_Score) {
    BowlingGlue glue;
    std::vector<ValidValuesString> objectList20 = {
        ValidValuesString::from_vec({"0", "yes", ""}),
        ValidValuesString::from_vec({"300", "yes", ""}),
        ValidValuesString::from_vec({"301", "no", ""}),
        ValidValuesString::from_vec({"-1", "yes", "To be scored"}),
    };
    glue.examples_datatype_score(objectList20);
}

