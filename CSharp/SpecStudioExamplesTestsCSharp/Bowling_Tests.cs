namespace SpecStudioExamplesTestsCSharp.Bowling{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class Bowling{

[TestMethod]
public void Test_Scenario_Adding_a_roll(){
     Bowling_glue bowling_glue_object = new Bowling_glue();

         List<List<string>> stringListList1 = new List<List<string>>{
            new List<string>{ "5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10" },
         };
         bowling_glue_object.Given_rolls_are(stringListList1);

         List<List<string>> stringListList2 = new List<List<string>>{
            new List<string>{ "10" },
         };
         bowling_glue_object.When_roll_is(stringListList2);

         List<List<string>> stringListList3 = new List<List<string>>{
            new List<string>{ "5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10" },
         };
         bowling_glue_object.Then_rolls_become(stringListList3);

}

[TestMethod]
public void Test_Scenario_Full_Game_Compute_and_Display(){
     Bowling_glue bowling_glue_object = new Bowling_glue();

         List<List<string>> stringListList4 = new List<List<string>>{
            new List<string>{ "5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10" },
         };
         bowling_glue_object.Given_rolls_are(stringListList4);

         bowling_glue_object.When_scored();

         bowling_glue_object.Then_display_is("| 5/ | 45 | 8/ | X  | -/ | X   | 62  | X   | 4/  | XX |\n| 14 | 23 | 43 | 63 | 83 | 101 | 109 | 129 | 149 |    |");

}

[TestMethod]
public void Test_Scenario_A_Game_in_Steps(){
     Bowling_glue bowling_glue_object = new Bowling_glue();

         List<List<string>> stringListList5 = new List<List<string>>{
            new List<string>{ "5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10" },
         };
         bowling_glue_object.Given_rolls_are(stringListList5);

         bowling_glue_object.When_scored();

         List<FrameValuesString> objectList6 = new List<FrameValuesString>{
             new FrameValuesString("1","5","5","4","14","14"),
             new FrameValuesString("2","4","5","8","9","23"),
             new FrameValuesString("3","8","2","10","20","43"),
             new FrameValuesString("4","10","0","10","20","63"),
             new FrameValuesString("5","0","10","10","20","83"),
             new FrameValuesString("6","10","6","2","18","101"),
             new FrameValuesString("7","6","2","10","8","109"),
             new FrameValuesString("8","10","4","6","20","129"),
             new FrameValuesString("9","4","6","10","20","149"),
             new FrameValuesString("10","10","10","-1","-1","-1"),
         };
         bowling_glue_object.Then_frame_values_are(objectList6);

         bowling_glue_object.Given_frame_values_are_as_previous();

         List<FrameDisplayString> objectList7 = new List<FrameDisplayString>{
             new FrameDisplayString("1","5","/","","14"),
             new FrameDisplayString("2","4","5","","23"),
             new FrameDisplayString("3","8","/","","43"),
             new FrameDisplayString("4","X","","","63"),
             new FrameDisplayString("5","-","/","","83"),
             new FrameDisplayString("6","X","","","101"),
             new FrameDisplayString("7","6","2","","109"),
             new FrameDisplayString("8","X","","","129"),
             new FrameDisplayString("9","4","/","","149"),
             new FrameDisplayString("10","X","X","",""),
         };
         bowling_glue_object.Then_display_values_are(objectList7);

         List<List<string>> stringListList8 = new List<List<string>>{
            new List<string>{ "false" },
         };
         bowling_glue_object.Then_game_complete_is(stringListList8);

         List<InputControlValuesString> objectList9 = new List<InputControlValuesString>{
             new InputControlValuesString("10","3","10"),
         };
         bowling_glue_object.Then_input_control_is(objectList9);

}

[TestMethod]
public void Test_Scenario_Check_for_Game_Complete(){
     Bowling_glue bowling_glue_object = new Bowling_glue();

         List<List<string>> stringListList10 = new List<List<string>>{
            new List<string>{ "5", "5", "4", "5", "8", "2", "10", "0", "10", "10", "6", "2", "10", "4", "6", "10", "10", "10" },
         };
         bowling_glue_object.Given_rolls_are(stringListList10);

         bowling_glue_object.When_scored();

         List<List<string>> stringListList11 = new List<List<string>>{
            new List<string>{ "true" },
         };
         bowling_glue_object.Then_game_complete_is(stringListList11);

}

[TestMethod]
public void Test_Scenario_Values_for_Tenth_Frame(){
     Bowling_glue bowling_glue_object = new Bowling_glue();

         List<List<string>> stringListList12 = new List<List<string>>{
            new List<string>{ "10", "10" },
         };
         bowling_glue_object.Given_rolls_for_tenth_frame_are(stringListList12);

         bowling_glue_object.When_scored();

         List<FrameValuesString> objectList13 = new List<FrameValuesString>{
             new FrameValuesString("10","10","10","-1","-1","-1"),
         };
         bowling_glue_object.Then_Then_tenth_frame_values_are(objectList13);

}

[TestMethod]
public void Test_Scenario_Input_Control_Should_Be_For_Next_Frame(){
     Bowling_glue bowling_glue_object = new Bowling_glue();

         List<List<string>> stringListList14 = new List<List<string>>{
            new List<string>{ "10" },
         };
         bowling_glue_object.Given_rolls_are(stringListList14);

         bowling_glue_object.When_scored();

         List<InputControlValuesString> objectList15 = new List<InputControlValuesString>{
             new InputControlValuesString("2","1","10"),
         };
         bowling_glue_object.Then_input_control_is(objectList15);

}

[TestMethod]
public void Test_Scenario_Try_to_add_invalid_roll(){
     Bowling_glue bowling_glue_object = new Bowling_glue();

         List<List<string>> stringListList16 = new List<List<string>>{
            new List<string>{ "5" },
         };
         bowling_glue_object.Given_rolls_are(stringListList16);

         bowling_glue_object.When_scored();

         List<List<string>> stringListList17 = new List<List<string>>{
            new List<string>{ "6" },
         };
         bowling_glue_object.When_roll_is(stringListList17);

         List<List<string>> stringListList18 = new List<List<string>>{
            new List<string>{ "5" },
         };
         bowling_glue_object.Then_rolls_become(stringListList18);

}

// -------------------------
// DataType Tests
// -------------------------
[TestMethod]
public void DataType_Pins(){
     Bowling_glue glue = new Bowling_glue();
     List<ValidValuesString> objectList19 = new List<ValidValuesString>{
         new ValidValuesString("0","true",""),
         new ValidValuesString("10","true",""),
         new ValidValuesString("11","false",""),
         new ValidValuesString("-2","false",""),
         new ValidValuesString("-1","true","Used for To Be Rolled"),
     };
     glue.Examples_DataType_Pins(objectList19);
}

[TestMethod]
public void DataType_Score(){
     Bowling_glue glue = new Bowling_glue();
     List<ValidValuesString> objectList20 = new List<ValidValuesString>{
         new ValidValuesString("0","yes",""),
         new ValidValuesString("300","yes",""),
         new ValidValuesString("301","no",""),
         new ValidValuesString("-1","yes","To be scored"),
     };
     glue.Examples_DataType_Score(objectList20);
}

}
}
