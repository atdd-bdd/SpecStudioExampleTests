package spectable.tests;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import spectable.Bowling_glue;
import production.*;
import records.*;
import calculator.*;
import org.junit.jupiter.api.Test;

public class Bowling_Test {

    // -------------------------
    // Scenario Tests
    // -------------------------
    @Test
    public void Scenario_Adding_a_roll() {
        Bowling_glue glue = new Bowling_glue();

        glue.Given_rolls_are(TableHelper.toListPinsString(List.of("5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10")));

        glue.When_roll_is(TableHelper.toListPinsString(List.of("10")));

        glue.Then_rolls_become(TableHelper.toListPinsString(List.of("5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10")));

    }

    @Test
    public void Scenario_Full_Game_Compute_and_Display() {
        Bowling_glue glue = new Bowling_glue();

        glue.Given_rolls_are(TableHelper.toListPinsString(List.of("5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10")));

        glue.When_scored();

        glue.Then_display_is("""
        | 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |
        | 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |
        """);

    }

    @Test
    public void Scenario_A_Game_in_Steps() {
        Bowling_glue glue = new Bowling_glue();

        glue.Given_rolls_are(TableHelper.toListPinsString(List.of("5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10")));

        glue.When_scored();

        List<FrameValuesString> objectList6 = new ArrayList<>();
        objectList6.add(new FrameValuesString("1", "5", "5", "4", "14", "14"));
        objectList6.add(new FrameValuesString("2", "4", "5", "8", "9", "23"));
        objectList6.add(new FrameValuesString("3", "8", "2", "10", "20", "43"));
        objectList6.add(new FrameValuesString("4", "10", "0", "10", "20", "63"));
        objectList6.add(new FrameValuesString("5", "0", "10", "10", "20", "83"));
        objectList6.add(new FrameValuesString("6", "10", "6", "2", "18", "101"));
        objectList6.add(new FrameValuesString("7", "6", "2", "10", "8", "109"));
        objectList6.add(new FrameValuesString("8", "10", "4", "6", "20", "129"));
        objectList6.add(new FrameValuesString("9", "4", "6", "10", "20", "149"));
        objectList6.add(new FrameValuesString("10", "10", "10", "-1", "-1", "-1"));
        glue.Then_frame_values_are(objectList6);

        glue.Given_frame_values_are_as_previous();

        List<FrameDisplayString> objectList7 = new ArrayList<>();
        objectList7.add(new FrameDisplayString("1", "5", "/", "", "14"));
        objectList7.add(new FrameDisplayString("2", "4", "5", "", "23"));
        objectList7.add(new FrameDisplayString("3", "8", "/", "", "43"));
        objectList7.add(new FrameDisplayString("4", "X", "", "", "63"));
        objectList7.add(new FrameDisplayString("5", "-", "/", "", "83"));
        objectList7.add(new FrameDisplayString("6", "X", "", "", "101"));
        objectList7.add(new FrameDisplayString("7", "6", "2", "", "109"));
        objectList7.add(new FrameDisplayString("8", "X", "", "", "129"));
        objectList7.add(new FrameDisplayString("9", "4", "/", "", "149"));
        objectList7.add(new FrameDisplayString("10", "X", "X", "", ""));
        glue.Then_display_values_are(objectList7);

        glue.Then_game_complete_is(TableHelper.toListBoolean(List.of("false")));

        List<InputControlValuesString> objectList9 = new ArrayList<>();
        objectList9.add(new InputControlValuesString("10", "3", "10"));
        glue.Then_input_control_is(objectList9);

    }

    @Test
    public void Scenario_Check_for_Game_Complete() {
        Bowling_glue glue = new Bowling_glue();

        glue.Given_rolls_are(TableHelper.toListPinsString(List.of("5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10", "10")));

        glue.When_scored();

        glue.Then_game_complete_is(TableHelper.toListBoolean(List.of("true")));

    }

    @Test
    public void Scenario_Values_for_Tenth_Frame() {
        Bowling_glue glue = new Bowling_glue();

        glue.Given_rolls_for_tenth_frame_are(TableHelper.toListPinsString(List.of("10", "10")));

        glue.When_scored();

        List<FrameValuesString> objectList13 = new ArrayList<>();
        objectList13.add(new FrameValuesString("10", "10", "10", "-1", "-1", "-1"));
        glue.Then_Then_tenth_frame_values_are(objectList13);

    }

    @Test
    public void Scenario_Input_Control_Should_Be_For_Next_Frame() {
        Bowling_glue glue = new Bowling_glue();

        glue.Given_rolls_are(TableHelper.toListPinsString(List.of("10")));

        glue.When_scored();

        List<InputControlValuesString> objectList15 = new ArrayList<>();
        objectList15.add(new InputControlValuesString("2", "1", "10"));
        glue.Then_input_control_is(objectList15);

    }

    @Test
    public void Scenario_Try_to_add_invalid_roll() {
        Bowling_glue glue = new Bowling_glue();

        glue.Given_rolls_are(TableHelper.toListPinsString(List.of("5")));

        glue.When_scored();

        glue.When_roll_is(TableHelper.toListPinsString(List.of("6")));

        glue.Then_rolls_become(TableHelper.toListPinsString(List.of("5")));

    }

    // -------------------------
    // DataType Tests
    // -------------------------
    @Test
    public void DataType_Pins() {
        Bowling_glue glue = new Bowling_glue();
        List<ValidValuesString> objectList19 = new ArrayList<>();
        objectList19.add(new ValidValuesString("0", "true", ""));
        objectList19.add(new ValidValuesString("10", "true", ""));
        objectList19.add(new ValidValuesString("11", "false", ""));
        objectList19.add(new ValidValuesString("-2", "false", ""));
        objectList19.add(new ValidValuesString("-1", "true", "Used for To Be Rolled"));
        glue.Examples_DataType_Pins(objectList19);
    }

    @Test
    public void DataType_Score() {
        Bowling_glue glue = new Bowling_glue();
        List<ValidValuesString> objectList20 = new ArrayList<>();
        objectList20.add(new ValidValuesString("0", "yes", ""));
        objectList20.add(new ValidValuesString("300", "yes", ""));
        objectList20.add(new ValidValuesString("301", "no", ""));
        objectList20.add(new ValidValuesString("-1", "yes", "To be scored"));
        glue.Examples_DataType_Score(objectList20);
    }

}
