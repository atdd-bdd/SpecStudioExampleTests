package common

// ScoreTyped is Score converted: the text, which the glue
// converts to the production value.
//
// Go's constructor for a DataType returns (T, error) when the type can refuse
// a value and plain T when it cannot -- NewDollar against NewInstrument -- and
// the generator cannot know which, so there is no call it could write here.
// That rule is the project's own in any case, and a specification may state a
// value the rule refuses, so reading it belongs in the glue rather than on a
// line of a test body.
type ScoreTyped struct {
	Text string
}

func NewScoreTyped(text string) ScoreTyped { return ScoreTyped{Text: text} }

func NewScoreTypedFromString(s ScoreString) ScoreTyped {
	return ScoreTyped{Text: string(s)}
}

// HasValue is false for an empty cell and for the Do-Not-Care marker, neither
// of which states a value.
func (t ScoreTyped) HasValue() bool {
	return t.Text != "" && t.Text != DNCString
}

// Get hands the glue the text to convert.
func (t ScoreTyped) Get() string { return t.Text }

// ToScoreString converts back to the string form a table compares.
func (t ScoreTyped) ToScoreString() ScoreString {
	return ScoreString(t.Text)
}

func (t ScoreTyped) String() string { return t.Text }

// Equals treats the Do-Not-Care marker on either side as a match, the same
// rule the String structs follow.
func (t ScoreTyped) Equals(o ScoreTyped) bool {
	return DNCEqual(t.Text, o.Text)
}

func ScoreTypedToStringList(list []ScoreTyped) []ScoreString {
	result := make([]ScoreString, 0, len(list))
	for _, t := range list { result = append(result, t.ToScoreString()) }
	return result
}

func ScoreTypedFromStringList(list []ScoreString) []ScoreTyped {
	result := make([]ScoreTyped, 0, len(list))
	for _, s := range list { result = append(result, NewScoreTypedFromString(s)) }
	return result
}
