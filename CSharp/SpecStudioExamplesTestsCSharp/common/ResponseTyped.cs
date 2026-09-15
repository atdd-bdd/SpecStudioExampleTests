namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ResponseTyped
    {
        public ResultTyped result;

        public ResponseTyped(ResultTyped result)
        {
            this.result = result;
        }

        public ResponseString ToResponseString()
        {
            return new ResponseString(
                this.result.ToResultString()
            );
        }

        public static List<ResponseString> ToStringList(List<ResponseTyped> list)
        {
            var result = new List<ResponseString>();
            foreach (var t in list) result.Add(t.ToResponseString());
            return result;
        }

        public static List<ResponseTyped> FromStringList(List<ResponseString> list)
        {
            var result = new List<ResponseTyped>();
            foreach (var s in list) result.Add(s.ToResponseTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WritePropertyName("result");
            this.result.WriteJson(w);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ResponseTyped FromJsonElement(JsonElement m)
        {
            return new ResponseTyped(
                ResultTyped.FromJsonElement(Json.Require(m, "result"))
            );
        }

        public static ResponseTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ResponseTyped> list)
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

        public static List<ResponseTyped> FromJSONList(string json)
        {
            var result = new List<ResponseTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ResponseTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"result={result}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ResponseTyped other) return false;
            return object.Equals(this.result, other.result);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.result);
            return h.ToHashCode();
        }
    }
}
