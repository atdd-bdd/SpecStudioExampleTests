namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class InputControlValuesTyped
    {
        public int frame;
        public Pins roll;
        public Pins remaining;

        public InputControlValuesTyped(int frame, Pins roll, Pins remaining)
        {
            this.frame = frame;
            this.roll = roll;
            this.remaining = remaining;
        }

        public InputControlValuesString ToInputControlValuesString()
        {
            return new InputControlValuesString(
                Json.ToText(this.frame),
                Json.ToText(this.roll),
                Json.ToText(this.remaining)
            );
        }

        public static List<InputControlValuesString> ToStringList(List<InputControlValuesTyped> list)
        {
            var result = new List<InputControlValuesString>();
            foreach (var t in list) result.Add(t.ToInputControlValuesString());
            return result;
        }

        public static List<InputControlValuesTyped> FromStringList(List<InputControlValuesString> list)
        {
            var result = new List<InputControlValuesTyped>();
            foreach (var s in list) result.Add(s.ToInputControlValuesTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteNumber("frame", this.frame);
            w.WriteString("roll", Json.ToText(this.roll));
            w.WriteString("remaining", Json.ToText(this.remaining));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static InputControlValuesTyped FromJsonElement(JsonElement m)
        {
            return new InputControlValuesTyped(
                Json.AsInt(Json.Require(m, "frame"), "frame"),
                new Pins(Json.AsString(Json.Require(m, "roll"), "roll")),
                new Pins(Json.AsString(Json.Require(m, "remaining"), "remaining"))
            );
        }

        public static InputControlValuesTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<InputControlValuesTyped> list)
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

        public static List<InputControlValuesTyped> FromJSONList(string json)
        {
            var result = new List<InputControlValuesTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "InputControlValuesTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Frame={frame}, Roll={roll}, Remaining={remaining}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not InputControlValuesTyped other) return false;
            return object.Equals(this.frame, other.frame)
                && object.Equals(this.roll, other.roll)
                && object.Equals(this.remaining, other.remaining);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.frame);
            h.Add(this.roll);
            h.Add(this.remaining);
            return h.ToHashCode();
        }
    }
}
