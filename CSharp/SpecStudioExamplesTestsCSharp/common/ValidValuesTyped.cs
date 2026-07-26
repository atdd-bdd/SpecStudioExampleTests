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

        public override string ToString()
        {
            return $"Value={value}, IsValid={isValid}, Notes={notes}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ValidValuesTyped other) return false;
            return object.Equals(this.value, other.value)
                && object.Equals(this.isValid, other.isValid)
                && object.Equals(this.notes, other.notes);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.value);
            h.Add(this.isValid);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
