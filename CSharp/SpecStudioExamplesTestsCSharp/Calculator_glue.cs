namespace SpecStudioExamplesTestsCSharp.Calculator
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    public class Calculator_glue
    {
        const string DNCString = "?DNC?";

        private readonly production.Calculator calc = new production.Calculator();

        public void Examples_Calculation_Add_two_numbers(List<AdderString> values)
        {
            foreach (var value in values)
            {
                var typed = value.ToAdderTyped();
                Assert.AreEqual(typed.result, calc.Add(typed.number1, typed.number2),
                                $"Add {typed.number1} + {typed.number2}");
            }
        }
    }
}
