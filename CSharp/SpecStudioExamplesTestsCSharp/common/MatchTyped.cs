namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class MatchTyped
    {
        public string matchedAddress;
        public AddressComponentsTyped addressComponents;

        public MatchTyped(string matchedAddress, AddressComponentsTyped addressComponents)
        {
            this.matchedAddress = matchedAddress;
            this.addressComponents = addressComponents;
        }

        public MatchString ToMatchString()
        {
            return new MatchString(
                Json.ToText(this.matchedAddress),
                this.addressComponents.ToAddressComponentsString()
            );
        }

        public static List<MatchString> ToStringList(List<MatchTyped> list)
        {
            var result = new List<MatchString>();
            foreach (var t in list) result.Add(t.ToMatchString());
            return result;
        }

        public static List<MatchTyped> FromStringList(List<MatchString> list)
        {
            var result = new List<MatchTyped>();
            foreach (var s in list) result.Add(s.ToMatchTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("matchedAddress", this.matchedAddress);
            w.WritePropertyName("addressComponents");
            this.addressComponents.WriteJson(w);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static MatchTyped FromJsonElement(JsonElement m)
        {
            return new MatchTyped(
                Json.AsString(Json.Require(m, "matchedAddress"), "matchedAddress"),
                AddressComponentsTyped.FromJsonElement(Json.Require(m, "addressComponents"))
            );
        }

        public static MatchTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<MatchTyped> list)
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

        public static List<MatchTyped> FromJSONList(string json)
        {
            var result = new List<MatchTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "MatchTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"matchedAddress={matchedAddress}, addressComponents={addressComponents}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not MatchTyped other) return false;
            return object.Equals(this.matchedAddress, other.matchedAddress)
                && object.Equals(this.addressComponents, other.addressComponents);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.matchedAddress);
            h.Add(this.addressComponents);
            return h.ToHashCode();
        }
    }
}
