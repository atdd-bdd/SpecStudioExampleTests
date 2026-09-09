package common

import (
	"fmt"
	"strings"
	"unicode"
)

// The text form of an Entity: its attribute values as space separated tokens,
// in the order the attributes are declared. A value containing a space is
// wrapped in double quotes; a nested Entity's own text form is wrapped in
// single quotes. A run of spaces separates exactly as a single space does.

func SplitTokens(text string) []string {
	out := []string{}
	r := []rune(text)
	n, i := len(r), 0
	for i < n {
		for i < n && unicode.IsSpace(r[i]) {
			i++
		}
		if i >= n {
			break
		}
		c := r[i]
		if c == '"' || c == '\'' {
			close := closingQuote(r, i, c)
			if close < 0 {
				out = append(out, string(r[i+1:]))
				break
			}
			out = append(out, string(r[i+1:close]))
			i = close + 1
		} else {
			j := i
			for j < n && !unicode.IsSpace(r[j]) {
				j++
			}
			out = append(out, string(r[i:j]))
			i = j
		}
	}
	return out
}

// The closing quote is the next one of the same kind followed by whitespace or
// the end of the text, which is what lets a nested Entity, itself single
// quoted, sit inside a single quoted value.
func closingQuote(r []rune, open int, quote rune) int {
	for j := open + 1; j < len(r); j++ {
		if r[j] != quote {
			continue
		}
		if j+1 == len(r) || unicode.IsSpace(r[j+1]) {
			return j
		}
	}
	return -1
}

func Token(value string) string {
	if value == "" {
		return "\"\""
	}
	if strings.ContainsFunc(value, unicode.IsSpace) {
		return "\"" + value + "\""
	}
	return value
}

func Nested(text string) string {
	return "'" + text + "'"
}

func RequireTokens(text string, expected int, typeName string) []string {
	parts := SplitTokens(text)
	if len(parts) != expected {
		panic(fmt.Sprintf("%s takes %d values but got %d: %s",
			typeName, expected, len(parts), text))
	}
	return parts
}
