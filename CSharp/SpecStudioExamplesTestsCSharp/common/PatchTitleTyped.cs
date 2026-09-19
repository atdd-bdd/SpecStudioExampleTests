namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class PatchTitleTyped
    {
        public string title;

        public PatchTitleTyped(string title)
        {
            this.title = title;
        }

        public PatchTitleString ToPatchTitleString()
        {
            return new PatchTitleString(
                Json.ToText(this.title)
            );
        }

        public static List<PatchTitleString> ToStringList(List<PatchTitleTyped> list)
        {
            var result = new List<PatchTitleString>();
            foreach (var t in list) result.Add(t.ToPatchTitleString());
            return result;
        }

        public static List<PatchTitleTyped> FromStringList(List<PatchTitleString> list)
        {
            var result = new List<PatchTitleTyped>();
            foreach (var s in list) result.Add(s.ToPatchTitleTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("title", this.title);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static PatchTitleTyped FromJsonElement(JsonElement m)
        {
            return new PatchTitleTyped(
                Json.AsString(Json.Require(m, "title"), "title")
            );
        }

        public static PatchTitleTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<PatchTitleTyped> list)
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

        public static List<PatchTitleTyped> FromJSONList(string json)
        {
            var result = new List<PatchTitleTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "PatchTitleTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"title={title}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not PatchTitleTyped other) return false;
            return object.Equals(this.title, other.title);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.title);
            return h.ToHashCode();
        }
    }
}
