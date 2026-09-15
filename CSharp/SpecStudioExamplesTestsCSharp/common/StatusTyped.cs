namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class StatusTyped
    {
        public int code;

        public StatusTyped(int code)
        {
            this.code = code;
        }

        public StatusString ToStatusString()
        {
            return new StatusString(
                Json.ToText(this.code)
            );
        }

        public static List<StatusString> ToStringList(List<StatusTyped> list)
        {
            var result = new List<StatusString>();
            foreach (var t in list) result.Add(t.ToStatusString());
            return result;
        }

        public static List<StatusTyped> FromStringList(List<StatusString> list)
        {
            var result = new List<StatusTyped>();
            foreach (var s in list) result.Add(s.ToStatusTyped());
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

        public static StatusTyped FromJsonElement(JsonElement m)
        {
            return new StatusTyped(
                Json.AsInt(Json.Require(m, "code"), "code")
            );
        }

        public static StatusTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<StatusTyped> list)
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

        public static List<StatusTyped> FromJSONList(string json)
        {
            var result = new List<StatusTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "StatusTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Code={code}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not StatusTyped other) return false;
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
