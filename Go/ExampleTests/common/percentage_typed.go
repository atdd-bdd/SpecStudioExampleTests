package common

// PercentageTyped is Percentage converted: the text, which the glue
// converts to the production value.
//
// Go's constructor for a DataType returns (T, error) when the type can refuse
// a value and plain T when it cannot -- NewDollar against NewInstrument -- and
// the generator cannot know which, so there is no call it could write here.
// That rule is the project's own in any case, and a specification may state a
// value the rule refuses, so reading it belongs in the glue rather than on a
// line of a test body.
type PercentageTyped struct {
	Text string
}

func NewPercentageTyped(text string) PercentageTyped { return PercentageTyped{Text: text} }

func NewPercentageTypedFromString(s PercentageString) PercentageTyped {
	return PercentageTyped{Text: string(s)}
}

// HasValue is false for an empty cell and for the Do-Not-Care marker, neither
// of which states a value.
func (t PercentageTyped) HasValue() bool {
	return t.Text != "" && t.Text != DNCString
}

// Get hands the glue the text to convert.
func (t PercentageTyped) Get() string { return t.Text }

// ToPercentageString converts back to the string form a table compares.
func (t PercentageTyped) ToPercentageString() PercentageString {
	return PercentageString(t.Text)
}

func (t PercentageTyped) String() string { return t.Text }

// Equals treats the Do-Not-Care marker on either side as a match, the same
// rule the String structs follow.
func (t PercentageTyped) Equals(o PercentageTyped) bool {
	return DNCEqual(t.Text, o.Text)
}

func PercentageTypedToStringList(list []PercentageTyped) []PercentageString {
	result := make([]PercentageString, 0, len(list))
	for _, t := range list { result = append(result, t.ToPercentageString()) }
	return result
}

func PercentageTypedFromStringList(list []PercentageString) []PercentageTyped {
	result := make([]PercentageTyped, 0, len(list))
	for _, s := range list { result = append(result, NewPercentageTypedFromString(s)) }
	return result
}
