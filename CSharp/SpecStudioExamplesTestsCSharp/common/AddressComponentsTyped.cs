namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class AddressComponentsTyped
    {
        public string zip;
        public string streetName;
        public string city;
        public string preDirection;
        public string suffixDirection;
        public string state;
        public string suffixType;

        public AddressComponentsTyped(string zip, string streetName, string city, string preDirection, string suffixDirection, string state, string suffixType)
        {
            this.zip = zip;
            this.streetName = streetName;
            this.city = city;
            this.preDirection = preDirection;
            this.suffixDirection = suffixDirection;
            this.state = state;
            this.suffixType = suffixType;
        }

        public AddressComponentsString ToAddressComponentsString()
        {
            return new AddressComponentsString(
                Json.ToText(this.zip),
                Json.ToText(this.streetName),
                Json.ToText(this.city),
                Json.ToText(this.preDirection),
                Json.ToText(this.suffixDirection),
                Json.ToText(this.state),
                Json.ToText(this.suffixType)
            );
        }

        public static List<AddressComponentsString> ToStringList(List<AddressComponentsTyped> list)
        {
            var result = new List<AddressComponentsString>();
            foreach (var t in list) result.Add(t.ToAddressComponentsString());
            return result;
        }

        public static List<AddressComponentsTyped> FromStringList(List<AddressComponentsString> list)
        {
            var result = new List<AddressComponentsTyped>();
            foreach (var s in list) result.Add(s.ToAddressComponentsTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("zip", this.zip);
            w.WriteString("streetName", this.streetName);
            w.WriteString("city", this.city);
            w.WriteString("preDirection", this.preDirection);
            w.WriteString("suffixDirection", this.suffixDirection);
            w.WriteString("state", this.state);
            w.WriteString("suffixType", this.suffixType);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static AddressComponentsTyped FromJsonElement(JsonElement m)
        {
            return new AddressComponentsTyped(
                Json.AsString(Json.Require(m, "zip"), "zip"),
                Json.AsString(Json.Require(m, "streetName"), "streetName"),
                Json.AsString(Json.Require(m, "city"), "city"),
                Json.AsString(Json.Require(m, "preDirection"), "preDirection"),
                Json.AsString(Json.Require(m, "suffixDirection"), "suffixDirection"),
                Json.AsString(Json.Require(m, "state"), "state"),
                Json.AsString(Json.Require(m, "suffixType"), "suffixType")
            );
        }

        public static AddressComponentsTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<AddressComponentsTyped> list)
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

        public static List<AddressComponentsTyped> FromJSONList(string json)
        {
            var result = new List<AddressComponentsTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "AddressComponentsTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"zip={zip}, streetName={streetName}, city={city}, preDirection={preDirection}, suffixDirection={suffixDirection}, state={state}, suffixType={suffixType}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not AddressComponentsTyped other) return false;
            return object.Equals(this.zip, other.zip)
                && object.Equals(this.streetName, other.streetName)
                && object.Equals(this.city, other.city)
                && object.Equals(this.preDirection, other.preDirection)
                && object.Equals(this.suffixDirection, other.suffixDirection)
                && object.Equals(this.state, other.state)
                && object.Equals(this.suffixType, other.suffixType);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.zip);
            h.Add(this.streetName);
            h.Add(this.city);
            h.Add(this.preDirection);
            h.Add(this.suffixDirection);
            h.Add(this.state);
            h.Add(this.suffixType);
            return h.ToHashCode();
        }
    }
}
