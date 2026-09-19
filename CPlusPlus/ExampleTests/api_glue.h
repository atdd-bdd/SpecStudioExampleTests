#pragma once
#include <gtest/gtest.h>
#include <cctype>
#include <iostream>
#include <map>
#include <string>
#include <vector>
#include "common/common.h"
#include "rest_call.h"

// Exercises a live REST API over HTTP.
//
// There are no production classes behind this one: the API itself is the thing
// under test. RestCall does the transport, so what is left here is only the
// three things glue should do -- turn a table into JSON with the generated
// to_json(), turn the response JSON back into a table with the generated
// from_json_value(), and compare.
//
// The status and the body are separate steps because they come from separate
// places. Keeping them apart is what lets the body go straight through the
// generated reader: while a status was mixed into the body's attribute set, the
// reader demanded a "status" field no API response ever contains.
class APIGlue {
public:
    static constexpr const char* DNC_STRING = "?DNC?";

    // ---- given -------------------------------------------------------------

    void given_base_page_is(const std::vector<std::vector<std::string>>& values) {
        for (const std::vector<std::string>& row : values)
            for (const std::string& cell : row)
                if (!trim(cell).empty()) base_page_ = trim(cell);

        EXPECT_FALSE(base_page_.empty()) << "no base Page given";
    }

    void given_new_post_data(const std::vector<NewPostString>& values) {
        for (const NewPostString& value : values)
            bodies_["NewPost"] = NewPostTyped::from_string_struct(value).to_json();
    }

    void given_replacement_data(const std::vector<ReplacePostString>& values) {
        for (const ReplacePostString& value : values)
            bodies_["ReplacePost"] = ReplacePostTyped::from_string_struct(value).to_json();
    }

    void given_patch_data(const std::vector<PatchTitleString>& values) {
        for (const PatchTitleString& value : values)
            bodies_["PatchTitle"] = PatchTitleTyped::from_string_struct(value).to_json();
    }

    // ---- when --------------------------------------------------------------

    void when_sending_request(const std::vector<ApiRequestString>& values) {
        for (const ApiRequestString& value : values) {
            const ApiRequestTyped request = ApiRequestTyped::from_string_struct(value);

            // Body names an attribute set a Given step already turned into JSON.
            const std::string body_name = trim(request.body);
            std::string payload;
            if (!body_name.empty()) {
                const auto held = bodies_.find(body_name);
                ASSERT_NE(held, bodies_.end())
                    << "no Given step supplied a body named " << body_name;
                payload = held->second;
            }

            try {
                call_ = RestCall::send(request.method, base_page_,
                                       request.page, request.parameter, payload);
                sent_ = true;
            } catch (const std::runtime_error& e) {
                FAIL() << e.what();
            }
        }
    }

    // ---- then --------------------------------------------------------------

    void then_response_status_is(const std::vector<ApiStatusString>& values) {
        ASSERT_TRUE(sent_) << "no request was sent";

        for (const ApiStatusString& expected : values)
            check("Code", expected.code, std::to_string(call_.status));
    }

    void then_response_body_is(const std::vector<PostString>& values) {
        ASSERT_TRUE(sent_) << "no request was sent";

        const std::string text = trim(call_.body);
        ASSERT_FALSE(text.empty());
        ASSERT_EQ(text.front(), '{')
            << "response body was not a JSON object: " << abbreviate(call_.body);

        const PostTyped actual = PostTyped::from_json(text);

        for (const PostString& expected : values) {
            check("userId", expected.userid, std::to_string(actual.userid));
            check("id", expected.id, std::to_string(actual.id));
            check("title", expected.title, actual.title);
            check("body", expected.body, actual.body);
        }
    }

    void then_response_array_contains_this_many_items(
            const std::vector<std::vector<std::string>>& values) {
        ASSERT_TRUE(sent_) << "no request was sent";

        const std::size_t expected = static_cast<std::size_t>(std::stoi(trim(values[0][0])));
        const json::Value items = json::parse(call_.body);
        json::require_array(items, "response array");

        EXPECT_EQ(items.elements().size(), expected)
            << "number of items returned by " << call_.url;
    }

private:
    // ---- helpers -----------------------------------------------------------

    static std::string abbreviate(const std::string& text) {
        std::string flat = trim(text);
        for (char& c : flat) if (c == '\n') c = ' ';
        return flat.size() <= 80 ? flat : flat.substr(0, 80) + "...";
    }

    // Checks one field. "string" and "number" assert the type only; ?DNC? and a
    // blank expectation state nothing; anything else must match exactly.
    //
    // A cell may state a type instead of a value where the service does not
    // return the same thing every time. Both the lower case forms and the
    // declared type names are accepted, in any case, so that renaming a column
    // type in the specification does not silently turn a type assertion into a
    // literal comparison against the word "Integer".
    static void check(const std::string& what, const std::string& expected,
                      const std::string& actual) {
        const std::string want = trim(expected);
        if (want.empty() || want == DNC_STRING) return;

        const std::string got = trim(actual);
        const std::string lower = to_lower(want);

        if (lower == "string" || lower == "text") {
            EXPECT_FALSE(got.empty()) << what << " expected some text, got \"\"";
            return;
        }
        if (lower == "number" || lower == "integer" || lower == "decimal" || lower == "float") {
            EXPECT_TRUE(is_number(got)) << what << " expected a number, got \"" << got << "\"";
            return;
        }
        EXPECT_EQ(got, want) << what;
    }

    static bool is_number(const std::string& text) {
        if (text.empty()) return false;
        std::size_t i = (text[0] == '-') ? 1 : 0;
        bool digits = false, dot = false;
        for (; i < text.size(); ++i) {
            if (std::isdigit(static_cast<unsigned char>(text[i]))) { digits = true; continue; }
            if (text[i] == '.' && !dot) { dot = true; continue; }
            return false;
        }
        return digits;
    }

    static std::string to_lower(const std::string& text) {
        std::string out;
        for (char c : text) out += static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
        return out;
    }

    static std::string trim(const std::string& text) {
        const std::size_t first = text.find_first_not_of(" \t\r\n");
        if (first == std::string::npos) return "";
        return text.substr(first, text.find_last_not_of(" \t\r\n") - first + 1);
    }

    std::string base_page_;

    // Bodies offered by Given steps, keyed by the attribute set that carried them.
    std::map<std::string, std::string> bodies_;

    RestCall call_;
    bool sent_ = false;
};
