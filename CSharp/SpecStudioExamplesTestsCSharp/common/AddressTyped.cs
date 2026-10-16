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
        public SimpleTextTyped street;
        public SimpleTextTyped city;
        public SimpleTextTyped state;
        public SimpleTextTyped zIP;

        public AddressTyped(SimpleTextTyped street, SimpleTextTyped city, SimpleTextTyped state, SimpleTextTyped zIP)
        {
            this.street = street;
            this.city = city;
            this.state = state;
            this.zIP = zIP;
        }

        public AddressString ToAddressString()
        {
            return new AddressString(
                Json.ToText(this.street),
                Json.ToText(this.city),
                Json.ToText(this.state),
                Json.ToText(this.zIP)
            );
        }

        public static List<AddressString> ToStringList(List<AddressTyped> list)
        {
            var result = new List<AddressString>();
            foreach (var t in list) result.Add(t.ToAddressString());
            return result;
        }

        public static List<AddressTyped> FromStringList(List<AddressString> list)
        {
            var result = new List<AddressTyped>();
            foreach (var s in list) result.Add(s.ToAddressTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("street", this.street.ToString());
            w.WriteString("city", this.city.ToString());
            w.WriteString("state", this.state.ToString());
            w.WriteString("zIP", this.zIP.ToString());
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
                new SimpleTextTyped(new SimpleTextString(Json.AsString(Json.Require(m, "street"), "street"))),
                new SimpleTextTyped(new SimpleTextString(Json.AsString(Json.Require(m, "city"), "city"))),
                new SimpleTextTyped(new SimpleTextString(Json.AsString(Json.Require(m, "state"), "state"))),
                new SimpleTextTyped(new SimpleTextString(Json.AsString(Json.Require(m, "zIP"), "zIP")))
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

        public override string ToString()
        {
            return $"Street={street}, City={city}, State={state}, ZIP={zIP}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not AddressTyped other) return false;
            return object.Equals(this.street, other.street)
                && object.Equals(this.city, other.city)
                && object.Equals(this.state, other.state)
                && object.Equals(this.zIP, other.zIP);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.street);
            h.Add(this.city);
            h.Add(this.state);
            h.Add(this.zIP);
            return h.ToHashCode();
        }
    }
}
