namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ItemPriceInputTyped
    {
        public Dollar totalItems;

        public ItemPriceInputTyped(Dollar totalItems)
        {
            this.totalItems = totalItems;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("totalItems", Json.ToText(this.totalItems));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ItemPriceInputTyped FromJsonElement(JsonElement m)
        {
            return new ItemPriceInputTyped(
                new Dollar(Json.AsString(Json.Require(m, "totalItems"), "totalItems"))
            );
        }

        public static ItemPriceInputTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ItemPriceInputTyped> list)
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

        public static List<ItemPriceInputTyped> FromJSONList(string json)
        {
            var result = new List<ItemPriceInputTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ItemPriceInputTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"TotalItems={totalItems}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ItemPriceInputTyped other) return false;
            return object.Equals(this.totalItems, other.totalItems);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.totalItems);
            return h.ToHashCode();
        }
    }
}
