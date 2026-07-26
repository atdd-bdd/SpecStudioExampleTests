namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ShippingInputTyped
    {
        public Dollar totalPrice;
        public Dollar shippingCost;
        public string notes;

        public ShippingInputTyped(Dollar totalPrice, Dollar shippingCost, string notes)
        {
            this.totalPrice = totalPrice;
            this.shippingCost = shippingCost;
            this.notes = notes;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("totalPrice", Json.ToText(this.totalPrice));
            w.WriteString("shippingCost", Json.ToText(this.shippingCost));
            w.WriteString("notes", this.notes);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ShippingInputTyped FromJsonElement(JsonElement m)
        {
            return new ShippingInputTyped(
                new Dollar(Json.AsString(Json.Require(m, "totalPrice"), "totalPrice")),
                new Dollar(Json.AsString(Json.Require(m, "shippingCost"), "shippingCost")),
                Json.AsString(Json.Require(m, "notes"), "notes")
            );
        }

        public static ShippingInputTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ShippingInputTyped> list)
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

        public static List<ShippingInputTyped> FromJSONList(string json)
        {
            var result = new List<ShippingInputTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ShippingInputTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Total Price={totalPrice}, Shipping Cost={shippingCost}, Notes={notes}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ShippingInputTyped other) return false;
            return object.Equals(this.totalPrice, other.totalPrice)
                && object.Equals(this.shippingCost, other.shippingCost)
                && object.Equals(this.notes, other.notes);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalPrice);
            h.Add(this.shippingCost);
            h.Add(this.notes);
            return h.ToHashCode();
        }
    }
}
