namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class IDValueTyped
    {
        public IDForm iD;
        public int value;

        public IDValueTyped(IDForm iD, int value)
        {
            this.iD = iD;
            this.value = value;
        }

        public IDValueString ToIDValueString()
        {
            return new IDValueString(
                Json.ToText(this.iD),
                Json.ToText(this.value)
            );
        }

        public static List<IDValueString> ToStringList(List<IDValueTyped> list)
        {
            var result = new List<IDValueString>();
            foreach (var t in list) result.Add(t.ToIDValueString());
            return result;
        }

        public static List<IDValueTyped> FromStringList(List<IDValueString> list)
        {
            var result = new List<IDValueTyped>();
            foreach (var s in list) result.Add(s.ToIDValueTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("iD", Json.ToText(this.iD));
            w.WriteNumber("value", this.value);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static IDValueTyped FromJsonElement(JsonElement m)
        {
            return new IDValueTyped(
                new IDForm(Json.AsString(Json.Require(m, "iD"), "iD")),
                Json.AsInt(Json.Require(m, "value"), "value")
            );
        }

        public static IDValueTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<IDValueTyped> list)
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

        public static List<IDValueTyped> FromJSONList(string json)
        {
            var result = new List<IDValueTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "IDValueTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"ID={iD}, Value={value}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not IDValueTyped other) return false;
            return object.Equals(this.iD, other.iD)
                && object.Equals(this.value, other.value);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.iD);
            h.Add(this.value);
            return h.ToHashCode();
        }
    }
}
