package common

// SimpleTextTyped is SimpleText converted: the text, which the glue
// converts to the production value.
//
// Go's constructor for a DataType returns (T, error) when the type can refuse
// a value and plain T when it cannot -- NewDollar against NewInstrument -- and
// the generator cannot know which, so there is no call it could write here.
// That rule is the project's own in any case, and a specification may state a
// value the rule refuses, so reading it belongs in the glue rather than on a
// line of a test body.
type SimpleTextTyped struct {
	Text string
}

func NewSimpleTextTyped(text string) SimpleTextTyped { return SimpleTextTyped{Text: text} }

func NewSimpleTextTypedFromString(s SimpleTextString) SimpleTextTyped {
	return SimpleTextTyped{Text: string(s)}
}

// HasValue is false for an empty cell and for the Do-Not-Care marker, neither
// of which states a value.
func (t SimpleTextTyped) HasValue() bool {
	return t.Text != "" && t.Text != DNCString
}

// Get hands the glue the text to convert.
func (t SimpleTextTyped) Get() string { return t.Text }

// ToSimpleTextString converts back to the string form a table compares.
func (t SimpleTextTyped) ToSimpleTextString() SimpleTextString {
	return SimpleTextString(t.Text)
}

func (t SimpleTextTyped) String() string { return t.Text }

// Equals treats the Do-Not-Care marker on either side as a match, the same
// rule the String structs follow.
func (t SimpleTextTyped) Equals(o SimpleTextTyped) bool {
	return DNCEqual(t.Text, o.Text)
}

func SimpleTextTypedToStringList(list []SimpleTextTyped) []SimpleTextString {
	result := make([]SimpleTextString, 0, len(list))
	for _, t := range list { result = append(result, t.ToSimpleTextString()) }
	return result
}

func SimpleTextTypedFromStringList(list []SimpleTextString) []SimpleTextTyped {
	result := make([]SimpleTextTyped, 0, len(list))
	for _, s := range list { result = append(result, NewSimpleTextTypedFromString(s)) }
	return result
}
