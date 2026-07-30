import { SimpleClassString } from "./common/index.js";
import { toObject, toArray, parseObject, parseArray, withoutWhitespace }
  from "./production/SimpleJson.js";

export class JsonGlue {
  static DNC_STRING = "?DNC?";

  constructor() {
    this.simpleClassValues = [];
    this.givenJson = "";
    this.actualJson = "";
    this.parsedObject = [];
  }

  // SimpleJson takes plain name/value pairs, so it stays independent of the
  // generated test classes. These two moves are the whole of the mapping — the
  // conversion itself belongs to SimpleJson.
  static #fieldsOf(value) {
    return [["anInt", value.anInt], ["aString", value.aString]];
  }

  static #objectOf(fields) {
    const map = new Map(fields);
    return new SimpleClassString(map.get("anInt"), map.get("aString"));
  }

  givenOneObjectIs(values) {
    values.forEach(v => console.log(v.toString()));
    this.simpleClassValues = values;
    this.actualJson = toObject(JsonGlue.#fieldsOf(values[0]));
  }

  thenJsonShouldBe(value) {
    console.log(value);
    // Text to text, with the whitespace between tokens removed from both sides.
    // Whitespace inside a quoted value is kept.
    expect(withoutWhitespace(value)).toBe(withoutWhitespace(this.actualJson));
  }

  givenJsonIs(value) {
    console.log(value);
    this.givenJson = value;
    this.parsedObject = [JsonGlue.#objectOf(parseObject(value))];
  }

  thenTheConvertedObjectIs(values) {
    values.forEach(v => console.log(v.toString()));
    expect(SimpleClassString.equalLists(values, this.parsedObject)).toBe(true);
  }

  givenATableIs(values) {
    values.forEach(v => console.log(v.toString()));
    this.simpleClassValues = values;
    this.actualJson = toArray(values.map(v => JsonGlue.#fieldsOf(v)));
  }

  thenJsonForTableShouldBe(value) {
    console.log(value);
    expect(withoutWhitespace(value)).toBe(withoutWhitespace(this.actualJson));
  }

  givenJsonForTableIs(value) {
    console.log(value);
    this.givenJson = value;
    this.parsedObject = parseArray(value).map(row => JsonGlue.#objectOf(row));
  }

  thenTheConvertedTableShouldBe(values) {
    values.forEach(v => console.log(v.toString()));
    expect(SimpleClassString.equalLists(values, this.parsedObject)).toBe(true);
  }
}
