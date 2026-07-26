namespace SpecStudioExamplesTestsCSharp.Record_Filter_Example{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class Record_Filter_Example{

[TestMethod]
public void Test_Scenario_Filter_Data_by_ID(){
     Record_Filter_Example_glue record_Filter_Example_glue_object = new Record_Filter_Example_glue();

         List<IDValueString> objectList1 = new List<IDValueString>{
             new IDValueString("Q1234","1"),
             new IDValueString("Q9999","2"),
             new IDValueString("Q1234","3"),
         };
         record_Filter_Example_glue_object.Given_list_of_numbers(objectList1);

         List<List<string>> stringListList2 = new List<List<string>>{
            new List<string>{ "Q1234" },
         };
         record_Filter_Example_glue_object.When_filtered_by_ID_with_value(stringListList2);

         List<List<string>> stringListList3 = new List<List<string>>{
            new List<string>{ "4" },
         };
         record_Filter_Example_glue_object.Then_sum_is(stringListList3);

}

[TestMethod]
public void Test_Scenario_Filter_Data_Another_Way(){
     Record_Filter_Example_glue record_Filter_Example_glue_object = new Record_Filter_Example_glue();

         List<IDValueString> objectList4 = new List<IDValueString>{
             new IDValueString("Q1234","1"),
             new IDValueString("Q9999","2"),
             new IDValueString("Q1234","3"),
         };
         record_Filter_Example_glue_object.Given_list_of_numbers(objectList4);

         List<FilterValueString> objectList5 = new List<FilterValueString>{
             new FilterValueString("Q1234"),
         };
         record_Filter_Example_glue_object.When_filtered_by(objectList5);

         List<ResultValueString> objectList6 = new List<ResultValueString>{
             new ResultValueString("4"),
         };
         record_Filter_Example_glue_object.Then_result(objectList6);

}

[TestMethod]
public void Test_Scenario_Add_another_value(){
     Record_Filter_Example_glue record_Filter_Example_glue_object = new Record_Filter_Example_glue();

         List<IDValueString> objectList7 = new List<IDValueString>{
             new IDValueString("Q1234","1"),
             new IDValueString("Q9999","2"),
             new IDValueString("Q1234","3"),
         };
         record_Filter_Example_glue_object.Given_list_of_numbers(objectList7);

         List<IDValueString> objectList8 = new List<IDValueString>{
             new IDValueString("Q1234","4"),
         };
         record_Filter_Example_glue_object.When_element_added(objectList8);

         List<FilterValueString> objectList9 = new List<FilterValueString>{
             new FilterValueString("Q1234"),
         };
         record_Filter_Example_glue_object.When_filtered_by(objectList9);

         List<ResultValueString> objectList10 = new List<ResultValueString>{
             new ResultValueString("8"),
         };
         record_Filter_Example_glue_object.Then_result(objectList10);

}

// -------------------------
// Calculation Tests
// -------------------------
[TestMethod]
public void Calculation_Convert_F_to_C(){
     Record_Filter_Example_glue glue = new Record_Filter_Example_glue();
     List<FandCString> objectList11 = new List<FandCString>{
         new FandCString("32","0","Freezing"),
         new FandCString("212","100","Boiling"),
         new FandCString("-40","-40","Below zero"),
         new FandCString("68","20","Photo chem"),
     };
     glue.Examples_Calculation_Convert_F_to_C(objectList11);
}

// -------------------------
// DataType Tests
// -------------------------
[TestMethod]
public void DataType_IDForm(){
     Record_Filter_Example_glue glue = new Record_Filter_Example_glue();
     List<ValidValuesString> objectList12 = new List<ValidValuesString>{
         new ValidValuesString("Q1234","true",""),
         new ValidValuesString("Q123","false","Too short"),
         new ValidValuesString("Q12345","false","Too long"),
         new ValidValuesString("A1234","false","Must begin with Q"),
     };
     glue.Examples_DataType_IDForm(objectList12);
}

}
}
