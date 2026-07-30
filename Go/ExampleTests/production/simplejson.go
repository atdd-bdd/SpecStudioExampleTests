package production

// The compact JSON-like text used by the Json specification: names are not
// quoted, values are, and whitespace between tokens is insignificant.
//
//	{anInt:"1",aString:"B"}
//	[{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]
//
// Field order is preserved, so a canonical form can be compared directly.

import (
	"fmt"
	"strings"
	"unicode"
)

// Field is one name/value pair. A slice of these keeps the declared order,
// which a map would not.
type Field struct {
	Name  string
	Value string
}

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

func JSONToObject(fields []Field) string {
	var sb strings.Builder
	sb.WriteByte('{')
	for i, f := range fields {
		if i > 0 {
			sb.WriteByte(',')
		}
		sb.WriteString(f.Name)
		sb.WriteByte(':')
		writeQuoted(&sb, f.Value)
	}
	sb.WriteByte('}')
	return sb.String()
}

func JSONToArray(rows [][]Field) string {
	var sb strings.Builder
	sb.WriteByte('[')
	for i, row := range rows {
		if i > 0 {
			sb.WriteByte(',')
		}
		sb.WriteString(JSONToObject(row))
	}
	sb.WriteByte(']')
	return sb.String()
}

func writeQuoted(sb *strings.Builder, value string) {
	sb.WriteByte('"')
	for _, c := range value {
		if c == '"' || c == '\\' {
			sb.WriteByte('\\')
		}
		sb.WriteRune(c)
	}
	sb.WriteByte('"')
}

// ---------------------------------------------------------------------------
// Reading
// ---------------------------------------------------------------------------

func JSONParseObject(text string) ([]Field, error) {
	c := &cursor{text: []rune(text)}
	fields, err := readObject(c)
	if err != nil {
		return nil, err
	}
	c.skipWhitespace()
	if !c.atEnd() {
		return nil, fmt.Errorf("unexpected text after object at %d", c.i)
	}
	return fields, nil
}

func JSONParseArray(text string) ([][]Field, error) {
	c := &cursor{text: []rune(text)}
	c.skipWhitespace()
	if err := c.expect('['); err != nil {
		return nil, err
	}
	rows := [][]Field{}
	c.skipWhitespace()
	if c.peek() == ']' {
		c.next()
	} else {
		for {
			row, err := readObject(c)
			if err != nil {
				return nil, err
			}
			rows = append(rows, row)
			c.skipWhitespace()
			d := c.next()
			if d == ',' {
				continue
			}
			if d == ']' {
				break
			}
			return nil, fmt.Errorf("expected ',' or ']' at %d", c.i)
		}
	}
	c.skipWhitespace()
	if !c.atEnd() {
		return nil, fmt.Errorf("unexpected text after array at %d", c.i)
	}
	return rows, nil
}

// JSONWithoutWhitespace removes whitespace that sits between tokens, leaving a
// plain string that can be compared to another one directly. Whitespace inside
// a quoted value is part of the value and is kept.
func JSONWithoutWhitespace(text string) string {
	var sb strings.Builder
	runes := []rune(text)
	inQuotes := false
	for i := 0; i < len(runes); i++ {
		c := runes[i]
		switch {
		case inQuotes:
			sb.WriteRune(c)
			if c == '\\' && i+1 < len(runes) {
				sb.WriteRune(runes[i+1])
				i++
			} else if c == '"' {
				inQuotes = false
			}
		case c == '"':
			inQuotes = true
			sb.WriteRune(c)
		case !unicode.IsSpace(c):
			sb.WriteRune(c)
		}
	}
	return sb.String()
}

// ---------------------------------------------------------------------------

func readObject(c *cursor) ([]Field, error) {
	c.skipWhitespace()
	if err := c.expect('{'); err != nil {
		return nil, err
	}
	fields := []Field{}
	c.skipWhitespace()
	if c.peek() == '}' {
		c.next()
		return fields, nil
	}
	for {
		c.skipWhitespace()
		name := readName(c)
		c.skipWhitespace()
		if err := c.expect(':'); err != nil {
			return nil, err
		}
		c.skipWhitespace()
		value, err := readValue(c)
		if err != nil {
			return nil, err
		}
		fields = append(fields, Field{Name: name, Value: value})
		c.skipWhitespace()
		d := c.next()
		if d == ',' {
			continue
		}
		if d == '}' {
			return fields, nil
		}
		return nil, fmt.Errorf("expected ',' or '}' at %d", c.i)
	}
}

// A name is bare text up to the colon, or a quoted string.
func readName(c *cursor) string {
	if c.peek() == '"' {
		v, _ := readQuoted(c)
		return v
	}
	var sb strings.Builder
	for !c.atEnd() && c.peek() != ':' {
		sb.WriteRune(c.next())
	}
	return strings.TrimSpace(sb.String())
}

// A value is a quoted string, or bare text up to the next ',' or '}'.
func readValue(c *cursor) (string, error) {
	if c.peek() == '"' {
		return readQuoted(c)
	}
	var sb strings.Builder
	for !c.atEnd() && c.peek() != ',' && c.peek() != '}' {
		sb.WriteRune(c.next())
	}
	return strings.TrimSpace(sb.String()), nil
}

func readQuoted(c *cursor) (string, error) {
	if err := c.expect('"'); err != nil {
		return "", err
	}
	var sb strings.Builder
	for {
		if c.atEnd() {
			return "", fmt.Errorf("unterminated string at %d", c.i)
		}
		ch := c.next()
		if ch == '"' {
			return sb.String(), nil
		}
		if ch == '\\' && !c.atEnd() {
			ch = c.next()
		}
		sb.WriteRune(ch)
	}
}

type cursor struct {
	text []rune
	i    int
}

func (c *cursor) atEnd() bool { return c.i >= len(c.text) }

func (c *cursor) peek() rune {
	if c.atEnd() {
		return 0
	}
	return c.text[c.i]
}

func (c *cursor) next() rune {
	if c.atEnd() {
		return 0
	}
	ch := c.text[c.i]
	c.i++
	return ch
}

func (c *cursor) skipWhitespace() {
	for !c.atEnd() && unicode.IsSpace(c.text[c.i]) {
		c.i++
	}
}

func (c *cursor) expect(expected rune) error {
	c.skipWhitespace()
	if c.next() != expected {
		return fmt.Errorf("expected '%c' at %d", expected, c.i)
	}
	return nil
}
