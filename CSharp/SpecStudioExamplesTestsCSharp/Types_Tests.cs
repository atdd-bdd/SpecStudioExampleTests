namespace SpecStudioExamplesTestsCSharp.Types{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class Types{

// -------------------------
// DataType Tests
// -------------------------
[TestMethod]
public void DataType_Dollar(){
     Types_glue glue = new Types_glue();
     List<ValidValuesString> objectList1 = new List<ValidValuesString>{
         new ValidValuesString("0","true",""),
         new ValidValuesString("0.01","true",""),
         new ValidValuesString("-1","false","Negative not allowed"),
         new ValidValuesString("0.001","false","Only 2 decimal digits"),
     };
     glue.Examples_DataType_Dollar(objectList1);
}

[TestMethod]
public void DataType_SimpleText(){
     Types_glue glue = new Types_glue();
     List<ValidValuesString> objectList2 = new List<ValidValuesString>{
         new ValidValuesString("abc","y",""),
         new ValidValuesString("ab.","y","period okay"),
         new ValidValuesString("1234567890","y","digits"),
         new ValidValuesString("@","n",""),
         new ValidValuesString("-a-b","y","hyphens"),
     };
     glue.Examples_DataType_SimpleText(objectList2);
}

}
}
