namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class SimpleClassTyped
    {
        public int anInt;
        public string aString;

        public SimpleClassTyped(int anInt, string aString)
        {
            this.anInt = anInt;
            this.aString = aString;
        }

        public SimpleClassString ToSimpleClassString()
        {
            return new SimpleClassString(
                Json.ToText(this.anInt),
                Json.ToText(this.aString)
            );
        }

        public static List<SimpleClassString> ToStringList(List<SimpleClassTyped> list)
        {
            var result = new List<SimpleClassString>();
            foreach (var t in list) result.Add(t.ToSimpleClassString());
            return result;
        }

        public static List<SimpleClassTyped> FromStringList(List<SimpleClassString> list)
        {
            var result = new List<SimpleClassTyped>();
            foreach (var s in list) result.Add(s.ToSimpleClassTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("anInt", this.anInt);
            w.WriteString("aString", this.aString);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static SimpleClassTyped FromJsonElement(JsonElement m)
        {
            return new SimpleClassTyped(
                Json.AsInt(Json.Require(m, "anInt"), "anInt"),
                Json.AsString(Json.Require(m, "aString"), "aString")
            );
        }

        public static SimpleClassTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<SimpleClassTyped> list)
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

        public static List<SimpleClassTyped> FromJSONList(string json)
        {
            var result = new List<SimpleClassTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "SimpleClassTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"anInt={anInt}, aString={aString}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not SimpleClassTyped other) return false;
            return object.Equals(this.anInt, other.anInt)
                && object.Equals(this.aString, other.aString);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.anInt);
            h.Add(this.aString);
            return h.ToHashCode();
        }
    }
}
