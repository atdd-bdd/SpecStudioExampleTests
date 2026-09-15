namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class CartInputTyped
    {
        public Dollar totalItems;
        public Dollar shipping;
        public Dollar discount;
        public Dollar totalPrice;
        public string notes;

        public CartInputTyped(Dollar totalItems, Dollar shipping, Dollar discount, Dollar totalPrice, string notes)
        {
            this.totalItems = totalItems;
            this.shipping = shipping;
            this.discount = discount;
            this.totalPrice = totalPrice;
            this.notes = notes;
        }

        public CartInputString ToCartInputString()
        {
            return new CartInputString(
                Json.ToText(this.totalItems),
                Json.ToText(this.shipping),
                Json.ToText(this.discount),
                Json.ToText(this.totalPrice),
                Json.ToText(this.notes)
            );
        }

        public static List<CartInputString> ToStringList(List<CartInputTyped> list)
        {
            var result = new List<CartInputString>();
            foreach (var t in list) result.Add(t.ToCartInputString());
            return result;
        }

        public static List<CartInputTyped> FromStringList(List<CartInputString> list)
        {
            var result = new List<CartInputTyped>();
            foreach (var s in list) result.Add(s.ToCartInputTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("totalItems", Json.ToText(this.totalItems));
            w.WriteString("shipping", Json.ToText(this.shipping));
            w.WriteString("discount", Json.ToText(this.discount));
            w.WriteString("totalPrice", Json.ToText(this.totalPrice));
            w.WriteString("notes", this.notes);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static CartInputTyped FromJsonElement(JsonElement m)
        {
            return new CartInputTyped(
                new Dollar(Json.AsString(Json.Require(m, "totalItems"), "totalItems")),
                new Dollar(Json.AsString(Json.Require(m, "shipping"), "shipping")),
                new Dollar(Json.AsString(Json.Require(m, "discount"), "discount")),
                new Dollar(Json.AsString(Json.Require(m, "totalPrice"), "totalPrice")),
                Json.AsString(Json.Require(m, "notes"), "notes")
            );
        }

        public static CartInputTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<CartInputTyped> list)
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

        public static List<CartInputTyped> FromJSONList(string json)
        {
            var result = new List<CartInputTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "CartInputTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"TotalItems={totalItems}, Shipping={shipping}, Discount={discount}, Total Price={totalPrice}, Notes={notes}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not CartInputTyped other) return false;
            return object.Equals(this.totalItems, other.totalItems)
                && object.Equals(this.shipping, other.shipping)
                && object.Equals(this.discount, other.discount)
                && object.Equals(this.totalPrice, other.totalPrice)
                && object.Equals(this.notes, other.notes);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalItems);
            h.Add(this.shipping);
            h.Add(this.discount);
            h.Add(this.totalPrice);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
