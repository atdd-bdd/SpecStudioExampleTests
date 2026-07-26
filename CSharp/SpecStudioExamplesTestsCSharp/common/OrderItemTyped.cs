namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class OrderItemTyped
    {
        public SimpleText name;
        public int quantity;
        public Dollar price;
        public Dollar itemTotal;

        public OrderItemTyped(SimpleText name, int quantity, Dollar price, Dollar itemTotal)
        {
            this.name = name;
            this.quantity = quantity;
            this.price = price;
            this.itemTotal = itemTotal;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("name", Json.ToText(this.name));
            w.WriteNumber("quantity", this.quantity);
            w.WriteString("price", Json.ToText(this.price));
            w.WriteString("itemTotal", Json.ToText(this.itemTotal));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static OrderItemTyped FromJsonElement(JsonElement m)
        {
            return new OrderItemTyped(
                new SimpleText(Json.AsString(Json.Require(m, "name"), "name")),
                Json.AsInt(Json.Require(m, "quantity"), "quantity"),
                new Dollar(Json.AsString(Json.Require(m, "price"), "price")),
                new Dollar(Json.AsString(Json.Require(m, "itemTotal"), "itemTotal"))
            );
        }

        public static OrderItemTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<OrderItemTyped> list)
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

        public static List<OrderItemTyped> FromJSONList(string json)
        {
            var result = new List<OrderItemTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "OrderItemTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }
    }
}
