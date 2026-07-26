namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ValidValuesTyped
    {
        public string value;
        public bool isValid;
        public string notes;

        public ValidValuesTyped(string value, bool isValid, string notes)
        {
            this.value = value;
            this.isValid = isValid;
            this.notes = notes;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("value", this.value);
            w.WriteBoolean("isValid", this.isValid);
            w.WriteString("notes", this.notes);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ValidValuesTyped FromJsonElement(JsonElement m)
        {
            return new ValidValuesTyped(
                Json.AsString(Json.Require(m, "value"), "value"),
                Json.AsBool(Json.Require(m, "isValid"), "isValid"),
                Json.AsString(Json.Require(m, "notes"), "notes")
            );
        }

        public static ValidValuesTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ValidValuesTyped> list)
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer))
            {
                w.WriteStartArray();
                foreach (var item in list) item.WriteJson(w);
                w.WriteEndArray();
            }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static List<ValidValuesTyped> FromJSONList(string json)
        {
            var result = new List<ValidValuesTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ValidValuesTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }
    }
}
