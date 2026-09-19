package exampletests

import (
	"testing"
	"exampletests/common"
)

func TestAPI_Scenario_RetrieveASinglePost(t *testing.T) {
	glue := NewAPIGlue()
	stringListList1 := [][]string{
		{"https://jsonplaceholder.typicode.com"},
	}
	glue.GivenBasePageIs(t, stringListList1)
	objectList2 := []common.ApiRequestString{
		common.NewApiRequestStringFromSlice([]string{"GET", "posts", "1", ""}),
	}
	glue.WhenSendingRequest(t, objectList2)
	objectList3 := []common.ApiStatusString{
		common.NewApiStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList3)
	objectList4 := []common.PostString{
		common.NewPostStringFromSlice([]string{"1", "1", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"}),
	}
	glue.ThenResponseBodyIs(t, objectList4)
}

func TestAPI_Scenario_RetrieveAllPosts(t *testing.T) {
	glue := NewAPIGlue()
	stringListList5 := [][]string{
		{"https://jsonplaceholder.typicode.com"},
	}
	glue.GivenBasePageIs(t, stringListList5)
	objectList6 := []common.ApiRequestString{
		common.NewApiRequestStringFromSlice([]string{"GET", "posts", "", ""}),
	}
	glue.WhenSendingRequest(t, objectList6)
	objectList7 := []common.ApiStatusString{
		common.NewApiStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList7)
	stringListList8 := [][]string{
		{"100"},
	}
	glue.ThenResponseArrayContainsThisManyItems(t, stringListList8)
}

func TestAPI_Scenario_CreateANewPost(t *testing.T) {
	glue := NewAPIGlue()
	stringListList9 := [][]string{
		{"https://jsonplaceholder.typicode.com"},
	}
	glue.GivenBasePageIs(t, stringListList9)
	objectList10 := []common.NewPostString{
		common.NewNewPostStringFromSlice([]string{"AlignThree Demo", "Testing POST", "7"}),
	}
	glue.GivenNewPostData(t, objectList10)
	objectList11 := []common.ApiRequestString{
		common.NewApiRequestStringFromSlice([]string{"POST", "posts", "", "NewPost"}),
	}
	glue.WhenSendingRequest(t, objectList11)
	objectList12 := []common.ApiStatusString{
		common.NewApiStatusStringFromSlice([]string{"201"}),
	}
	glue.ThenResponseStatusIs(t, objectList12)
	objectList13 := []common.PostString{
		common.NewPostStringFromSlice([]string{"7", "101", "AlignThree Demo", "Testing POST"}),
	}
	glue.ThenResponseBodyIs(t, objectList13)
}

func TestAPI_Scenario_ReplaceAnExistingPost(t *testing.T) {
	glue := NewAPIGlue()
	stringListList14 := [][]string{
		{"https://jsonplaceholder.typicode.com"},
	}
	glue.GivenBasePageIs(t, stringListList14)
	objectList15 := []common.ReplacePostString{
		common.NewReplacePostStringFromSlice([]string{"1", "1", "Replaced Title", "Replaced Body"}),
	}
	glue.GivenReplacementData(t, objectList15)
	objectList16 := []common.ApiRequestString{
		common.NewApiRequestStringFromSlice([]string{"PUT", "posts", "1", "ReplacePost"}),
	}
	glue.WhenSendingRequest(t, objectList16)
	objectList17 := []common.ApiStatusString{
		common.NewApiStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList17)
	objectList18 := []common.PostString{
		common.NewPostStringFromSlice([]string{"1", "1", "Replaced Title", "Replaced Body"}),
	}
	glue.ThenResponseBodyIs(t, objectList18)
}

func TestAPI_Scenario_UpdateAPostTitle(t *testing.T) {
	glue := NewAPIGlue()
	stringListList19 := [][]string{
		{"https://jsonplaceholder.typicode.com"},
	}
	glue.GivenBasePageIs(t, stringListList19)
	objectList20 := []common.PatchTitleString{
		common.NewPatchTitleStringFromSlice([]string{"Patched Title"}),
	}
	glue.GivenPatchData(t, objectList20)
	objectList21 := []common.ApiRequestString{
		common.NewApiRequestStringFromSlice([]string{"PATCH", "posts", "1", "PatchTitle"}),
	}
	glue.WhenSendingRequest(t, objectList21)
	objectList22 := []common.ApiStatusString{
		common.NewApiStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList22)
	objectList23 := []common.PostString{
		common.NewPostStringFromSlice([]string{"1", "1", "Patched Title", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"}),
	}
	glue.ThenResponseBodyIs(t, objectList23)
}

func TestAPI_Scenario_DeleteAPost(t *testing.T) {
	glue := NewAPIGlue()
	stringListList24 := [][]string{
		{"https://jsonplaceholder.typicode.com"},
	}
	glue.GivenBasePageIs(t, stringListList24)
	objectList25 := []common.ApiRequestString{
		common.NewApiRequestStringFromSlice([]string{"DELETE", "posts", "1", ""}),
	}
	glue.WhenSendingRequest(t, objectList25)
	objectList26 := []common.ApiStatusString{
		common.NewApiStatusStringFromSlice([]string{"200"}),
	}
	glue.ThenResponseStatusIs(t, objectList26)
}

