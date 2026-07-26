package common

import "strings"

// Unused suppresses "imported and not used" errors during development.
var Unused = struct{}{}

// DNCString is the Do-Not-Care marker a CompareOnly step puts in
// every column it does not name.
const DNCString = "?DNC?"

// DNCEqual compares two cells, treating the marker as a wildcard.
func DNCEqual(a, b string) bool {
	return a == b || a == DNCString || b == DNCString
}

// ParseBoolCell reads the Yes/No/True/False text a spec cell may
// hold, in any casing.
func ParseBoolCell(v string) bool {
	switch strings.ToLower(strings.TrimSpace(v)) {
	case "true", "t", "yes", "y", "1":
		return true
	}
	return false
}
