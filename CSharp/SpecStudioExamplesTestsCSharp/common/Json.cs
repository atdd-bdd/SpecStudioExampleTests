namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Globalization;
using System.Text.Json;
using production;

    /// <summary>
    /// Field accessors over System.Text.Json.  A missing key or a value of the
    /// wrong type throws JsonException.  An explicit JSON null is passed through
    /// rather than treated as an error.
    /// </summary>
    public static class Json
    {
        /// <summary>Parse JSON text into a detached element.</summary>
        public static JsonElement Parse(string text)
        {
            if (text == null) throw new JsonException("JSON text is null");
            try
            {
                // Clone() detaches the element so it stays valid after the
                // document is disposed.
                using (var doc = JsonDocument.Parse(text))
                    return doc.RootElement.Clone();
            }
            catch (JsonException ex)
            {
                throw new JsonException("Invalid JSON: " + ex.Message, ex);
            }
        }

        private static string Describe(JsonElement v)
        {
            switch (v.ValueKind)
            {
                case JsonValueKind.Null:
                case JsonValueKind.Undefined: return "null";
                case JsonValueKind.True:
                case JsonValueKind.False:     return "a boolean";
                case JsonValueKind.Number:    return "a number";
                case JsonValueKind.String:    return "a string";
                case JsonValueKind.Array:     return "an array";
                case JsonValueKind.Object:    return "an object";
                default:                      return "a value";
            }
        }

        private static JsonException TypeError(string ctx, string expected, JsonElement actual)
        {
            return new JsonException(
                "JSON field '" + ctx + "' is not " + expected + " (got " + Describe(actual) + ")");
        }

        public static JsonElement Require(JsonElement obj, string key)
        {
            if (obj.ValueKind != JsonValueKind.Object)
                throw new JsonException("Expected an object holding field '" + key + "'");
            JsonElement value;
            if (!obj.TryGetProperty(key, out value))
                throw new JsonException("Missing JSON field '" + key + "'");
            return value;
        }

        public static void RequireArray(JsonElement v, string ctx)
        {
            if (v.ValueKind != JsonValueKind.Array) throw TypeError(ctx, "an array", v);
        }

        /// <summary>Invariant text for any value; used for user-defined DataTypes.</summary>
        public static string ToText(object value)
        {
            return value == null ? null : Convert.ToString(value, CultureInfo.InvariantCulture);
        }

        public static string AsString(JsonElement v, string ctx)
        {
            switch (v.ValueKind)
            {
                case JsonValueKind.Null:
                case JsonValueKind.Undefined: return null;
                case JsonValueKind.String:    return v.GetString();
                case JsonValueKind.Number:    return v.GetRawText();
                case JsonValueKind.True:      return "true";
                case JsonValueKind.False:     return "false";
                default: throw TypeError(ctx, "a string", v);
            }
        }

        public static decimal AsDecimal(JsonElement v, string ctx)
        {
            decimal d;
            if (v.ValueKind == JsonValueKind.Number && v.TryGetDecimal(out d)) return d;
            if (v.ValueKind == JsonValueKind.String
                && decimal.TryParse(v.GetString(), NumberStyles.Any,
                                    CultureInfo.InvariantCulture, out d)) return d;
            throw TypeError(ctx, "a number", v);
        }

        public static double AsDouble(JsonElement v, string ctx)
        {
            double d;
            if (v.ValueKind == JsonValueKind.Number && v.TryGetDouble(out d)) return d;
            if (v.ValueKind == JsonValueKind.String
                && double.TryParse(v.GetString(), NumberStyles.Any,
                                   CultureInfo.InvariantCulture, out d)) return d;
            throw TypeError(ctx, "a number", v);
        }

        public static int AsInt(JsonElement v, string ctx)
        {
            int i;
            if (v.ValueKind == JsonValueKind.Number && v.TryGetInt32(out i)) return i;
            // Accept 7.0 for an integer field, but not 7.5.
            decimal d = AsDecimal(v, ctx);
            if (decimal.Truncate(d) != d || d < int.MinValue || d > int.MaxValue)
                throw TypeError(ctx, "an integer", v);
            return (int)d;
        }

        public static bool AsBool(JsonElement v, string ctx)
        {
            if (v.ValueKind == JsonValueKind.True)  return true;
            if (v.ValueKind == JsonValueKind.False) return false;
            if (v.ValueKind == JsonValueKind.String)
            {
                string t = (v.GetString() ?? string.Empty).Trim().ToLowerInvariant();
                if (t == "true"  || t == "t" || t == "yes" || t == "y" || t == "1") return true;
                if (t == "false" || t == "f" || t == "no"  || t == "n" || t == "0") return false;
            }
            throw TypeError(ctx, "a boolean", v);
        }

        public static DateTime AsDateTime(JsonElement v, string ctx)
        {
            DateTime dt;
            string text = AsString(v, ctx);
            if (text != null && DateTime.TryParse(text, CultureInfo.InvariantCulture,
                                                  DateTimeStyles.RoundtripKind, out dt)) return dt;
            throw TypeError(ctx, "a date/time", v);
        }

        public static TimeSpan AsTimeSpan(JsonElement v, string ctx)
        {
            TimeSpan ts;
            string text = AsString(v, ctx);
            if (text != null && TimeSpan.TryParse(text, CultureInfo.InvariantCulture, out ts)) return ts;
            throw TypeError(ctx, "a duration", v);
        }
    }
}
