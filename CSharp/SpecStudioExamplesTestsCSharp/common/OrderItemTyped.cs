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
        public SimpleTextTyped name;
        public int quantity;
        public DollarTyped price;
        public DollarTyped itemTotal;

        public OrderItemTyped(SimpleTextTyped name, int quantity, DollarTyped price, DollarTyped itemTotal)
        {
            this.name = name;
            this.quantity = quantity;
            this.price = price;
            this.itemTotal = itemTotal;
        }

        public OrderItemString ToOrderItemString()
        {
            return new OrderItemString(
                Json.ToText(this.name),
                Json.ToText(this.quantity),
                Json.ToText(this.price),
                Json.ToText(this.itemTotal)
            );
        }

        public static List<OrderItemString> ToStringList(List<OrderItemTyped> list)
        {
            var result = new List<OrderItemString>();
            foreach (var t in list) result.Add(t.ToOrderItemString());
            return result;
        }

        public static List<OrderItemTyped> FromStringList(List<OrderItemString> list)
        {
            var result = new List<OrderItemTyped>();
            foreach (var s in list) result.Add(s.ToOrderItemTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("name", this.name.ToString());
            w.WriteNumber("quantity", this.quantity);
            w.WriteString("price", this.price.ToString());
            w.WriteString("itemTotal", this.itemTotal.ToString());
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
                new SimpleTextTyped(new SimpleTextString(Json.AsString(Json.Require(m, "name"), "name"))),
                Json.AsInt(Json.Require(m, "quantity"), "quantity"),
                new DollarTyped(new DollarString(Json.AsString(Json.Require(m, "price"), "price"))),
                new DollarTyped(new DollarString(Json.AsString(Json.Require(m, "itemTotal"), "itemTotal")))
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

        public override string ToString()
        {
            return $"Name={name}, Quantity={quantity}, Price={price}, ItemTotal={itemTotal}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not OrderItemTyped other) return false;
            return object.Equals(this.name, other.name)
                && object.Equals(this.quantity, other.quantity)
                && object.Equals(this.price, other.price)
                && object.Equals(this.itemTotal, other.itemTotal);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.name);
            h.Add(this.quantity);
            h.Add(this.price);
            h.Add(this.itemTotal);
            return h.ToHashCode();
        }
    }
}
