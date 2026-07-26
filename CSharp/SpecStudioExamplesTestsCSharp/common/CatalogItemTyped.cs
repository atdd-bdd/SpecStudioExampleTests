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
    }
}
