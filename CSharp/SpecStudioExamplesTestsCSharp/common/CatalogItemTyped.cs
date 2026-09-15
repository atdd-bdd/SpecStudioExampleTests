namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class CatalogItemTyped
    {
        public SimpleText name;
        public Dollar price;

        public CatalogItemTyped(SimpleText name, Dollar price)
        {
            this.name = name;
            this.price = price;
        }

        public CatalogItemString ToCatalogItemString()
        {
            return new CatalogItemString(
                Json.ToText(this.name),
                Json.ToText(this.price)
            );
        }

        public static List<CatalogItemString> ToStringList(List<CatalogItemTyped> list)
        {
            var result = new List<CatalogItemString>();
            foreach (var t in list) result.Add(t.ToCatalogItemString());
            return result;
        }

        public static List<CatalogItemTyped> FromStringList(List<CatalogItemString> list)
        {
            var result = new List<CatalogItemTyped>();
            foreach (var s in list) result.Add(s.ToCatalogItemTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("name", Json.ToText(this.name));
            w.WriteString("price", Json.ToText(this.price));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static CatalogItemTyped FromJsonElement(JsonElement m)
        {
            return new CatalogItemTyped(
                new SimpleText(Json.AsString(Json.Require(m, "name"), "name")),
                new Dollar(Json.AsString(Json.Require(m, "price"), "price"))
            );
        }

        public static CatalogItemTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<CatalogItemTyped> list)
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

        public static List<CatalogItemTyped> FromJSONList(string json)
        {
            var result = new List<CatalogItemTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "CatalogItemTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Name={name}, Price={price}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not CatalogItemTyped other) return false;
            return object.Equals(this.name, other.name)
                && object.Equals(this.price, other.price);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.name);
            h.Add(this.price);
            return h.ToHashCode();
        }
    }
}
