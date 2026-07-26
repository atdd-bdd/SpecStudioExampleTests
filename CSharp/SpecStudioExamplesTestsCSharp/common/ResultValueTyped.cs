namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ResultValueTyped
    {
        public int sum;

        public ResultValueTyped(int sum)
        {
            this.sum = sum;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("sum", this.sum);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ResultValueTyped FromJsonElement(JsonElement m)
        {
            return new ResultValueTyped(
                Json.AsInt(Json.Require(m, "sum"), "sum")
            );
        }

        public static ResultValueTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ResultValueTyped> list)
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

        public static List<ResultValueTyped> FromJSONList(string json)
        {
            var result = new List<ResultValueTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ResultValueTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Sum={sum}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ResultValueTyped other) return false;
            return object.Equals(this.sum, other.sum);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.sum);
            return h.ToHashCode();
        }
    }
}
