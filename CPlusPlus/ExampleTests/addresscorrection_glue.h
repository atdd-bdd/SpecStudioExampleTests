#pragma once
// Glue for a specification that tests a live service.
//
// There are no production classes: the Census Bureau geocoder is the thing
// under test. So this file does only three things -- build the call, hand the
// reply to the generated from_json, and compare. It never touches the JSON
// itself.
//
// That is possible because the attribute sets in the specification mirror the
// shape of the reply, so ResponseTyped::from_json reads all of it. Glue
// navigating a reply is a sign the specification is not describing it honestly.

#include <gtest/gtest.h>
#include <algorithm>
#include <iomanip>
#include <sstream>
#include <string>
#include <vector>
#include "common/common.h"
#include "rest_call.h"

class AddressCorrectionGlue {
public:
    static constexpr const char* DNC_STRING = "?DNC?";

    void given_base_page_is(const std::vector<std::vector<std::string>>& values) {
        base_url_ = values[0][0];
    }

    void when_sending_request(const std::vector<RequestString>& values) {
        const RequestString& request = values[0];
        try {
            response_ = RestCall::send(request.method, base_url_, request.page,
                                       query(request), "");
            sent_ = true;
        } catch (const std::exception& e) {
            FAIL() << e.what();
        }
    }

    void then_response_status_is(const std::vector<StatusString>& values) {
        ASSERT_TRUE(sent_) << "no request was sent";
        EXPECT_EQ(StatusTyped::from_string_struct(values[0]).code, response_.status)
            << "HTTP status from " << response_.url;
    }

    void then_the_matched_addresses_are(const std::vector<MatchString>& values) {
        std::vector<MatchString> remaining = matches();
        ASSERT_EQ(values.size(), remaining.size())
            << "number of matches from " << response_.url;

        // Compared as a set rather than in order: each expected row must find an
        // actual row it has not already claimed. A test that fails because a
        // service reordered its results is testing the wrong thing.
        //
        // The comparison is on the String form, not the Typed one. Only the
        // String structs skip a field holding ?DNC?, which is what makes a
        // CompareOnly table check its own columns and no others.
        for (const MatchString& expected : values) {
            const auto found = std::find(remaining.begin(), remaining.end(), expected);
            ASSERT_NE(found, remaining.end()) << "no returned address matched a row";
            remaining.erase(found);
        }
    }

    void then_there_are_no_matched_addresses() {
        EXPECT_EQ(0u, matches().size())
            << "expected no match for an address that does not exist";
    }

private:
    std::string base_url_;
    RestCall    response_;
    bool        sent_ = false;

    // The reply, read by the generated reader, as the rows a table compares.
    std::vector<MatchString> matches() {
        const ResponseTyped reply = ResponseTyped::from_json(response_.body);
        return MatchTyped::to_string_list(reply.result.addressmatches);
    }

    // The query string the geocoder expects, from the fields of the table.
    static std::string query(const RequestString& request) {
        return "?address=" + encode(request.address)
             + "&benchmark=" + encode(request.benchmark)
             + "&format=" + encode(request.format);
    }

    // Percent-encoding for a query value. Written here rather than pulled in,
    // for the same reason rest_call.h shells out to curl: no dependency the
    // reader has to fetch before the tests will run.
    static std::string encode(const std::string& value) {
        std::ostringstream out;
        out << std::hex << std::uppercase << std::setfill('0');
        for (unsigned char c : value) {
            if (std::isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~')
                out << c;
            else if (c == ' ')
                out << '+';
            else
                out << '%' << std::setw(2) << static_cast<int>(c);
        }
        return out.str();
    }
};
