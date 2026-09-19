namespace SpecStudioExamplesTestsCSharp.common
{
using System;
using System.Buffers;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Text.Json;
using production;

    public class ApiRequestTyped
    {
        public string method;
        public string page;
        public string parameter;
        public string body;

        public ApiRequestTyped(string method, string page, string parameter, string body)
        {
            this.method = method;
            this.page = page;
            this.parameter = parameter;
            this.body = body;
        }

        public ApiRequestString ToApiRequestString()
        {
            return new ApiRequestString(
                Json.ToText(this.method),
                Json.ToText(this.page),
                Json.ToText(this.parameter),
                Json.ToText(this.body)
            );
        }

        public static List<ApiRequestString> ToStringList(List<ApiRequestTyped> list)
        {
            var result = new List<ApiRequestString>();
            foreach (var t in list) result.Add(t.ToApiRequestString());
            return result;
        }

        public static List<ApiRequestTyped> FromStringList(List<ApiRequestString> list)
        {
            var result = new List<ApiRequestTyped>();
            foreach (var s in list) result.Add(s.ToApiRequestTyped());
            return result;
        }

        public void WriteJson(Utf8JsonWriter w)
        {
            w.WriteStartObject();
            w.WriteString("method", this.method);
            w.WriteString("page", this.page);
            w.WriteString("parameter", this.parameter);
            w.WriteString("body", this.body);
            w.WriteEndObject();
        }

        public string ToJSON()
        {
            var buffer = new ArrayBufferWriter<byte>();
            using (var w = new Utf8JsonWriter(buffer)) { WriteJson(w); }
            return Encoding.UTF8.GetString(buffer.WrittenSpan);
        }

        public static ApiRequestTyped FromJsonElement(JsonElement m)
        {
            return new ApiRequestTyped(
                Json.AsString(Json.Require(m, "method"), "method"),
                Json.AsString(Json.Require(m, "page"), "page"),
                Json.AsString(Json.Require(m, "parameter"), "parameter"),
                Json.AsString(Json.Require(m, "body"), "body")
            );
        }

        public static ApiRequestTyped FromJSON(string json)
        {
            return FromJsonElement(Json.Parse(json));
        }

        public static string ToJSONList(List<ApiRequestTyped> list)
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

        public static List<ApiRequestTyped> FromJSONList(string json)
        {
            var result = new List<ApiRequestTyped>();
            var root = Json.Parse(json);
            Json.RequireArray(root, "ApiRequestTyped");
            foreach (var e in root.EnumerateArray()) result.Add(FromJsonElement(e));
            return result;
        }

        public override string ToString()
        {
            return $"Method={method}, Page={page}, Parameter={parameter}, Body={body}";
        }

        public override bool Equals(object? obj)
        {
            if (obj is not ApiRequestTyped other) return false;
            return object.Equals(this.method, other.method)
                && object.Equals(this.page, other.page)
                && object.Equals(this.parameter, other.parameter)
                && object.Equals(this.body, other.body);
        }

        public override int GetHashCode()
        {
            var h = new System.HashCode();
            h.Add(this.method);
            h.Add(this.page);
            h.Add(this.parameter);
            h.Add(this.body);
            return h.ToHashCode();
        }
    }
}
