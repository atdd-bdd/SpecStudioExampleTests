import { SimpleClassString } from "./common/index.js";
import { toObject, toArray, parseObject, parseArray, withoutWhitespace, Field }
  from "./production/SimpleJson.js";

export class JsonGlue {
  private simpleClassValues: readonly SimpleClassString[] = [];
  private givenJson = "";
  private actualJson = "";
  private parsedObject: SimpleClassString[] = [];

  // SimpleJson takes plain name/value pairs, so it stays independent of the
  // generated test classes. These two moves are the whole of the mapping — the
  // conversion itself belongs to SimpleJson.
  private static fieldsOf(value: SimpleClassString): Field[] {
    return [["anInt", value.anInt], ["aString", value.aString]];
  }

  private static objectOf(fields: readonly Field[]): SimpleClassString {
    const map = new Map<string, string>(fields.map((f) => [f[0], f[1]]));
    return new SimpleClassString(map.get("anInt") ?? "", map.get("aString") ?? "");
  }

  givenOneObjectIs(values: readonly SimpleClassString[]): void {
    values.forEach((v) => console.log(v.toString()));
    this.simpleClassValues = values;
    this.actualJson = toObject(JsonGlue.fieldsOf(values[0]!));
  }

  thenJsonShouldBe(value: string): void {
    console.log(value);
    // Text to text, with the whitespace between tokens removed from both sides.
    // Whitespace inside a quoted value is kept.
    expect(withoutWhitespace(value)).toBe(withoutWhitespace(this.actualJson));
  }

  givenJsonIs(value: string): void {
    console.log(value);
    this.givenJson = value;
    this.parsedObject = [JsonGlue.objectOf(parseObject(value))];
  }

  thenTheConvertedObjectIs(values: readonly SimpleClassString[]): void {
    values.forEach((v) => console.log(v.toString()));
    expect(SimpleClassString.equalLists([...values], this.parsedObject)).toBe(true);
  }

  givenATableIs(values: readonly SimpleClassString[]): void {
    values.forEach((v) => console.log(v.toString()));
    this.simpleClassValues = values;
    this.actualJson = toArray(values.map((v) => JsonGlue.fieldsOf(v)));
  }

  thenJsonForTableShouldBe(value: string): void {
    console.log(value);
    expect(withoutWhitespace(value)).toBe(withoutWhitespace(this.actualJson));
  }

  givenJsonForTableIs(value: string): void {
    console.log(value);
    this.givenJson = value;
    this.parsedObject = parseArray(value).map((row) => JsonGlue.objectOf(row));
  }

  thenTheConvertedTableShouldBe(values: readonly SimpleClassString[]): void {
    values.forEach((v) => console.log(v.toString()));
    expect(SimpleClassString.equalLists([...values], this.parsedObject)).toBe(true);
  }
}
