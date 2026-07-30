package exampletests

import (
	"testing"
	"exampletests/common"
	"exampletests/production"
)

type JsonGlue struct {
	simpleClassValues []common.SimpleClassString
	givenJson         string
	actualJson        string
	parsedObject      []common.SimpleClassString
}

func NewJsonGlue() *JsonGlue { return &JsonGlue{} }

// SimpleJson takes plain name/value pairs, so it stays independent of the
// generated test structs. These two moves are the whole of the mapping — the
// conversion itself belongs to SimpleJson.
func fieldsOf(value common.SimpleClassString) []production.Field {
	return []production.Field{
		{Name: "anInt", Value: value.AnInt},
		{Name: "aString", Value: value.AString},
	}
}

func objectOf(fields []production.Field) common.SimpleClassString {
	s := common.SimpleClassString{}
	for _, f := range fields {
		switch f.Name {
		case "anInt":
			s.AnInt = f.Value
		case "aString":
			s.AString = f.Value
		}
	}
	return s
}

func (g *JsonGlue) GivenOneObjectIs(t *testing.T, values []common.SimpleClassString) {
	for _, value := range values {
		t.Log(value)
	}
	g.simpleClassValues = values
	g.actualJson = production.JSONToObject(fieldsOf(values[0]))
}

func (g *JsonGlue) ThenJsonShouldBe(t *testing.T, value string) {
	t.Log(value)
	// Text to text, with the whitespace between tokens removed from both sides.
	// Whitespace inside a quoted value is kept.
	expected := production.JSONWithoutWhitespace(value)
	actual := production.JSONWithoutWhitespace(g.actualJson)
	if expected != actual {
		t.Errorf("expected %q, got %q", expected, actual)
	}
}

func (g *JsonGlue) GivenJsonIs(t *testing.T, value string) {
	t.Log(value)
	g.givenJson = value
	fields, err := production.JSONParseObject(value)
	if err != nil {
		t.Fatal(err)
	}
	g.parsedObject = []common.SimpleClassString{objectOf(fields)}
}

func (g *JsonGlue) ThenTheConvertedObjectIs(t *testing.T, values []common.SimpleClassString) {
	for _, value := range values {
		t.Log(value)
	}
	if !common.EqualSimpleClassStringSlices(values, g.parsedObject) {
		t.Errorf("expected %v, got %v", values, g.parsedObject)
	}
}

func (g *JsonGlue) GivenATableIs(t *testing.T, values []common.SimpleClassString) {
	for _, value := range values {
		t.Log(value)
	}
	g.simpleClassValues = values
	rows := make([][]production.Field, 0, len(values))
	for _, value := range values {
		rows = append(rows, fieldsOf(value))
	}
	g.actualJson = production.JSONToArray(rows)
}

func (g *JsonGlue) ThenJsonForTableShouldBe(t *testing.T, value string) {
	t.Log(value)
	expected := production.JSONWithoutWhitespace(value)
	actual := production.JSONWithoutWhitespace(g.actualJson)
	if expected != actual {
		t.Errorf("expected %q, got %q", expected, actual)
	}
}

func (g *JsonGlue) GivenJsonForTableIs(t *testing.T, value string) {
	t.Log(value)
	g.givenJson = value
	rows, err := production.JSONParseArray(value)
	if err != nil {
		t.Fatal(err)
	}
	g.parsedObject = make([]common.SimpleClassString, 0, len(rows))
	for _, row := range rows {
		g.parsedObject = append(g.parsedObject, objectOf(row))
	}
}

func (g *JsonGlue) ThenTheConvertedTableShouldBe(t *testing.T, values []common.SimpleClassString) {
	for _, value := range values {
		t.Log(value)
	}
	if !common.EqualSimpleClassStringSlices(values, g.parsedObject) {
		t.Errorf("expected %v, got %v", values, g.parsedObject)
	}
}
