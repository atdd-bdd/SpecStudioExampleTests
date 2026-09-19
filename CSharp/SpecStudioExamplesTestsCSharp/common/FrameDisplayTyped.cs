namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class FrameDisplayTyped
    {
        public string frame;
        public string mark1;
        public string mark2;
        public string mark3;
        public string totalScore;

        public FrameDisplayTyped(string frame, string mark1, string mark2, string mark3, string totalScore)
        {
            this.frame = frame;
            this.mark1 = mark1;
            this.mark2 = mark2;
            this.mark3 = mark3;
            this.totalScore = totalScore;
        }

        public FrameDisplayString ToFrameDisplayString()
        {
            return new FrameDisplayString(
                Json.ToText(this.frame),
                Json.ToText(this.mark1),
                Json.ToText(this.mark2),
                Json.ToText(this.mark3),
                Json.ToText(this.totalScore)
            );
        }

        public static List<FrameDisplayString> ToStringList(List<FrameDisplayTyped> list)
        {
            var result = new List<FrameDisplayString>();
            foreach (var t in list) result.Add(t.ToFrameDisplayString());
            return result;
        }

        public static List<FrameDisplayTyped> FromStringList(List<FrameDisplayString> list)
        {
            var result = new List<FrameDisplayTyped>();
            foreach (var s in list) result.Add(s.ToFrameDisplayTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("frame", this.frame);
            w.WriteString("mark1", this.mark1);
            w.WriteString("mark2", this.mark2);
            w.WriteString("mark3", this.mark3);
            w.WriteString("totalScore", this.totalScore);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static FrameDisplayTyped FromJsonElement(JsonElement m)
        {
            return new FrameDisplayTyped(
                Json.AsString(Json.Require(m, "frame"), "frame"),
                Json.AsString(Json.Require(m, "mark1"), "mark1"),
                Json.AsString(Json.Require(m, "mark2"), "mark2"),
                Json.AsString(Json.Require(m, "mark3"), "mark3"),
                Json.AsString(Json.Require(m, "totalScore"), "totalScore")
            );
        }

        public static FrameDisplayTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<FrameDisplayTyped> list)
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

        public static List<FrameDisplayTyped> FromJSONList(string json)
        {
            var result = new List<FrameDisplayTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "FrameDisplayTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Frame={frame}, Mark1={mark1}, Mark2={mark2}, Mark3={mark3}, TotalScore={totalScore}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not FrameDisplayTyped other) return false;
            return object.Equals(this.frame, other.frame)
                && object.Equals(this.mark1, other.mark1)
                && object.Equals(this.mark2, other.mark2)
                && object.Equals(this.mark3, other.mark3)
                && object.Equals(this.totalScore, other.totalScore);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.frame);
            h.Add(this.mark1);
            h.Add(this.mark2);
            h.Add(this.mark3);
            h.Add(this.totalScore);
            return h.ToHashCode();
        }
    }
}
