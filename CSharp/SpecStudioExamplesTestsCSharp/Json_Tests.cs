namespace SpecStudioExamplesTestsCSharp.Json{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class Json{

[TestMethod]
public void Test_Scenario_Convert_to_Json(){
     Json_glue json_glue_object = new Json_glue();

         List<SimpleClassString> objectList1 = new List<SimpleClassString>{
             new SimpleClassString("1","B"),
         };
         json_glue_object.Given_one_object_is(objectList1);

         json_glue_object.Then_Json_should_be("{anInt:\"1\",aString:\"B\"}");

}

[TestMethod]
public void Test_Scenario_Convert_from_Json(){
     Json_glue json_glue_object = new Json_glue();

         json_glue_object.Given_Json_is("{anInt:  \"1\"   ,   aString:\"B\"  }");

         List<SimpleClassString> objectList2 = new List<SimpleClassString>{
             new SimpleClassString("1","B"),
         };
         json_glue_object.Then_the_converted_object_is(objectList2);

}

[TestMethod]
public void Test_Scenario_Convert_to_Json_Array(){
     Json_glue json_glue_object = new Json_glue();

         List<SimpleClassString> objectList3 = new List<SimpleClassString>{
             new SimpleClassString("1","B"),
             new SimpleClassString("2","C"),
         };
         json_glue_object.Given_a_table_is(objectList3);

         json_glue_object.Then_Json_for_table_should_be("[ {anInt:\"1\",aString:\"B\"} \n, {anInt:\"2\",aString:\"C\"} \n]");

}

[TestMethod]
public void Test_Scenario_Convert_from_Json_Array(){
     Json_glue json_glue_object = new Json_glue();

         json_glue_object.Given_Json_for_table_is("[    {anInt:  \"1\"   ,   aString:\"B\"  },\n{anInt:  \"2\"   ,   aString:\"C\"  }\n]\n");

         List<SimpleClassString> objectList4 = new List<SimpleClassString>{
             new SimpleClassString("1","B"),
             new SimpleClassString("2","C"),
         };
         json_glue_object.Then_the_converted_table_should_be(objectList4);

}

}
}
