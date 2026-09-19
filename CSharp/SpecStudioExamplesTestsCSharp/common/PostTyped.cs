namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class PostTyped
    {
        public int userId;
        public int id;
        public string title;
        public string body;

        public PostTyped(int userId, int id, string title, string body)
        {
            this.userId = userId;
            this.id = id;
            this.title = title;
            this.body = body;
        }

        public PostString ToPostString()
        {
            return new PostString(
                Json.ToText(this.userId),
                Json.ToText(this.id),
                Json.ToText(this.title),
                Json.ToText(this.body)
            );
        }

        public static List<PostString> ToStringList(List<PostTyped> list)
        {
            var result = new List<PostString>();
            foreach (var t in list) result.Add(t.ToPostString());
            return result;
        }

        public static List<PostTyped> FromStringList(List<PostString> list)
        {
            var result = new List<PostTyped>();
            foreach (var s in list) result.Add(s.ToPostTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("userId", this.userId);
            w.WriteNumber("id", this.id);
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

        public static PostTyped FromJsonElement(JsonElement m)
        {
            return new PostTyped(
                Json.AsInt(Json.Require(m, "userId"), "userId"),
                Json.AsInt(Json.Require(m, "id"), "id"),
                Json.AsString(Json.Require(m, "title"), "title"),
                Json.AsString(Json.Require(m, "body"), "body")
            );
        }

        public static PostTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<PostTyped> list)
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

        public static List<PostTyped> FromJSONList(string json)
        {
            var result = new List<PostTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "PostTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"userId={userId}, id={id}, title={title}, body={body}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not PostTyped other) return false;
            return object.Equals(this.userId, other.userId)
                && object.Equals(this.id, other.id)
                && object.Equals(this.title, other.title)
                && object.Equals(this.body, other.body);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.userId);
            h.Add(this.id);
            h.Add(this.title);
            h.Add(this.body);
            return h.ToHashCode();
        }
    }
}
