package production

type Match struct {
	MatchedAddress string
	AddressComponents AddressComponents
}

func NewMatch(matchedaddress string, addresscomponents AddressComponents) *Match {
	return &Match{MatchedAddress: matchedaddress, AddressComponents: addresscomponents}
}
