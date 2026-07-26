namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ShoppingCartTyped
    {
        public OrderItemCollection items;
        public Dollar shipping;
        public Dollar discount;
        public Dollar totalPrice;
        public Address shippingAddress;
        public Address billingAddress;

        public ShoppingCartTyped(OrderItemCollection items, Dollar shipping, Dollar discount, Dollar totalPrice, Address shippingAddress, Address billingAddress)
        {
            this.items = items;
            this.shipping = shipping;
            this.discount = discount;
            this.totalPrice = totalPrice;
            this.shippingAddress = shippingAddress;
            this.billingAddress = billingAddress;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("items", Json.ToText(this.items));
            w.WriteString("shipping", Json.ToText(this.shipping));
            w.WriteString("discount", Json.ToText(this.discount));
            w.WriteString("totalPrice", Json.ToText(this.totalPrice));
            w.WriteString("shippingAddress", Json.ToText(this.shippingAddress));
            w.WriteString("billingAddress", Json.ToText(this.billingAddress));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ShoppingCartTyped FromJsonElement(JsonElement m)
        {
            return new ShoppingCartTyped(
                new OrderItemCollection(Json.AsString(Json.Require(m, "items"), "items")),
                new Dollar(Json.AsString(Json.Require(m, "shipping"), "shipping")),
                new Dollar(Json.AsString(Json.Require(m, "discount"), "discount")),
                new Dollar(Json.AsString(Json.Require(m, "totalPrice"), "totalPrice")),
                new Address(Json.AsString(Json.Require(m, "shippingAddress"), "shippingAddress")),
                new Address(Json.AsString(Json.Require(m, "billingAddress"), "billingAddress"))
            );
        }

        public static ShoppingCartTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ShoppingCartTyped> list)
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

        public static List<ShoppingCartTyped> FromJSONList(string json)
        {
            var result = new List<ShoppingCartTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ShoppingCartTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }
    }
}
