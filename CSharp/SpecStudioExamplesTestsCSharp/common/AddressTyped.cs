namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class AddressTyped
    {
        public SimpleText street;
        public SimpleText city;
        public SimpleText state;
        public SimpleText zIP;

        public AddressTyped(SimpleText street, SimpleText city, SimpleText state, SimpleText zIP)
        {
            this.street = street;
            this.city = city;
            this.state = state;
            this.zIP = zIP;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("street", Json.ToText(this.street));
            w.WriteString("city", Json.ToText(this.city));
            w.WriteString("state", Json.ToText(this.state));
            w.WriteString("zIP", Json.ToText(this.zIP));
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static AddressTyped FromJsonElement(JsonElement m)
        {
            return new AddressTyped(
                new SimpleText(Json.AsString(Json.Require(m, "street"), "street")),
                new SimpleText(Json.AsString(Json.Require(m, "city"), "city")),
                new SimpleText(Json.AsString(Json.Require(m, "state"), "state")),
                new SimpleText(Json.AsString(Json.Require(m, "zIP"), "zIP"))
            );
        }

        public static AddressTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<AddressTyped> list)
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

        public static List<AddressTyped> FromJSONList(string json)
        {
            var result = new List<AddressTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "AddressTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }
    }
}
