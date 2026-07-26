namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class DiscountingTyped
    {
        public Dollar totalPrice;
        public Percentage discount;
        public string notes;

        public DiscountingTyped(Dollar totalPrice, Percentage discount, string notes)
        {
            this.totalPrice = totalPrice;
            this.discount = discount;
            this.notes = notes;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("totalPrice", Json.ToText(this.totalPrice));
            w.WriteString("discount", Json.ToText(this.discount));
            w.WriteString("notes", this.notes);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static DiscountingTyped FromJsonElement(JsonElement m)
        {
            return new DiscountingTyped(
                new Dollar(Json.AsString(Json.Require(m, "totalPrice"), "totalPrice")),
                new Percentage(Json.AsString(Json.Require(m, "discount"), "discount")),
                Json.AsString(Json.Require(m, "notes"), "notes")
            );
        }

        public static DiscountingTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<DiscountingTyped> list)
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

        public static List<DiscountingTyped> FromJSONList(string json)
        {
            var result = new List<DiscountingTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "DiscountingTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Total Price={totalPrice}, Discount={discount}, Notes={notes}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not DiscountingTyped other) return false;
            return object.Equals(this.totalPrice, other.totalPrice)
                && object.Equals(this.discount, other.discount)
                && object.Equals(this.notes, other.notes);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalPrice);
            h.Add(this.discount);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
