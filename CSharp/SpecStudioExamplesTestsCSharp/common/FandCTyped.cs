namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class FandCTyped
    {
        public int f;
        public int c;
        public string notes;

        public FandCTyped(int f, int c, string notes)
        {
            this.f = f;
            this.c = c;
            this.notes = notes;
        }

        public FandCString ToFandCString()
        {
            return new FandCString(
                Json.ToText(this.f),
                Json.ToText(this.c),
                Json.ToText(this.notes)
            );
        }

        public static List<FandCString> ToStringList(List<FandCTyped> list)
        {
            var result = new List<FandCString>();
            foreach (var t in list) result.Add(t.ToFandCString());
            return result;
        }

        public static List<FandCTyped> FromStringList(List<FandCString> list)
        {
            var result = new List<FandCTyped>();
            foreach (var s in list) result.Add(s.ToFandCTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("f", this.f);
            w.WriteNumber("c", this.c);
            w.WriteString("notes", this.notes);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static FandCTyped FromJsonElement(JsonElement m)
        {
            return new FandCTyped(
                Json.AsInt(Json.Require(m, "f"), "f"),
                Json.AsInt(Json.Require(m, "c"), "c"),
                Json.AsString(Json.Require(m, "notes"), "notes")
            );
        }

        public static FandCTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<FandCTyped> list)
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

        public static List<FandCTyped> FromJSONList(string json)
        {
            var result = new List<FandCTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "FandCTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"F={f}, C={c}, Notes={notes}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not FandCTyped other) return false;
            return object.Equals(this.f, other.f)
                && object.Equals(this.c, other.c)
                && object.Equals(this.notes, other.notes);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.f);
            h.Add(this.c);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
