namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class NewPostTyped
    {
        public string title;
        public string body;
        public int userId;

        public NewPostTyped(string title, string body, int userId)
        {
            this.title = title;
            this.body = body;
            this.userId = userId;
        }

        public NewPostString ToNewPostString()
        {
            return new NewPostString(
                Json.ToText(this.title),
                Json.ToText(this.body),
                Json.ToText(this.userId)
            );
        }

        public static List<NewPostString> ToStringList(List<NewPostTyped> list)
        {
            var result = new List<NewPostString>();
            foreach (var t in list) result.Add(t.ToNewPostString());
            return result;
        }

        public static List<NewPostTyped> FromStringList(List<NewPostString> list)
        {
            var result = new List<NewPostTyped>();
            foreach (var s in list) result.Add(s.ToNewPostTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("title", this.title);
            w.WriteString("body", this.body);
            w.WriteNumber("userId", this.userId);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static NewPostTyped FromJsonElement(JsonElement m)
        {
            return new NewPostTyped(
                Json.AsString(Json.Require(m, "title"), "title"),
                Json.AsString(Json.Require(m, "body"), "body"),
                Json.AsInt(Json.Require(m, "userId"), "userId")
            );
        }

        public static NewPostTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<NewPostTyped> list)
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

        public static List<NewPostTyped> FromJSONList(string json)
        {
            var result = new List<NewPostTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "NewPostTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"title={title}, body={body}, userId={userId}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not NewPostTyped other) return false;
            return object.Equals(this.title, other.title)
                && object.Equals(this.body, other.body)
                && object.Equals(this.userId, other.userId);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.title);
            h.Add(this.body);
            h.Add(this.userId);
            return h.ToHashCode();
        }
    }
}
