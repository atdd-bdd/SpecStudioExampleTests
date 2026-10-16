package common

// DollarTyped is Dollar converted: the text, which the glue
// converts to the production value.
//
// Go's constructor for a DataType returns (T, error) when the type can refuse
// a value and plain T when it cannot -- NewDollar against NewInstrument -- and
// the generator cannot know which, so there is no call it could write here.
// That rule is the project's own in any case, and a specification may state a
// value the rule refuses, so reading it belongs in the glue rather than on a
// line of a test body.
type DollarTyped struct {
	Text string
}

func NewDollarTyped(text string) DollarTyped { return DollarTyped{Text: text} }

func NewDollarTypedFromString(s DollarString) DollarTyped {
	return DollarTyped{Text: string(s)}
}

// HasValue is false for an empty cell and for the Do-Not-Care marker, neither
// of which states a value.
func (t DollarTyped) HasValue() bool {
	return t.Text != "" && t.Text != DNCString
}

// Get hands the glue the text to convert.
func (t DollarTyped) Get() string { return t.Text }

// ToDollarString converts back to the string form a table compares.
func (t DollarTyped) ToDollarString() DollarString {
	return DollarString(t.Text)
}

func (t DollarTyped) String() string { return t.Text }

// Equals treats the Do-Not-Care marker on either side as a match, the same
// rule the String structs follow.
func (t DollarTyped) Equals(o DollarTyped) bool {
	return DNCEqual(t.Text, o.Text)
}

func DollarTypedToStringList(list []DollarTyped) []DollarString {
	result := make([]DollarString, 0, len(list))
	for _, t := range list { result = append(result, t.ToDollarString()) }
	return result
}

func DollarTypedFromStringList(list []DollarString) []DollarTyped {
	result := make([]DollarTyped, 0, len(list))
	for _, s := range list { result = append(result, NewDollarTypedFromString(s)) }
	return result
}
