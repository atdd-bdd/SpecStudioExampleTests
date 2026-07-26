namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ShippingTyped
    {
        public Dollar totalPrice;
        public Dollar shippingCost;
        public string notes;

        public ShippingTyped(Dollar totalPrice, Dollar shippingCost, string notes)
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

        public static ShippingTyped FromJsonElement(JsonElement m)
        {
            return new ShippingTyped(
                new Dollar(Json.AsString(Json.Require(m, "totalPrice"), "totalPrice")),
                new Dollar(Json.AsString(Json.Require(m, "shippingCost"), "shippingCost")),
                Json.AsString(Json.Require(m, "notes"), "notes")
            );
        }

        public static ShippingTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ShippingTyped> list)
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

        public static List<ShippingTyped> FromJSONList(string json)
        {
            var result = new List<ShippingTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ShippingTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }
    }
}
