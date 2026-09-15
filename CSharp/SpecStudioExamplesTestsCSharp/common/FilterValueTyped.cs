namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class FilterValueTyped
    {
        public IDForm value;

        public FilterValueTyped(IDForm value)
        {
            this.value = value;
        }

        public FilterValueString ToFilterValueString()
        {
            return new FilterValueString(
                Json.ToText(this.value)
            );
        }

        public static List<FilterValueString> ToStringList(List<FilterValueTyped> list)
        {
            var result = new List<FilterValueString>();
            foreach (var t in list) result.Add(t.ToFilterValueString());
            return result;
        }

        public static List<FilterValueTyped> FromStringList(List<FilterValueString> list)
        {
            var result = new List<FilterValueTyped>();
            foreach (var s in list) result.Add(s.ToFilterValueTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("value", Json.ToText(this.value));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static FilterValueTyped FromJsonElement(JsonElement m)
        {
            return new FilterValueTyped(
                new IDForm(Json.AsString(Json.Require(m, "value"), "value"))
            );
        }

        public static FilterValueTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<FilterValueTyped> list)
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

        public static List<FilterValueTyped> FromJSONList(string json)
        {
            var result = new List<FilterValueTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "FilterValueTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Value={value}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not FilterValueTyped other) return false;
            return object.Equals(this.value, other.value);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.value);
            return h.ToHashCode();
        }
    }
}
