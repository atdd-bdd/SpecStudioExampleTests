namespace production
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    /// <summary>
    /// The compact JSON-like text used by the Json specification: names are not
    /// quoted, values are, and whitespace between tokens is insignificant.
    ///
    ///     {anInt:"1",aString:"B"}
    ///     [{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]
    ///
    /// Field order is preserved, so a canonical form can be compared directly.
    /// </summary>
    public static class SimpleJson
    {
        // -----------------------------------------------------------------
        // Writing
        // -----------------------------------------------------------------

        public static string ToObject(IEnumerable<KeyValuePair<string, string>> fields)
        {
            var sb = new StringBuilder("{");
            bool first = true;
            foreach (var field in fields)
            {
                if (!first) sb.Append(',');
                first = false;
                sb.Append(field.Key).Append(':');
                AppendQuoted(sb, field.Value);
            }
            return sb.Append('}').ToString();
        }

        public static string ToArray(List<Dictionary<string, string>> rows)
        {
            var sb = new StringBuilder("[");
            for (int i = 0; i < rows.Count; i++)
            {
                if (i > 0) sb.Append(',');
                sb.Append(ToObject(rows[i]));
            }
            return sb.Append(']').ToString();
        }

        private static void AppendQuoted(StringBuilder sb, string? value)
        {
            sb.Append('"');
            if (value != null)
            {
                foreach (char c in value)
                {
                    if (c == '"' || c == '\\') sb.Append('\\');
                    sb.Append(c);
                }
            }
            sb.Append('"');
        }

        // -----------------------------------------------------------------
        // Reading
        // -----------------------------------------------------------------

        public static Dictionary<string, string> ParseObject(string text)
        {
            var c = new Cursor(text);
            var fields = ReadObject(c);
            c.SkipWhitespace();
            if (!c.AtEnd) throw new FormatException($"Unexpected text after object at {c.Pos}");
            return fields;
        }

        public static List<Dictionary<string, string>> ParseArray(string text)
        {
            var c = new Cursor(text);
            c.SkipWhitespace();
            c.Expect('[');
            var rows = new List<Dictionary<string, string>>();
            c.SkipWhitespace();
            if (c.Peek() == ']')
            {
                c.Next();
            }
            else
            {
                while (true)
                {
                    rows.Add(ReadObject(c));
                    c.SkipWhitespace();
                    char d = c.Next();
                    if (d == ',') continue;
                    if (d == ']') break;
                    throw new FormatException($"Expected ',' or ']' at {c.Pos}");
                }
            }
            c.SkipWhitespace();
            if (!c.AtEnd) throw new FormatException($"Unexpected text after array at {c.Pos}");
            return rows;
        }

        /// <summary>
        /// Remove whitespace that sits between tokens, leaving a plain string that
        /// can be compared to another one directly. Whitespace inside a quoted
        /// value is part of the value and is kept.
        /// </summary>
        public static string WithoutWhitespace(string? text)
        {
            if (text == null) return string.Empty;
            var sb = new StringBuilder(text.Length);
            bool inQuotes = false;
            for (int i = 0; i < text.Length; i++)
            {
                char c = text[i];
                if (inQuotes)
                {
                    sb.Append(c);
                    if (c == '\\' && i + 1 < text.Length)
                    {
                        sb.Append(text[i + 1]);
                        i++;
                    }
                    else if (c == '"')
                    {
                        inQuotes = false;
                    }
                }
                else if (c == '"')
                {
                    inQuotes = true;
                    sb.Append(c);
                }
                else if (!char.IsWhiteSpace(c))
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        // -----------------------------------------------------------------

        private static Dictionary<string, string> ReadObject(Cursor c)
        {
            c.SkipWhitespace();
            c.Expect('{');
            var fields = new Dictionary<string, string>();
            c.SkipWhitespace();
            if (c.Peek() == '}') { c.Next(); return fields; }

            while (true)
            {
                c.SkipWhitespace();
                string name = ReadName(c);
                c.SkipWhitespace();
                c.Expect(':');
                c.SkipWhitespace();
                fields[name] = ReadValue(c);
                c.SkipWhitespace();
                char d = c.Next();
                if (d == ',') continue;
                if (d == '}') return fields;
                throw new FormatException($"Expected ',' or '}}' at {c.Pos}");
            }
        }

        /// <summary>A name is bare text up to the colon, or a quoted string.</summary>
        private static string ReadName(Cursor c)
        {
            if (c.Peek() == '"') return ReadQuoted(c);
            var sb = new StringBuilder();
            while (!c.AtEnd && c.Peek() != ':') sb.Append(c.Next());
            return sb.ToString().Trim();
        }

        /// <summary>A value is a quoted string, or bare text up to the next ',' or '}'.</summary>
        private static string ReadValue(Cursor c)
        {
            if (c.Peek() == '"') return ReadQuoted(c);
            var sb = new StringBuilder();
            while (!c.AtEnd && c.Peek() != ',' && c.Peek() != '}') sb.Append(c.Next());
            return sb.ToString().Trim();
        }

        private static string ReadQuoted(Cursor c)
        {
            c.Expect('"');
            var sb = new StringBuilder();
            while (true)
            {
                if (c.AtEnd) throw new FormatException($"Unterminated string at {c.Pos}");
                char ch = c.Next();
                if (ch == '"') return sb.ToString();
                if (ch == '\\' && !c.AtEnd) ch = c.Next();
                sb.Append(ch);
            }
        }

        private sealed class Cursor
        {
            private readonly string _text;
            private int _i;

            public Cursor(string? text) { _text = text ?? string.Empty; }

            public int Pos => _i;
            public bool AtEnd => _i >= _text.Length;
            public char Peek() => AtEnd ? '\0' : _text[_i];
            public char Next() => AtEnd ? '\0' : _text[_i++];

            public void SkipWhitespace()
            {
                while (!AtEnd && char.IsWhiteSpace(_text[_i])) _i++;
            }

            public void Expect(char expected)
            {
                SkipWhitespace();
                if (Next() != expected)
                    throw new FormatException($"Expected '{expected}' at {_i}");
            }
        }
    }
}
