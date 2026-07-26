namespace SpecStudioExamplesTestsCSharp.Types
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    public class Types_glue
    {
        const string DNCString = "?DNC?";

        public void Examples_DataType_Dollar(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                var vvt = value.ToValidValuesTyped();
                bool failed = false;
                try { new Dollar(vvt.value); } catch (FormatException) { failed = true; }
                Assert.AreEqual(vvt.isValid, !failed, $" Value {vvt.value}");
            }
        }

        public void Examples_DataType_SimpleText(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                var vvt = value.ToValidValuesTyped();
                bool failed = false;
                try { new SimpleText(vvt.value); } catch (FormatException) { failed = true; }
                Assert.AreEqual(vvt.isValid, !failed, $" Value {vvt.value}");
            }
        }
    }
}
