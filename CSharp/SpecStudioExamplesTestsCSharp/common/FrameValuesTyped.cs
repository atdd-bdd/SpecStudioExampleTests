namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class FrameValuesTyped
    {
        public int frame;
        public Pins roll1;
        public Pins roll2;
        public Pins roll3;
        public Score score;
        public Score totalScore;

        public FrameValuesTyped(int frame, Pins roll1, Pins roll2, Pins roll3, Score score, Score totalScore)
        {
            this.frame = frame;
            this.roll1 = roll1;
            this.roll2 = roll2;
            this.roll3 = roll3;
            this.score = score;
            this.totalScore = totalScore;
        }

        public FrameValuesString ToFrameValuesString()
        {
            return new FrameValuesString(
                Json.ToText(this.frame),
                Json.ToText(this.roll1),
                Json.ToText(this.roll2),
                Json.ToText(this.roll3),
                Json.ToText(this.score),
                Json.ToText(this.totalScore)
            );
        }

        public static List<FrameValuesString> ToStringList(List<FrameValuesTyped> list)
        {
            var result = new List<FrameValuesString>();
            foreach (var t in list) result.Add(t.ToFrameValuesString());
            return result;
        }

        public static List<FrameValuesTyped> FromStringList(List<FrameValuesString> list)
        {
            var result = new List<FrameValuesTyped>();
            foreach (var s in list) result.Add(s.ToFrameValuesTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("frame", this.frame);
            w.WriteString("roll1", Json.ToText(this.roll1));
            w.WriteString("roll2", Json.ToText(this.roll2));
            w.WriteString("roll3", Json.ToText(this.roll3));
            w.WriteString("score", Json.ToText(this.score));
            w.WriteString("totalScore", Json.ToText(this.totalScore));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static FrameValuesTyped FromJsonElement(JsonElement m)
        {
            return new FrameValuesTyped(
                Json.AsInt(Json.Require(m, "frame"), "frame"),
                new Pins(Json.AsString(Json.Require(m, "roll1"), "roll1")),
                new Pins(Json.AsString(Json.Require(m, "roll2"), "roll2")),
                new Pins(Json.AsString(Json.Require(m, "roll3"), "roll3")),
                new Score(Json.AsString(Json.Require(m, "score"), "score")),
                new Score(Json.AsString(Json.Require(m, "totalScore"), "totalScore"))
            );
        }

        public static FrameValuesTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<FrameValuesTyped> list)
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

        public static List<FrameValuesTyped> FromJSONList(string json)
        {
            var result = new List<FrameValuesTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "FrameValuesTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Frame={frame}, Roll1={roll1}, Roll2={roll2}, Roll3={roll3}, Score={score}, TotalScore={totalScore}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not FrameValuesTyped other) return false;
            return object.Equals(this.frame, other.frame)
                && object.Equals(this.roll1, other.roll1)
                && object.Equals(this.roll2, other.roll2)
                && object.Equals(this.roll3, other.roll3)
                && object.Equals(this.score, other.score)
                && object.Equals(this.totalScore, other.totalScore);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.frame);
            h.Add(this.roll1);
            h.Add(this.roll2);
            h.Add(this.roll3);
            h.Add(this.score);
            h.Add(this.totalScore);
            return h.ToHashCode();
        }
    }
}
