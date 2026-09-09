using System;
using System.Collections.Generic;
using System.Text;
using production;

namespace SpecStudioExamplesTestsCSharp.common
{
    /// <summary>
    /// The text form of an Entity: its attribute values as space separated
    /// tokens, in the order the attributes are declared. A value containing a
    /// space is wrapped in double quotes; a nested Entity's own text form is
    /// wrapped in single quotes. A run of spaces separates exactly as one does.
    /// </summary>
    public static class Tokens
    {
        public static List<string> Split(string text)
        {
            var outv = new List<string>();
            if (text == null) return outv;
            int n = text.Length, i = 0;
            while (i < n)
            {
                while (i < n && char.IsWhiteSpace(text[i])) i++;
                if (i >= n) break;
                char c = text[i];
                if (c == '"' || c == '\'')
                {
                    int close = ClosingQuote(text, i, c);
                    outv.Add(text.Substring(i + 1, close - i - 1));
                    i = close + 1;
                }
                else
                {
                    int j = i;
                    while (j < n && !char.IsWhiteSpace(text[j])) j++;
                    outv.Add(text.Substring(i, j - i));
                    i = j;
                }
            }
            return outv;
        }

        // The closing quote is the next one of the same kind followed by
        // whitespace or the end of the text, which is what lets a nested Entity,
        // itself single quoted, sit inside a single quoted value.
        private static int ClosingQuote(string text, int open, char quote)
        {
            for (int j = open + 1; j < text.Length; j++)
            {
                if (text[j] != quote) continue;
                if (j + 1 == text.Length || char.IsWhiteSpace(text[j + 1])) return j;
            }
            throw new ArgumentException("No closing " + quote + " in: " + text);
        }

        public static string Token(string value)
        {
            if (string.IsNullOrEmpty(value)) return "\"\"";
            foreach (char c in value) if (char.IsWhiteSpace(c)) return "\"" + value + "\"";
            return value;
        }

        public static string Nested(string text)
        {
            return "'" + (text ?? "") + "'";
        }

        public static List<string> Require(string text, int expected, string typeName)
        {
            var parts = Split(text);
            if (parts.Count != expected)
                throw new ArgumentException(typeName + " takes " + expected
                        + " values but got " + parts.Count + ": " + text);
            return parts;
        }
    }
}
