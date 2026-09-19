import XCTest

final class APITests: XCTestCase {

    func testRetrieveASinglePost() {
        let glue = APIGlue()
        glue.givenBasePageIs([
            ["https://jsonplaceholder.typicode.com"],
        ])
        glue.whenSendingRequest([
            ApiRequestString(fromArray: ["GET", "posts", "1", ""]),
        ])
        glue.thenResponseStatusIs([
            ApiStatusString(fromArray: ["200"]),
        ])
        glue.thenResponseBodyIs([
            PostString(fromArray: ["1", "1", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"]),
        ])
    }

    func testRetrieveAllPosts() {
        let glue = APIGlue()
        glue.givenBasePageIs([
            ["https://jsonplaceholder.typicode.com"],
        ])
        glue.whenSendingRequest([
            ApiRequestString(fromArray: ["GET", "posts", "", ""]),
        ])
        glue.thenResponseStatusIs([
            ApiStatusString(fromArray: ["200"]),
        ])
        glue.thenResponseArrayContainsThisManyItems([
            ["100"],
        ])
    }

    func testCreateANewPost() {
        let glue = APIGlue()
        glue.givenBasePageIs([
            ["https://jsonplaceholder.typicode.com"],
        ])
        glue.givenNewPostData([
            NewPostString(fromArray: ["AlignThree Demo", "Testing POST", "7"]),
        ])
        glue.whenSendingRequest([
            ApiRequestString(fromArray: ["POST", "posts", "", "NewPost"]),
        ])
        glue.thenResponseStatusIs([
            ApiStatusString(fromArray: ["201"]),
        ])
        glue.thenResponseBodyIs([
            PostString(fromArray: ["7", "101", "AlignThree Demo", "Testing POST"]),
        ])
    }

    func testReplaceAnExistingPost() {
        let glue = APIGlue()
        glue.givenBasePageIs([
            ["https://jsonplaceholder.typicode.com"],
        ])
        glue.givenReplacementData([
            ReplacePostString(fromArray: ["1", "1", "Replaced Title", "Replaced Body"]),
        ])
        glue.whenSendingRequest([
            ApiRequestString(fromArray: ["PUT", "posts", "1", "ReplacePost"]),
        ])
        glue.thenResponseStatusIs([
            ApiStatusString(fromArray: ["200"]),
        ])
        glue.thenResponseBodyIs([
            PostString(fromArray: ["1", "1", "Replaced Title", "Replaced Body"]),
        ])
    }

    func testUpdateAPostTitle() {
        let glue = APIGlue()
        glue.givenBasePageIs([
            ["https://jsonplaceholder.typicode.com"],
        ])
        glue.givenPatchData([
            PatchTitleString(fromArray: ["Patched Title"]),
        ])
        glue.whenSendingRequest([
            ApiRequestString(fromArray: ["PATCH", "posts", "1", "PatchTitle"]),
        ])
        glue.thenResponseStatusIs([
            ApiStatusString(fromArray: ["200"]),
        ])
        glue.thenResponseBodyIs([
            PostString(fromArray: ["1", "1", "Patched Title", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"]),
        ])
    }

    func testDeleteAPost() {
        let glue = APIGlue()
        glue.givenBasePageIs([
            ["https://jsonplaceholder.typicode.com"],
        ])
        glue.whenSendingRequest([
            ApiRequestString(fromArray: ["DELETE", "posts", "1", ""]),
        ])
        glue.thenResponseStatusIs([
            ApiStatusString(fromArray: ["200"]),
        ])
    }

}
