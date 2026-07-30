namespace SpecStudioExamplesTestsCSharp.Json
{
    using System;
    using System.Collections.Generic;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    public class Json_glue
    {
        const string DNCString = "?DNC?";

        private List<SimpleClassString> simpleClassValues = new List<SimpleClassString>();
        private string givenJson = string.Empty;
        private string actualJson = string.Empty;
        private List<SimpleClassString> parsedObject = new List<SimpleClassString>();

        // SimpleJson takes plain name/value maps, so it stays independent of the
        // generated test classes. These two moves are the whole of the mapping —
        // the conversion itself belongs to SimpleJson.
        private static Dictionary<string, string> FieldsOf(SimpleClassString value)
        {
            return new Dictionary<string, string>
            {
                { "anInt", value.anInt },
                { "aString", value.aString },
            };
        }

        private static SimpleClassString ObjectOf(Dictionary<string, string> fields)
        {
            return new SimpleClassString(fields["anInt"], fields["aString"]);
        }

        public void Given_one_object_is(List<SimpleClassString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            simpleClassValues = values;
            actualJson = SimpleJson.ToObject(FieldsOf(values[0]));
        }

        public void Then_Json_should_be(string value)
        {
            Console.WriteLine(value);
            // Text to text, with the whitespace between tokens removed from both
            // sides. Whitespace inside a quoted value is kept.
            Assert.AreEqual(SimpleJson.WithoutWhitespace(value),
                            SimpleJson.WithoutWhitespace(actualJson));
        }

        public void Given_Json_is(string value)
        {
            Console.WriteLine(value);
            givenJson = value;
            parsedObject = new List<SimpleClassString> { ObjectOf(SimpleJson.ParseObject(value)) };
        }

        public void Then_the_converted_object_is(List<SimpleClassString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            CollectionAssert.AreEqual(values, parsedObject);
        }

        public void Given_a_table_is(List<SimpleClassString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            simpleClassValues = values;
            var rows = new List<Dictionary<string, string>>();
            foreach (var value in values) rows.Add(FieldsOf(value));
            actualJson = SimpleJson.ToArray(rows);
        }

        public void Then_Json_for_table_should_be(string value)
        {
            Console.WriteLine(value);
            Assert.AreEqual(SimpleJson.WithoutWhitespace(value),
                            SimpleJson.WithoutWhitespace(actualJson));
        }

        public void Given_Json_for_table_is(string value)
        {
            Console.WriteLine(value);
            givenJson = value;
            parsedObject = new List<SimpleClassString>();
            foreach (var row in SimpleJson.ParseArray(value)) parsedObject.Add(ObjectOf(row));
        }

        public void Then_the_converted_table_should_be(List<SimpleClassString> values)
        {
            foreach (var value in values)
            {
                Console.WriteLine(value);
            }
            CollectionAssert.AreEqual(values, parsedObject);
        }
    }
}
