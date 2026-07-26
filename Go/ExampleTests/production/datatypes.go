package production

// The DataTypes the specifications declare, each refusing text that does not
// satisfy its rule so the glue can state whether a value was meant to be valid.

import (
	"fmt"
	"strconv"
	"strings"
)

// ---------------------------------------------------------------------------
// Dollar — a monetary amount: never negative, never finer than a cent.
// Held as whole cents so the arithmetic is exact.
// ---------------------------------------------------------------------------

type Dollar struct {
	cents int64
}

func ParseDollar(value string) (Dollar, error) {
	text := strings.TrimSpace(strings.ReplaceAll(value, "$", ""))
	if text == "" {
		return Dollar{}, nil
	}
	negative := strings.HasPrefix(text, "-")
	digits := strings.TrimLeft(text, "+-")

	whole, frac, _ := strings.Cut(digits, ".")
	if whole == "" && frac == "" {
		return Dollar{}, fmt.Errorf("not a number: %s", value)
	}
	if !allDigits(whole) || !allDigits(frac) {
		return Dollar{}, fmt.Errorf("not a number: %s", value)
	}
	if len(frac) > 2 {
		return Dollar{}, fmt.Errorf(
			"dollar amount must not have more than two decimal digits: %s", value)
	}

	var wv int64
	if whole != "" {
		var err error
		if wv, err = strconv.ParseInt(whole, 10, 64); err != nil {
			return Dollar{}, err
		}
	}
	fv := int64(0)
	switch len(frac) {
	case 1:
		v, _ := strconv.ParseInt(frac, 10, 64)
		fv = v * 10
	case 2:
		v, _ := strconv.ParseInt(frac, 10, 64)
		fv = v
	}
	cents := wv*100 + fv
	if negative && cents != 0 {
		return Dollar{}, fmt.Errorf("dollar amount cannot be negative: %s", value)
	}
	return Dollar{cents: cents}, nil
}

func allDigits(s string) bool {
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

func DollarFromCents(cents int64) Dollar { return Dollar{cents: cents} }
func (d Dollar) Cents() int64            { return d.cents }

func (d Dollar) Plus(o Dollar) Dollar     { return Dollar{cents: d.cents + o.cents} }
func (d Dollar) Minus(o Dollar) Dollar    { return Dollar{cents: d.cents - o.cents} }
func (d Dollar) Times(factor int) Dollar  { return Dollar{cents: d.cents * int64(factor)} }

// PercentOf is the given percentage of this amount, rounded half up to a cent.
func (d Dollar) PercentOf(p Percentage) Dollar {
	return Dollar{cents: (d.cents*int64(p.Value()) + 50) / 100}
}

func (d Dollar) String() string {
	sign := ""
	c := d.cents
	if c < 0 {
		sign, c = "-", -c
	}
	return fmt.Sprintf("%s%d.%02d", sign, c/100, c%100)
}

// ---------------------------------------------------------------------------
// Percentage — 0 to 100 inclusive.
// ---------------------------------------------------------------------------

type Percentage struct {
	value int
}

func ParsePercentage(value string) (Percentage, error) {
	text := strings.TrimSpace(strings.ReplaceAll(value, "%", ""))
	n, err := strconv.Atoi(text)
	if err != nil {
		return Percentage{}, fmt.Errorf("not a number: %s", value)
	}
	if n < 0 || n > 100 {
		return Percentage{}, fmt.Errorf("percentage must be between 0 and 100: %s", value)
	}
	return Percentage{value: n}, nil
}

func NewPercentage(v int) Percentage { return Percentage{value: v} }
func (p Percentage) Value() int      { return p.value }
func (p Percentage) String() string  { return strconv.Itoa(p.value) }

// ---------------------------------------------------------------------------
// SimpleText — alphabetic, numeric, space, hyphen, period, comma.
// ---------------------------------------------------------------------------

type SimpleText struct {
	Value string
}

func ParseSimpleText(value string) (SimpleText, error) {
	for _, c := range value {
		ok := (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ||
			(c >= '0' && c <= '9') || c == ' ' || c == ',' || c == '.' || c == '-'
		if !ok {
			return SimpleText{}, fmt.Errorf("invalid SimpleText: %s", value)
		}
	}
	return SimpleText{Value: value}, nil
}

func NewSimpleText(v string) SimpleText { return SimpleText{Value: v} }
func (s SimpleText) String() string     { return s.Value }

// ---------------------------------------------------------------------------
// IDForm — exactly five characters, beginning with Q.
// ---------------------------------------------------------------------------

type IDForm struct {
	Value string
}

func ParseIDForm(value string) (IDForm, error) {
	if len([]rune(value)) != 5 || !strings.HasPrefix(value, "Q") {
		return IDForm{}, fmt.Errorf("must be 5 characters starting with Q")
	}
	return IDForm{Value: value}, nil
}

func (i IDForm) String() string { return i.Value }
