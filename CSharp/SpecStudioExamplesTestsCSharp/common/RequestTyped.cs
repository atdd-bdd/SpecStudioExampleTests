namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class RequestTyped
    {
        public string method;
        public string page;
        public string address;
        public string benchmark;
        public string format;

        public RequestTyped(string method, string page, string address, string benchmark, string format)
        {
            this.method = method;
            this.page = page;
            this.address = address;
            this.benchmark = benchmark;
            this.format = format;
        }

        public RequestString ToRequestString()
        {
            return new RequestString(
                Json.ToText(this.method),
                Json.ToText(this.page),
                Json.ToText(this.address),
                Json.ToText(this.benchmark),
                Json.ToText(this.format)
            );
        }

        public static List<RequestString> ToStringList(List<RequestTyped> list)
        {
            var result = new List<RequestString>();
            foreach (var t in list) result.Add(t.ToRequestString());
            return result;
        }

        public static List<RequestTyped> FromStringList(List<RequestString> list)
        {
            var result = new List<RequestTyped>();
            foreach (var s in list) result.Add(s.ToRequestTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("method", this.method);
            w.WriteString("page", this.page);
            w.WriteString("address", this.address);
            w.WriteString("benchmark", this.benchmark);
            w.WriteString("format", this.format);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static RequestTyped FromJsonElement(JsonElement m)
        {
            return new RequestTyped(
                Json.AsString(Json.Require(m, "method"), "method"),
                Json.AsString(Json.Require(m, "page"), "page"),
                Json.AsString(Json.Require(m, "address"), "address"),
                Json.AsString(Json.Require(m, "benchmark"), "benchmark"),
                Json.AsString(Json.Require(m, "format"), "format")
            );
        }

        public static RequestTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<RequestTyped> list)
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

        public static List<RequestTyped> FromJSONList(string json)
        {
            var result = new List<RequestTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "RequestTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Method={method}, Page={page}, Address={address}, Benchmark={benchmark}, Format={format}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not RequestTyped other) return false;
            return object.Equals(this.method, other.method)
                && object.Equals(this.page, other.page)
                && object.Equals(this.address, other.address)
                && object.Equals(this.benchmark, other.benchmark)
                && object.Equals(this.format, other.format);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.method);
            h.Add(this.page);
            h.Add(this.address);
            h.Add(this.benchmark);
            h.Add(this.format);
            return h.ToHashCode();
        }
    }
}
