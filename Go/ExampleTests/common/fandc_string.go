package common

import "fmt"

type FandCString struct {
	F string
	C string
	Notes string
}

func NewFandCStringFromSlice(v []string) FandCString {
	s := FandCString{}
	if len(v) > 0 { s.F = v[0] }
	if len(v) > 1 { s.C = v[1] }
	if len(v) > 2 { s.Notes = v[2] }
	return s
}

func (s FandCString) String() string {
	return fmt.Sprintf("F=%s, C=%s, Notes=%s", s.F, s.C, s.Notes)
}

func (s FandCString) Equals(o FandCString) bool {
	return DNCEqual(s.F, o.F) &&
		DNCEqual(s.C, o.C) &&
		DNCEqual(s.Notes, o.Notes)
}

func EqualFandCStringSlices(a, b []FandCString) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if !a[i].Equals(b[i]) { return false }
	}
	return true
}
