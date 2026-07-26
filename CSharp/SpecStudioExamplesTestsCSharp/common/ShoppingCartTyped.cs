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
        public List<OrderItemTyped> items;
        public Dollar shipping;
        public Dollar discount;
        public Dollar totalPrice;
        public AddressTyped shippingAddress;
        public AddressTyped billingAddress;

        public ShoppingCartTyped(List<OrderItemTyped> items, Dollar shipping, Dollar discount, Dollar totalPrice, AddressTyped shippingAddress, AddressTyped billingAddress)
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
            w.WritePropertyName("items");
            w.WriteStartArray();
            foreach (var e in this.items) e.WriteJson(w);
            w.WriteEndArray();
            w.WriteString("shipping", Json.ToText(this.shipping));
            w.WriteString("discount", Json.ToText(this.discount));
            w.WriteString("totalPrice", Json.ToText(this.totalPrice));
            w.WritePropertyName("shippingAddress");
            this.shippingAddress.WriteJson(w);
            w.WritePropertyName("billingAddress");
            this.billingAddress.WriteJson(w);
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
                Json.ReadArray(Json.Require(m, "items"), e => OrderItemTyped.FromJsonElement(e)),
                new Dollar(Json.AsString(Json.Require(m, "shipping"), "shipping")),
                new Dollar(Json.AsString(Json.Require(m, "discount"), "discount")),
                new Dollar(Json.AsString(Json.Require(m, "totalPrice"), "totalPrice")),
                AddressTyped.FromJsonElement(Json.Require(m, "shippingAddress")),
                AddressTyped.FromJsonElement(Json.Require(m, "billingAddress"))
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

        public override string ToString()
        {
            return $"Items={items}, Shipping={shipping}, Discount={discount}, TotalPrice={totalPrice}, ShippingAddress={shippingAddress}, BillingAddress={billingAddress}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ShoppingCartTyped other) return false;
            return object.Equals(this.items, other.items)
                && object.Equals(this.shipping, other.shipping)
                && object.Equals(this.discount, other.discount)
                && object.Equals(this.totalPrice, other.totalPrice)
                && object.Equals(this.shippingAddress, other.shippingAddress)
                && object.Equals(this.billingAddress, other.billingAddress);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.items);
            h.Add(this.shipping);
            h.Add(this.discount);
            h.Add(this.totalPrice);
            h.Add(this.shippingAddress);
            h.Add(this.billingAddress);
            return h.ToHashCode();
        }
    }
}
