#pragma once
// The transport for a specification that tests a live service.
//
// It lives beside the glue rather than in common/, which every build rewrites.
// It knows nothing about addresses: give it the pieces of a call and it returns
// the status and the body. Deciding what the answer should be is the
// specification's job, and comparing is the glue's.
//
// The transport is curl rather than a library. C++ has no HTTP in its standard
// library, and this repository builds nine languages from one specification; a
// dependency added here would have to be fetched and built before the C++ tests
// could run at all, which is a heavier thing to ask of a reader than a program
// every supported platform already ships. Rust and the two JavaScripts spawn a
// child process for the same reason.
//
// A call that cannot be made at all throws, naming the URL. That is a broken
// test rather than a failed assertion, and the two should not look alike in the
// output.

#include <cstdio>
#include <cstdlib>
#include <fstream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

class RestCall {
public:
    int status = 0;
    std::string body;
    std::string url;

    // Sends one request and returns the result.
    //
    // A parameter beginning with '?' is a query string and is appended as it
    // stands; anything else is a path segment and is joined with a slash. So
    // posts/1 is page "posts" with parameter "1", and a search is page "search"
    // with parameter "?q=hat".
    static RestCall send(const std::string& method, const std::string& base_url,
                         const std::string& page, const std::string& parameter,
                         const std::string& request)
    {
        const std::string url = build_url(base_url, page, parameter);
        const std::string verb = upper(trim(method));

        // The body goes through a file rather than the command line: a JSON
        // payload carries quotes, and quoting those through a shell correctly on
        // every platform is a problem worth not having.
        const std::string body_path = temp_path("rest_body");
        const std::string out_path = temp_path("rest_out");
        const bool has_body = !trim(request).empty();
        if (has_body) {
            std::ofstream out(body_path, std::ios::binary);
            out << request;
        }

        // -s silences the progress meter, and -w writes the status after the
        // body so the last line is always the status however many lines the
        // body has.
        std::ostringstream command;
        command << "curl -s -X " << verb
                << " -H \"Accept: application/json\""
                << " -H \"Content-Type: application/json; charset=UTF-8\""
                << " --max-time 30"
                << " -w \"\\n%{http_code}\"";
        if (has_body) command << " --data-binary @\"" << body_path << "\"";
        command << " \"" << url << "\" > \"" << out_path << "\" 2>&1";

        const int code = std::system(command.str().c_str());
        if (has_body) std::remove(body_path.c_str());

        // An unreachable service is a failed call, not a failed assertion; the
        // glue turns this into a test failure naming the URL.
        if (code != 0) {
            std::remove(out_path.c_str());
            throw std::runtime_error("Could not call " + url + " -- curl exited "
                                     + std::to_string(code));
        }

        std::ifstream in(out_path, std::ios::binary);
        std::ostringstream text;
        text << in.rdbuf();
        in.close();
        std::remove(out_path.c_str());

        const std::string all = text.str();
        const std::size_t split = all.find_last_of('\n');
        if (split == std::string::npos)
            throw std::runtime_error(url + " returned nothing");

        RestCall call;
        call.status = std::stoi(trim(all.substr(split + 1)));
        call.body = all.substr(0, split);
        call.url = url;
        return call;
    }

private:
    // Joins the pieces with exactly one slash, dropping any that are empty.
    static std::string build_url(const std::string& base_url, const std::string& page,
                                 const std::string& parameter)
    {
        std::string url = trim_slashes(base_url);

        const std::string clean_page = trim_slashes(page);
        if (!clean_page.empty()) url += "/" + clean_page;

        if (!parameter.empty()) {
            if (parameter.front() == '?') url += parameter;
            else                          url += "/" + trim_slashes(parameter);
        }
        return url;
    }

    static std::string trim_slashes(const std::string& part)
    {
        std::string piece = trim(part);
        while (!piece.empty() && piece.front() == '/') piece.erase(0, 1);
        while (!piece.empty() && piece.back() == '/') piece.pop_back();
        return piece;
    }

    static std::string temp_path(const std::string& stem)
    {
        static int counter = 0;
        const char* base = std::getenv("TEMP");
        if (base == nullptr) base = std::getenv("TMPDIR");
        if (base == nullptr) base = ".";
        return std::string(base) + "/" + stem + "_" + std::to_string(++counter) + ".tmp";
    }

    static std::string upper(const std::string& text)
    {
        std::string out;
        for (char c : text) out += static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
        return out;
    }

    static std::string trim(const std::string& text)
    {
        const std::size_t first = text.find_first_not_of(" \t\r\n");
        if (first == std::string::npos) return "";
        return text.substr(first, text.find_last_not_of(" \t\r\n") - first + 1);
    }
};
