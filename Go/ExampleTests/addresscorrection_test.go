package exampletests

import (
	"testing"
	"exampletests/common"
)

func TestAddressCorrection_Scenario_StandardizeAnAddressThatIsAlreadyComplete(t *testing.T) {
	glue := NewAddressCorrectionGlue()
	stringListList1 := [][]string{
		{"https://geocoding.geo.census.gov"},
	}
	glue.GivenBasePageIs(t, stringListList1)
	objectList2 := []common.RequestString{
		common.NewRequestStringFromSlice([]string{"GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave nw, washington, dc", "Public_AR_Current", "json"}),
	}
	glue.WhenSendingRequest(t, objectList2)
	objectList3 := []common.StatusString{
		common.NewStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList3)
	objectList4 := []common.MatchString{
		common.MatchString{MatchedAddress: "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", AddressComponents: common.AddressComponentsString{Zip: "20500", StreetName: "PENNSYLVANIA", City: "WASHINGTON", PreDirection: "", SuffixDirection: "NW", State: "DC", SuffixType: "AVE"}},
	}
	glue.ThenTheMatchedAddressesAre(t, objectList4)
}

func TestAddressCorrection_Scenario_CorrectASpelledOutOrdinal(t *testing.T) {
	glue := NewAddressCorrectionGlue()
	stringListList5 := [][]string{
		{"https://geocoding.geo.census.gov"},
	}
	glue.GivenBasePageIs(t, stringListList5)
	objectList6 := []common.RequestString{
		common.NewRequestStringFromSlice([]string{"GET", "geocoder/locations/onelineaddress", "350 fifth ave, new york, ny", "Public_AR_Current", "json"}),
	}
	glue.WhenSendingRequest(t, objectList6)
	objectList7 := []common.StatusString{
		common.NewStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList7)
	objectList8 := []common.MatchString{
		common.MatchString{MatchedAddress: "350 5TH AVE, NEW YORK, NY, 10118", AddressComponents: common.AddressComponentsString{Zip: "?DNC?", StreetName: "?DNC?", City: "?DNC?", PreDirection: "?DNC?", SuffixDirection: "?DNC?", State: "?DNC?", SuffixType: "?DNC?"}},
	}
	glue.ThenTheMatchedAddressesAre(t, objectList8)
}

func TestAddressCorrection_Scenario_ReturnEveryCandidateForAnAmbiguousAddress(t *testing.T) {
	glue := NewAddressCorrectionGlue()
	stringListList9 := [][]string{
		{"https://geocoding.geo.census.gov"},
	}
	glue.GivenBasePageIs(t, stringListList9)
	objectList10 := []common.RequestString{
		common.NewRequestStringFromSlice([]string{"GET", "geocoder/locations/onelineaddress", "1600 pennsylvania ave, washington, dc", "Public_AR_Current", "json"}),
	}
	glue.WhenSendingRequest(t, objectList10)
	objectList11 := []common.StatusString{
		common.NewStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList11)
	objectList12 := []common.MatchString{
		common.MatchString{MatchedAddress: "1600 PENNSYLVANIA AVE SE, WASHINGTON, DC, 20003", AddressComponents: common.AddressComponentsString{Zip: "?DNC?", StreetName: "?DNC?", City: "?DNC?", PreDirection: "?DNC?", SuffixDirection: "?DNC?", State: "?DNC?", SuffixType: "?DNC?"}},
		common.MatchString{MatchedAddress: "1600 PENNSYLVANIA AVE NW, WASHINGTON, DC, 20500", AddressComponents: common.AddressComponentsString{Zip: "?DNC?", StreetName: "?DNC?", City: "?DNC?", PreDirection: "?DNC?", SuffixDirection: "?DNC?", State: "?DNC?", SuffixType: "?DNC?"}},
	}
	glue.ThenTheMatchedAddressesAre(t, objectList12)
}

func TestAddressCorrection_Scenario_ReportAnAddressThatCannotBeCorrected(t *testing.T) {
	glue := NewAddressCorrectionGlue()
	stringListList13 := [][]string{
		{"https://geocoding.geo.census.gov"},
	}
	glue.GivenBasePageIs(t, stringListList13)
	objectList14 := []common.RequestString{
		common.NewRequestStringFromSlice([]string{"GET", "geocoder/locations/onelineaddress", "99999 nonexistent rd, nowhere, zz 00000", "Public_AR_Current", "json"}),
	}
	glue.WhenSendingRequest(t, objectList14)
	objectList15 := []common.StatusString{
		common.NewStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList15)
	glue.ThenThereAreNoMatchedAddresses(t)
}

