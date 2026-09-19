namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ApiStatusTyped
    {
        public int code;

        public ApiStatusTyped(int code)
        {
            this.code = code;
        }

        public ApiStatusString ToApiStatusString()
        {
            return new ApiStatusString(
                Json.ToText(this.code)
            );
        }

        public static List<ApiStatusString> ToStringList(List<ApiStatusTyped> list)
        {
            var result = new List<ApiStatusString>();
            foreach (var t in list) result.Add(t.ToApiStatusString());
            return result;
        }

        public static List<ApiStatusTyped> FromStringList(List<ApiStatusString> list)
        {
            var result = new List<ApiStatusTyped>();
            foreach (var s in list) result.Add(s.ToApiStatusTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("code", this.code);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ApiStatusTyped FromJsonElement(JsonElement m)
        {
            return new ApiStatusTyped(
                Json.AsInt(Json.Require(m, "code"), "code")
            );
        }

        public static ApiStatusTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ApiStatusTyped> list)
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

        public static List<ApiStatusTyped> FromJSONList(string json)
        {
            var result = new List<ApiStatusTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ApiStatusTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Code={code}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ApiStatusTyped other) return false;
            return object.Equals(this.code, other.code);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.code);
            return h.ToHashCode();
        }
    }
}
