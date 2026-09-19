package exampletests

import (
	"strconv"
	"strings"
	"testing"
	"exampletests/common"
)

// APIGlue exercises a live REST API over HTTP.
//
// There are no production classes behind this one: the API itself is the thing
// under test. RestCall does the transport, so what is left here is only the
// three things glue should do -- turn a table into JSON with the generated
// ToJSON(), turn the response JSON back into a table with the generated
// FromJSONValue(), and compare.
//
// The status and the body are separate steps because they come from separate
// places. Keeping them apart is what lets the body go straight through the
// generated reader: while a status was mixed into the body's attribute set, the
// reader demanded a "status" field no API response ever contains.
type APIGlue struct {
	basePage string

	// Bodies offered by Given steps, keyed by the attribute set that carried them.
	bodies map[string]string

	call *RestCall
}

func NewAPIGlue() *APIGlue {
	return &APIGlue{bodies: map[string]string{}}
}

// ---- given -----------------------------------------------------------------

func (g *APIGlue) GivenBasePageIs(t *testing.T, values [][]string) {
	for _, row := range values {
		for _, cell := range row {
			if strings.TrimSpace(cell) != "" {
				g.basePage = strings.TrimSpace(cell)
			}
		}
	}
	if g.basePage == "" {
		t.Fatal("no base Page given")
	}
}

func (g *APIGlue) GivenNewPostData(t *testing.T, values []common.NewPostString) {
	for _, value := range values {
		body, err := common.NewNewPostTypedFromString(value).ToJSON()
		if err != nil {
			t.Fatal(err)
		}
		g.bodies["NewPost"] = body
	}
}

func (g *APIGlue) GivenReplacementData(t *testing.T, values []common.ReplacePostString) {
	for _, value := range values {
		body, err := common.NewReplacePostTypedFromString(value).ToJSON()
		if err != nil {
			t.Fatal(err)
		}
		g.bodies["ReplacePost"] = body
	}
}

func (g *APIGlue) GivenPatchData(t *testing.T, values []common.PatchTitleString) {
	for _, value := range values {
		body, err := common.NewPatchTitleTypedFromString(value).ToJSON()
		if err != nil {
			t.Fatal(err)
		}
		g.bodies["PatchTitle"] = body
	}
}

// ---- when ------------------------------------------------------------------

func (g *APIGlue) WhenSendingRequest(t *testing.T, values []common.ApiRequestString) {
	for _, value := range values {
		request := common.NewApiRequestTypedFromString(value)

		// Body names an attribute set a Given step already turned into JSON.
		bodyName := strings.TrimSpace(request.Body)
		payload := ""
		if bodyName != "" {
			held, ok := g.bodies[bodyName]
			if !ok {
				t.Fatalf("no Given step supplied a body named %s", bodyName)
			}
			payload = held
		}

		call, err := SendRestCall(request.Method, g.basePage,
			request.Page, request.Parameter, payload)
		if err != nil {
			t.Fatal(err)
		}
		g.call = call
	}
}

// ---- then ------------------------------------------------------------------

func (g *APIGlue) ThenResponseStatusIs(t *testing.T, values []common.ApiStatusString) {
	g.requireCall(t)

	for _, expected := range values {
		if want := common.NewApiStatusTypedFromString(expected).Code; want != g.call.Status {
			t.Errorf("HTTP status from %s: expected %d but was %d",
				g.call.URL, want, g.call.Status)
		}
	}
}

func (g *APIGlue) ThenResponseBodyIs(t *testing.T, values []common.PostString) {
	g.requireCall(t)

	actual, err := common.NewPostTypedFromJSON(g.call.Body)
	if err != nil {
		t.Fatal(err)
	}

	for _, expected := range values {
		comparePost(t, "", expected, actual)
	}
}

func (g *APIGlue) ThenResponseArrayContainsThisManyItems(t *testing.T, values [][]string) {
	g.requireCall(t)

	expected, err := strconv.Atoi(strings.TrimSpace(values[0][0]))
	if err != nil {
		t.Fatalf("not a count: %s", values[0][0])
	}
	items, err := common.PostTypedFromJSONList(g.call.Body)
	if err != nil {
		t.Fatal(err)
	}
	if len(items) != expected {
		t.Errorf("number of items returned by %s: expected %d but was %d",
			g.call.URL, expected, len(items))
	}
}

// ---- helpers ---------------------------------------------------------------

func (g *APIGlue) requireCall(t *testing.T) {
	if g.call == nil {
		t.Fatal("no request was sent")
	}
}

// ---- the one comparison ----------------------------------------------------

// comparePost checks one expected row against one returned post.
//
// A table that states every column is compared typed, so that the values are
// checked as the types the specification declares and not merely as matching
// text. A CompareOnly table cannot be: its unstated columns hold ?DNC?, which
// has no typed meaning, and only the String struct knows to skip it. So that
// case compares the string form of both sides instead.
func comparePost(t *testing.T, where string, expected common.PostString, actual common.PostTyped) {
	if statesEveryColumn(expected) {
		if want := common.NewPostTypedFromString(expected); want != actual {
			t.Errorf("%spost: expected %+v but was %+v", where, want, actual)
		}
		return
	}
	if got := actual.ToPostString(); !expected.Equals(got) {
		t.Errorf("%spost: expected %+v but was %+v", where, expected, got)
	}
}

// statesEveryColumn is false when any column was left to CompareOnly, and so
// holds ?DNC?.
func statesEveryColumn(row common.PostString) bool {
	return row.UserId != dncString && row.Id != dncString &&
		row.Title != dncString && row.Body != dncString
}
