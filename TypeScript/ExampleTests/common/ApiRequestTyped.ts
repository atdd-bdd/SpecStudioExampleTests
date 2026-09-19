import { ApiRequestString } from "./ApiRequestString.js";
import * as _json from "./json.js";

export class ApiRequestTyped {
  method: string;
  page: string;
  parameter: string;
  body: string;

  constructor(method: string, page: string, parameter: string, body: string) {
    this.method = method;
    this.page = page;
    this.parameter = parameter;
    this.body = body;
  }

  static fromStringObj(s: ApiRequestString): ApiRequestTyped {
    return new ApiRequestTyped(
      s.method,
      s.page,
      s.parameter,
      s.body
    );
  }

  toStringObj(): ApiRequestString {
    return new ApiRequestString(
      String(this.method),
      String(this.page),
      String(this.parameter),
      String(this.body)
    );
  }

  static toStringList(list: ApiRequestTyped[]): ApiRequestString[] {
    return list.map(t => t.toStringObj());
  }

  static fromStringList(list: ApiRequestString[]): ApiRequestTyped[] {
    return list.map(s => ApiRequestTyped.fromStringObj(s));
  }

  toJsonValue(): Record<string, unknown> {
    return {
      method: this.method,
      page: this.page,
      parameter: this.parameter,
      body: this.body,
    };
  }

  toJSON(): string { return _json.stringify(this.toJsonValue()); }

  static fromJsonValue(m: unknown): ApiRequestTyped {
    return new ApiRequestTyped(
      _json.asString(_json.requireField(m, "method"), "method"),
      _json.asString(_json.requireField(m, "page"), "page"),
      _json.asString(_json.requireField(m, "parameter"), "parameter"),
      _json.asString(_json.requireField(m, "body"), "body")
    );
  }

  static fromJSON(text: string): ApiRequestTyped {
    return ApiRequestTyped.fromJsonValue(_json.parse(text));
  }

  static toJSONList(items: readonly ApiRequestTyped[]): string {
    return _json.stringify(items.map((item) => item.toJsonValue()));
  }

  static fromJSONList(text: string): ApiRequestTyped[] {
    const raw = _json.asArray(_json.parse(text), "ApiRequestTyped") ?? [];
    return raw.map((e) => ApiRequestTyped.fromJsonValue(e));
  }

  toString(): string {
    return `Method=${this.method}, Page=${this.page}, Parameter=${this.parameter}, Body=${this.body}`;
  }

  equals(other: ApiRequestTyped): boolean {
    return this.method === other.method
      && this.page === other.page
      && this.parameter === other.parameter
      && this.body === other.body;
  }
}
