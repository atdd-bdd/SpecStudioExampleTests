namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ReplacePostTyped
    {
        public int id;
        public int userId;
        public string title;
        public string body;

        public ReplacePostTyped(int id, int userId, string title, string body)
        {
            this.id = id;
            this.userId = userId;
            this.title = title;
            this.body = body;
        }

        public ReplacePostString ToReplacePostString()
        {
            return new ReplacePostString(
                Json.ToText(this.id),
                Json.ToText(this.userId),
                Json.ToText(this.title),
                Json.ToText(this.body)
            );
        }

        public static List<ReplacePostString> ToStringList(List<ReplacePostTyped> list)
        {
            var result = new List<ReplacePostString>();
            foreach (var t in list) result.Add(t.ToReplacePostString());
            return result;
        }

        public static List<ReplacePostTyped> FromStringList(List<ReplacePostString> list)
        {
            var result = new List<ReplacePostTyped>();
            foreach (var s in list) result.Add(s.ToReplacePostTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("id", this.id);
            w.WriteNumber("userId", this.userId);
            w.WriteString("title", this.title);
            w.WriteString("body", this.body);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ReplacePostTyped FromJsonElement(JsonElement m)
        {
            return new ReplacePostTyped(
                Json.AsInt(Json.Require(m, "id"), "id"),
                Json.AsInt(Json.Require(m, "userId"), "userId"),
                Json.AsString(Json.Require(m, "title"), "title"),
                Json.AsString(Json.Require(m, "body"), "body")
            );
        }

        public static ReplacePostTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ReplacePostTyped> list)
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

        public static List<ReplacePostTyped> FromJSONList(string json)
        {
            var result = new List<ReplacePostTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ReplacePostTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"id={id}, userId={userId}, title={title}, body={body}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ReplacePostTyped other) return false;
            return object.Equals(this.id, other.id)
                && object.Equals(this.userId, other.userId)
                && object.Equals(this.title, other.title)
                && object.Equals(this.body, other.body);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.id);
            h.Add(this.userId);
            h.Add(this.title);
            h.Add(this.body);
            return h.ToHashCode();
        }
    }
}
