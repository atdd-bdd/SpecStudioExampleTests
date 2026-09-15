package production

type AddressComponents struct {
	Zip string
	StreetName string
	City string
	PreDirection string
	SuffixDirection string
	State string
	SuffixType string
}

func NewAddressComponents(zip string, streetname string, city string, predirection string, suffixdirection string, state string, suffixtype string) *AddressComponents {
	return &AddressComponents{Zip: zip, StreetName: streetname, City: city, PreDirection: predirection, SuffixDirection: suffixdirection, State: state, SuffixType: suffixtype}
}
