namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class PricingTyped
    {
        public Dollar totalPrice;

        public PricingTyped(Dollar totalPrice)
        {
            this.totalPrice = totalPrice;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("totalPrice", Json.ToText(this.totalPrice));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static PricingTyped FromJsonElement(JsonElement m)
        {
            return new PricingTyped(
                new Dollar(Json.AsString(Json.Require(m, "totalPrice"), "totalPrice"))
            );
        }

        public static PricingTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<PricingTyped> list)
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

        public static List<PricingTyped> FromJSONList(string json)
        {
            var result = new List<PricingTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "PricingTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"TotalPrice={totalPrice}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not PricingTyped other) return false;
            return object.Equals(this.totalPrice, other.totalPrice);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalPrice);
            return h.ToHashCode();
        }
    }
}
