package exampletests

import (
	"net/url"
	"testing"

	"exampletests/common"
)

// AddressCorrectionGlue drives a specification that tests a live service.
//
// There are no production classes: the Census Bureau geocoder is the thing
// under test. So this file does only three things -- build the call, hand the
// reply to the generated FromJSON, and compare. It never touches the JSON
// itself.
//
// That is possible because the attribute sets in the specification mirror the
// shape of the reply, so NewResponseTypedFromJSON reads all of it. Glue
// navigating a reply is a sign the specification is not describing it honestly.
type AddressCorrectionGlue struct {
	baseURL  string
	response *RestCall
}

func NewAddressCorrectionGlue() *AddressCorrectionGlue { return &AddressCorrectionGlue{} }

func (g *AddressCorrectionGlue) GivenBasePageIs(t *testing.T, values [][]string) {
	g.baseURL = values[0][0]
}

func (g *AddressCorrectionGlue) WhenSendingRequest(t *testing.T, values []common.RequestString) {
	request := values[0]
	call, err := SendRestCall(request.Method, g.baseURL, request.Page, query(request), "")
	if err != nil {
		t.Fatal(err)
	}
	g.response = call
}

func (g *AddressCorrectionGlue) ThenResponseStatusIs(t *testing.T, values []common.StatusString) {
	want := common.NewStatusTypedFromString(values[0]).Code
	if want != g.response.Status {
		t.Errorf("HTTP status from %s: expected %d but was %d",
			g.response.URL, want, g.response.Status)
	}
}

func (g *AddressCorrectionGlue) ThenTheMatchedAddressesAre(t *testing.T, values []common.MatchString) {
	actual := g.matches(t)
	if len(values) != len(actual) {
		t.Fatalf("number of matches\n  expected: %v\n  actual:   %v", values, actual)
	}

	// Compared as a set rather than in order: each expected row must find an
	// actual row it has not already claimed. A test that fails because a service
	// reordered its results is testing the wrong thing.
	//
	// The comparison is on the String form, not the Typed one. Only the String
	// structs skip a field holding ?DNC?, which is what makes a CompareOnly
	// table check its own columns and no others.
	remaining := append([]common.MatchString(nil), actual...)
	for _, expected := range values {
		found := -1
		for i, candidate := range remaining {
			if candidate.Equals(expected) {
				found = i
				break
			}
		}
		if found < 0 {
			t.Fatalf("no returned address matched %v\n  remaining: %v", expected, remaining)
		}
		remaining = append(remaining[:found], remaining[found+1:]...)
	}
}

func (g *AddressCorrectionGlue) ThenThereAreNoMatchedAddresses(t *testing.T) {
	if got := len(g.matches(t)); got != 0 {
		t.Errorf("expected no match for an address that does not exist, got %d", got)
	}
}

// ---- the two translations --------------------------------------------------

// matches is the reply, read by the generated reader, as the rows a table
// compares.
func (g *AddressCorrectionGlue) matches(t *testing.T) []common.MatchString {
	reply, err := common.NewResponseTypedFromJSON(g.response.Body)
	if err != nil {
		t.Fatal(err)
	}
	return common.MatchTypedToStringList(reply.Result.AddressMatches)
}

// query is the query string the geocoder expects, from the fields of the table.
func query(request common.RequestString) string {
	return "?address=" + url.QueryEscape(request.Address) +
		"&benchmark=" + url.QueryEscape(request.Benchmark) +
		"&format=" + url.QueryEscape(request.Format)
}
