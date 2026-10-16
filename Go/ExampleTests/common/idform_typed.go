package common

// IDFormTyped is IDForm converted: the text, which the glue
// converts to the production value.
//
// Go's constructor for a DataType returns (T, error) when the type can refuse
// a value and plain T when it cannot -- NewDollar against NewInstrument -- and
// the generator cannot know which, so there is no call it could write here.
// That rule is the project's own in any case, and a specification may state a
// value the rule refuses, so reading it belongs in the glue rather than on a
// line of a test body.
type IDFormTyped struct {
	Text string
}

func NewIDFormTyped(text string) IDFormTyped { return IDFormTyped{Text: text} }

func NewIDFormTypedFromString(s IDFormString) IDFormTyped {
	return IDFormTyped{Text: string(s)}
}

// HasValue is false for an empty cell and for the Do-Not-Care marker, neither
// of which states a value.
func (t IDFormTyped) HasValue() bool {
	return t.Text != "" && t.Text != DNCString
}

// Get hands the glue the text to convert.
func (t IDFormTyped) Get() string { return t.Text }

// ToIDFormString converts back to the string form a table compares.
func (t IDFormTyped) ToIDFormString() IDFormString {
	return IDFormString(t.Text)
}

func (t IDFormTyped) String() string { return t.Text }

// Equals treats the Do-Not-Care marker on either side as a match, the same
// rule the String structs follow.
func (t IDFormTyped) Equals(o IDFormTyped) bool {
	return DNCEqual(t.Text, o.Text)
}

func IDFormTypedToStringList(list []IDFormTyped) []IDFormString {
	result := make([]IDFormString, 0, len(list))
	for _, t := range list { result = append(result, t.ToIDFormString()) }
	return result
}

func IDFormTypedFromStringList(list []IDFormString) []IDFormTyped {
	result := make([]IDFormTyped, 0, len(list))
	for _, s := range list { result = append(result, NewIDFormTypedFromString(s)) }
	return result
}
