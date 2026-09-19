#pragma once
#include <gtest/gtest.h>
#include <cctype>
#include <iostream>
#include <string>
#include <vector>
#include "common/common.h"
#include "production/BowlingGame.h"
#include "production/Pins.h"
#include "production/Score.h"

// Drives BowlingGame from the specification's steps.
//
// There is no scoring here on purpose: every rule about strikes, spares, marks
// and totals lives in the production classes, and this file only hands rolls in
// and compares what comes back.
class BowlingGlue {
public:
    static constexpr const char* DNC_STRING = "?DNC?";

    // ---- given -------------------------------------------------------------

    void given_rolls_are(const std::vector<std::vector<std::string>>& values) {
        game_.set_rolls(pin_counts(values));
    }

    void given_rolls_for_tenth_frame_are(const std::vector<std::vector<std::string>>& values) {
        game_.set_tenth_frame_rolls(pin_counts(values));
    }

    // The frame values from the previous step are still on the same game.
    void given_frame_values_are_as_previous() {
        EXPECT_FALSE(game_.frames().empty()) << "no game to carry forward";
    }

    // ---- when --------------------------------------------------------------

    void when_roll_is(const std::vector<std::vector<std::string>>& values) {
        for (int pin_count : pin_counts(values)) game_.add_roll(pin_count);
    }

    void when_scored() {
        game_.score();
    }

    // ---- then --------------------------------------------------------------

    void then_rolls_become(const std::vector<std::vector<std::string>>& values) {
        const std::vector<int> expected = pin_counts(values);
        const std::vector<int> actual = game_.rolls();

        ASSERT_EQ(expected.size(), actual.size()) << "number of rolls";
        for (std::size_t i = 0; i < expected.size(); ++i)
            EXPECT_EQ(expected[i], actual[i]) << "roll " << (i + 1);
    }

    void then_display_is(const std::string& value) {
        EXPECT_EQ(game_.display(), value) << "display";
    }

    void then_frame_values_are(const std::vector<FrameValuesString>& values) {
        for (const FrameValuesString& expected : values) assert_frame_equals(expected);
    }

    // The step reads "Then Then tenth frame values are" in the specification,
    // and the generated method name follows it. Renaming the method would only
    // make it disagree with the generated test.
    void then_then_tenth_frame_values_are(const std::vector<FrameValuesString>& values) {
        for (const FrameValuesString& expected : values) assert_frame_equals(expected);
    }

    void then_display_values_are(const std::vector<FrameDisplayString>& values) {
        const std::vector<FrameMarks> actual = game_.marks();

        for (const FrameDisplayString& expected : values) {
            const FrameMarks* frame = nullptr;
            for (const FrameMarks& candidate : actual)
                if (candidate.frame == trim(expected.frame)) { frame = &candidate; break; }

            ASSERT_NE(frame, nullptr) << "no frame numbered " << expected.frame;

            const std::string where = "frame " + expected.frame + " ";
            assert_field(where + "Mark1", expected.mark1, frame->mark1);
            assert_field(where + "Mark2", expected.mark2, frame->mark2);
            assert_field(where + "Mark3", expected.mark3, frame->mark3);
            assert_field(where + "TotalScore", expected.totalscore, frame->total_score);
        }
    }

    void then_game_complete_is(const std::vector<std::vector<std::string>>& values) {
        for (const std::vector<std::string>& row : values)
            for (const std::string& expected : row)
                EXPECT_EQ(trim(expected), game_.is_complete() ? "true" : "false")
                    << "game complete";
    }

    void then_input_control_is(const std::vector<InputControlValuesString>& values) {
        for (const InputControlValuesString& expected : values) {
            const InputControl actual = game_.input_control();
            assert_field("input control Frame", expected.frame, std::to_string(actual.frame));
            assert_field("input control Roll", expected.roll, std::to_string(actual.roll));
            assert_field("input control Remaining", expected.remaining,
                         std::to_string(actual.remaining));
        }
    }

    // ---- DataType checks ---------------------------------------------------

    void examples_datatype_pins(const std::vector<ValidValuesString>& values) {
        for (const ValidValuesString& value : values) {
            bool error = false;
            try { Pins held(value.value); } catch (const std::invalid_argument&) { error = true; }

            EXPECT_EQ(!error, is_true(value.isvalid)) << " Value " << value.value;
        }
    }

    void examples_datatype_score(const std::vector<ValidValuesString>& values) {
        for (const ValidValuesString& value : values) {
            bool error = false;
            try { Score held(value.value); } catch (const std::invalid_argument&) { error = true; }

            EXPECT_EQ(!error, is_true(value.isvalid)) << " Value " << value.value;
        }
    }

private:
    // ---- helpers -----------------------------------------------------------

    // Flattens the step's table into the pin counts it lists, in order.
    static std::vector<int> pin_counts(const std::vector<std::vector<std::string>>& values) {
        std::vector<int> result;
        for (const std::vector<std::string>& row : values)
            for (const std::string& cell : row) {
                const std::string text = trim(cell);
                if (!text.empty()) result.push_back(std::stoi(text));
            }
        return result;
    }

    void assert_frame_equals(const FrameValuesString& expected) {
        const std::vector<Frame> all = game_.frames();

        const Frame* frame = nullptr;
        for (const Frame& candidate : all)
            if (std::to_string(candidate.number) == trim(expected.frame)) {
                frame = &candidate;
                break;
            }
        ASSERT_NE(frame, nullptr) << "no frame numbered " << expected.frame;

        const std::string where = "frame " + expected.frame + " ";
        assert_field(where + "Roll1", expected.roll1, frame->roll1.to_string());
        assert_field(where + "Roll2", expected.roll2, frame->roll2.to_string());
        assert_field(where + "Roll3", expected.roll3, frame->roll3.to_string());
        assert_field(where + "Score", expected.score, frame->score.to_string());
        assert_field(where + "TotalScore", expected.totalscore, frame->total_score.to_string());
    }

    // Honours the ?DNC? marker the generated *String structs use.
    static void assert_field(const std::string& what, const std::string& expected,
                             const std::string& actual) {
        if (expected == DNC_STRING) return;
        EXPECT_EQ(trim(expected), trim(actual)) << what;
    }

    static bool is_true(const std::string& text) {
        std::string lower;
        for (char c : text)
            if (!std::isspace(static_cast<unsigned char>(c)))
                lower += static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
        return lower == "yes" || lower == "true" || lower == "y" || lower == "1";
    }

    static std::string trim(const std::string& text) {
        const std::size_t first = text.find_first_not_of(" \t\r\n");
        if (first == std::string::npos) return "";
        return text.substr(first, text.find_last_not_of(" \t\r\n") - first + 1);
    }

    BowlingGame game_;
};
