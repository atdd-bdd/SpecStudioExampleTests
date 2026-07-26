namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class AdderTyped
    {
        public int number1;
        public int number2;
        public int result;

        public AdderTyped(int number1, int number2, int result)
        {
            this.number1 = number1;
            this.number2 = number2;
            this.result = result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("number1", this.number1);
            w.WriteNumber("number2", this.number2);
            w.WriteNumber("result", this.result);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static AdderTyped FromJsonElement(JsonElement m)
        {
            return new AdderTyped(
                Json.AsInt(Json.Require(m, "number1"), "number1"),
                Json.AsInt(Json.Require(m, "number2"), "number2"),
                Json.AsInt(Json.Require(m, "result"), "result")
            );
        }

        public static AdderTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<AdderTyped> list)
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

        public static List<AdderTyped> FromJSONList(string json)
        {
            var result = new List<AdderTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "AdderTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"number1={number1}, number2={number2}, result={result}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not AdderTyped other) return false;
            return object.Equals(this.number1, other.number1)
                && object.Equals(this.number2, other.number2)
                && object.Equals(this.result, other.result);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.number1);
            h.Add(this.number2);
            h.Add(this.result);
            return h.ToHashCode();
        }
    }
}
