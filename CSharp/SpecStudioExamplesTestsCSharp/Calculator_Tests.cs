namespace SpecStudioExamplesTestsCSharp.Calculator{
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using SpecStudioExamplesTestsCSharp.common;
using production;

[TestClass]
public class Calculator{

// -------------------------
// Calculation Tests
// -------------------------
[TestMethod]
public void Calculation_Add_two_numbers(){
     Calculator_glue glue = new Calculator_glue();
     List<AdderString> objectList1 = new List<AdderString>{
         new AdderString("2","3","5"),
         new AdderString("10","20","30"),
         new AdderString("-1","1","0"),
     };
     glue.Examples_Calculation_Add_two_numbers(objectList1);
}

}
}
