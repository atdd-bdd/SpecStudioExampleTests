package exampletests

import (
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// RestCall is the transport for a specification that tests a live service.
//
// It lives beside the glue rather than in common/, which every build rewrites.
// It knows nothing about addresses: give it the pieces of a call and it returns
// the status and the body. Deciding what the answer should be is the
// specification's job, and comparing is the glue's.
//
// A call that cannot be made at all returns an error naming the URL. That is a
// broken test rather than a failed assertion, and the two should not look alike
// in the output.
type RestCall struct {
	Status int
	Body   string
	URL    string
}

var restClient = &http.Client{Timeout: 30 * time.Second}

// SendRestCall sends one request and returns the result.
//
// A parameter beginning with '?' is a query string and is appended as it
// stands; anything else is a path segment and is joined with a slash. So
// posts/1 is page "posts" with parameter "1", and a search is page "search"
// with parameter "?q=hat".
func SendRestCall(method, baseURL, page, parameter, request string) (*RestCall, error) {
	url := buildURL(baseURL, page, parameter)
	verb := strings.ToUpper(strings.TrimSpace(method))

	var payload io.Reader
	if strings.TrimSpace(request) != "" {
		payload = strings.NewReader(request)
	}

	httpRequest, err := http.NewRequest(verb, url, payload)
	if err != nil {
		return nil, fmt.Errorf("could not call %s -- %w", url, err)
	}
	httpRequest.Header.Set("Accept", "application/json")
	httpRequest.Header.Set("Content-Type", "application/json; charset=UTF-8")

	response, err := restClient.Do(httpRequest)
	if err != nil {
		return nil, fmt.Errorf("could not call %s -- %w", url, err)
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("could not read the body of %s -- %w", url, err)
	}
	return &RestCall{Status: response.StatusCode, Body: string(body), URL: url}, nil
}

// buildURL joins the pieces with exactly one slash, dropping any that are empty.
func buildURL(baseURL, page, parameter string) string {
	url := strings.Trim(strings.TrimSpace(baseURL), "/")

	cleanPage := strings.Trim(strings.TrimSpace(page), "/")
	if cleanPage != "" {
		url += "/" + cleanPage
	}

	if parameter != "" {
		if strings.HasPrefix(parameter, "?") {
			url += parameter
		} else {
			url += "/" + strings.Trim(strings.TrimSpace(parameter), "/")
		}
	}
	return url
}
