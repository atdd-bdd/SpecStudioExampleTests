package common

// PinsTyped is Pins converted: the text, which the glue
// converts to the production value.
//
// Go's constructor for a DataType returns (T, error) when the type can refuse
// a value and plain T when it cannot -- NewDollar against NewInstrument -- and
// the generator cannot know which, so there is no call it could write here.
// That rule is the project's own in any case, and a specification may state a
// value the rule refuses, so reading it belongs in the glue rather than on a
// line of a test body.
type PinsTyped struct {
	Text string
}

func NewPinsTyped(text string) PinsTyped { return PinsTyped{Text: text} }

func NewPinsTypedFromString(s PinsString) PinsTyped {
	return PinsTyped{Text: string(s)}
}

// HasValue is false for an empty cell and for the Do-Not-Care marker, neither
// of which states a value.
func (t PinsTyped) HasValue() bool {
	return t.Text != "" && t.Text != DNCString
}

// Get hands the glue the text to convert.
func (t PinsTyped) Get() string { return t.Text }

// ToPinsString converts back to the string form a table compares.
func (t PinsTyped) ToPinsString() PinsString {
	return PinsString(t.Text)
}

func (t PinsTyped) String() string { return t.Text }

// Equals treats the Do-Not-Care marker on either side as a match, the same
// rule the String structs follow.
func (t PinsTyped) Equals(o PinsTyped) bool {
	return DNCEqual(t.Text, o.Text)
}

func PinsTypedToStringList(list []PinsTyped) []PinsString {
	result := make([]PinsString, 0, len(list))
	for _, t := range list { result = append(result, t.ToPinsString()) }
	return result
}

func PinsTypedFromStringList(list []PinsString) []PinsTyped {
	result := make([]PinsTyped, 0, len(list))
	for _, s := range list { result = append(result, NewPinsTypedFromString(s)) }
	return result
}
