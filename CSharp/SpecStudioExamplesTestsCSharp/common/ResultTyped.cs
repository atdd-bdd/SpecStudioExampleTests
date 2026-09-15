namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ResultTyped
    {
        public List<MatchTyped> addressMatches;

        public ResultTyped(List<MatchTyped> addressMatches)
        {
            this.addressMatches = addressMatches;
        }

        public ResultString ToResultString()
        {
            return new ResultString(
                Json.ToText(this.addressMatches)
            );
        }

        public static List<ResultString> ToStringList(List<ResultTyped> list)
        {
            var result = new List<ResultString>();
            foreach (var t in list) result.Add(t.ToResultString());
            return result;
        }

        public static List<ResultTyped> FromStringList(List<ResultString> list)
        {
            var result = new List<ResultTyped>();
            foreach (var s in list) result.Add(s.ToResultTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WritePropertyName("addressMatches");
            w.WriteStartArray();
            foreach (var e in this.addressMatches) e.WriteJson(w);
            w.WriteEndArray();
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ResultTyped FromJsonElement(JsonElement m)
        {
            return new ResultTyped(
                Json.ReadArray(Json.Require(m, "addressMatches"), e => MatchTyped.FromJsonElement(e))
            );
        }

        public static ResultTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ResultTyped> list)
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

        public static List<ResultTyped> FromJSONList(string json)
        {
            var result = new List<ResultTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ResultTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"addressMatches={addressMatches}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ResultTyped other) return false;
            return object.Equals(this.addressMatches, other.addressMatches);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.addressMatches);
            return h.ToHashCode();
        }
    }
}
