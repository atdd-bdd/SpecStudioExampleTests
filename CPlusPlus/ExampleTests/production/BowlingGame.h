#pragma once
// A game of ten-pin bowling: the rolls made so far, the scoresheet they produce,
// and what the next roll is allowed to be.
//
// All the scoring lives here rather than in the test glue. The glue's job is to
// hand rolls in and read values out.

#include <algorithm>
#include <string>
#include <vector>

#include "Pins.h"
#include "Score.h"

// One frame's rolls as the scoresheet shows them, plus its score.
//
// roll1..roll3 are the three rolls starting at this frame's first roll -- not
// only the rolls bowled in this frame. After a strike, roll2 and roll3 are the
// next frame's rolls, because those are what score this one. The spec's
// FrameValues table is written that way: frame 4 is a strike and still lists
// Roll2 and Roll3 as the two rolls that follow it.
struct Frame {
    int number;
    ::Pins roll1;
    ::Pins roll2;
    ::Pins roll3;
    ::Score score;
    ::Score total_score;

    bool is_strike() const { return roll1.is_strike(); }

    // A spare only counts when it is not already a strike.
    bool is_spare() const
    {
        return !is_strike() && roll1.is_rolled() && roll2.is_rolled()
            && roll1.count() + roll2.count() == Pins::max;
    }
};

// How one frame is written on a scoresheet: X for a strike, / for a spare,
// - for a gutter ball, blank for a roll not yet made.
//
// mark3 is only ever filled on the tenth frame, the only frame that can have a
// third roll of its own.
struct FrameMarks {
    std::string frame;
    std::string mark1;
    std::string mark2;
    std::string mark3;
    std::string total_score;

    // The mark columns joined, as they appear in the top row of the display.
    std::string marks() const { return mark1 + mark2 + mark3; }
};

// Where the next roll goes, and how many pins are standing for it -- what a
// keypad needs in order to disable the buttons that cannot be pressed.
struct InputControl {
    int frame;
    int roll;
    int remaining;
};

class BowlingGame {
public:
    static constexpr int frame_count = 10;

    std::vector<int> rolls() const { return rolls_; }

    // Replaces the rolls outright. Setup, not play -- no validation.
    void set_rolls(const std::vector<int>& pin_counts)
    {
        rolls_ = pin_counts;
        tenth_frame_only_ = false;
    }

    // Seeds only the tenth frame; frames 1..9 are left unbowled.
    void set_tenth_frame_rolls(const std::vector<int>& pin_counts)
    {
        rolls_ = pin_counts;
        tenth_frame_only_ = true;
    }

    // Bowls one roll. Returns false and changes nothing when the roll is
    // impossible -- more pins than are standing, or a game already over.
    bool add_roll(int pin_count)
    {
        if (pin_count < 0 || pin_count > Pins::max) return false;
        if (is_complete()) return false;
        if (pin_count > input_control().remaining) return false;

        rolls_.push_back(pin_count);
        return true;
    }

    // Recomputes the scoresheet. Scoring is derived on demand, so this exists to
    // give the specification's "When scored" step something real to drive.
    void score() { frames(); }

    // ---- scoresheet --------------------------------------------------------

    std::vector<Frame> frames() const
    {
        std::vector<Frame> result;
        const std::vector<std::size_t> starts = frame_starts();
        int running = 0;
        bool running_known = true;

        for (int f = 1; f <= frame_count; ++f) {
            const std::size_t start = starts[static_cast<std::size_t>(f)];
            const Pins roll1 = pins_at(start);
            const Pins roll2 = pins_at(start + 1);
            const Pins roll3 = pins_at(start + 2);

            const bool strike = roll1.is_strike();
            const bool spare = !strike && roll1.is_rolled() && roll2.is_rolled()
                            && roll1.count() + roll2.count() == Pins::max;

            // A strike or a spare is only worth what the following rolls make
            // it, so it needs three rolls before it can be scored at all.
            const int needed = (strike || spare) ? 3 : 2;

            Score score = Score::tbs();
            Score total = Score::tbs();
            if (all_rolled(start, needed)) {
                const int points = roll1.count() + roll2.count()
                                 + (needed == 3 ? roll3.count() : 0);
                score = Score(points);
                if (running_known) {
                    running += points;
                    total = Score(running);
                }
            } else {
                // Once one frame cannot be scored, no later total can be either.
                running_known = false;
            }

            result.push_back(Frame{ f, roll1, roll2, roll3, score, total });
        }
        return result;
    }

    std::vector<FrameMarks> marks() const
    {
        std::vector<FrameMarks> result;

        for (const Frame& frame : frames()) {
            std::string mark1, mark2, mark3;

            if (frame.roll1.is_rolled())
                mark1 = frame.roll1.is_strike() ? "X" : digit(frame.roll1);

            if (frame.number < frame_count) {
                // Frames 1..9 show only their own two rolls; after a strike
                // there is no second mark, even though roll2 holds the next
                // frame's roll.
                if (!frame.roll1.is_strike() && frame.roll1.is_rolled()
                        && frame.roll2.is_rolled())
                    mark2 = (frame.roll1.count() + frame.roll2.count() == Pins::max)
                          ? "/" : digit(frame.roll2);
            } else {
                if (frame.roll2.is_rolled()) {
                    if (frame.roll1.is_strike())
                        mark2 = frame.roll2.is_strike() ? "X" : digit(frame.roll2);
                    else
                        mark2 = (frame.roll1.count() + frame.roll2.count() == Pins::max)
                              ? "/" : digit(frame.roll2);
                }
                if (frame.roll3.is_rolled()) {
                    const bool spare_on_bonus = frame.roll1.is_strike()
                                             && !frame.roll2.is_strike()
                                             && frame.roll2.count() + frame.roll3.count() == Pins::max;
                    mark3 = spare_on_bonus ? "/"
                          : (frame.roll3.is_strike() ? "X" : digit(frame.roll3));
                }
            }

            const std::string total =
                frame.total_score.is_computable() ? frame.total_score.to_string() : "";
            result.push_back(FrameMarks{ std::to_string(frame.number),
                                         mark1, mark2, mark3, total });
        }
        return result;
    }

    // The scoresheet as two rows: marks above, running totals below.
    //
    // Each frame's column is as wide as the wider of its two cells, so a frame
    // whose total reaches three digits widens both rows together and the columns
    // stay aligned under each other.
    //
    // Two rows, no trailing newline: that is what the docstring in the
    // specification holds, and it is compared as text.
    std::string display() const
    {
        std::string top, bottom;

        for (const FrameMarks& frame : marks()) {
            const std::size_t width = std::max(frame.marks().size(), frame.total_score.size());
            top += "| " + pad_right(frame.marks(), width) + " ";
            bottom += "| " + pad_right(frame.total_score, width) + " ";
        }
        return top + "|\n" + bottom + "|";
    }

    // ---- state -------------------------------------------------------------

    // True once the tenth frame has had every roll it is entitled to.
    bool is_complete() const
    {
        const std::size_t start = frame_starts()[frame_count];
        const Pins roll1 = pins_at(start);
        const Pins roll2 = pins_at(start + 1);
        if (!roll1.is_rolled() || !roll2.is_rolled()) return false;

        const bool strike = roll1.is_strike();
        const bool spare = !strike && roll1.count() + roll2.count() == Pins::max;
        return (strike || spare) ? pins_at(start + 2).is_rolled() : true;
    }

    // Which frame and roll the next ball belongs to, and how many pins stand.
    InputControl input_control() const
    {
        const std::vector<std::size_t> starts = frame_starts();

        for (int f = 1; f < frame_count; ++f) {
            const std::size_t start = starts[static_cast<std::size_t>(f)];
            const Pins roll1 = pins_at(start);
            if (!roll1.is_rolled()) return InputControl{ f, 1, Pins::max };
            if (roll1.is_strike()) continue;          // one roll ends the frame
            if (!pins_at(start + 1).is_rolled())
                return InputControl{ f, 2, Pins::max - roll1.count() };
        }

        const std::size_t start = starts[frame_count];
        const Pins roll1 = pins_at(start);
        const Pins roll2 = pins_at(start + 1);
        if (!roll1.is_rolled()) return InputControl{ frame_count, 1, Pins::max };
        if (!roll2.is_rolled())
            return InputControl{ frame_count, 2,
                                 roll1.is_strike() ? Pins::max : Pins::max - roll1.count() };

        // Third roll of the tenth. After two strikes the rack is full again;
        // after a strike then a non-strike, only what that ball left standing;
        // after a spare, a fresh rack.
        const int remaining = (roll1.is_strike() && !roll2.is_strike())
            ? Pins::max - roll2.count() : Pins::max;
        return InputControl{ frame_count, 3, remaining };
    }

private:
    // Index of each frame's first roll. A strike ends a frame in one roll, so
    // the next frame starts one later rather than two.
    std::vector<std::size_t> frame_starts() const
    {
        std::vector<std::size_t> starts(frame_count + 1, 0);

        if (tenth_frame_only_) {
            // Frames 1..9 are unbowled: point them past every roll so each one
            // reads back as TBR.
            for (int f = 1; f < frame_count; ++f)
                starts[static_cast<std::size_t>(f)] = rolls_.size() + frame_count * 2;
            starts[frame_count] = 0;
            return starts;
        }

        std::size_t index = 0;
        for (int f = 1; f < frame_count; ++f) {
            starts[static_cast<std::size_t>(f)] = index;
            index += (index < rolls_.size() && rolls_[index] == Pins::max) ? 1 : 2;
        }
        starts[frame_count] = index;
        return starts;
    }

    Pins pins_at(std::size_t index) const
    {
        if (index >= rolls_.size()) return Pins::tbr();
        return Pins(rolls_[index]);
    }

    bool all_rolled(std::size_t start, int count) const
    {
        for (int i = 0; i < count; ++i)
            if (!pins_at(start + static_cast<std::size_t>(i)).is_rolled()) return false;
        return true;
    }

    // A gutter ball is written as a dash, not a zero.
    static std::string digit(const Pins& pins)
    {
        return pins.count() == 0 ? "-" : std::to_string(pins.count());
    }

    static std::string pad_right(const std::string& text, std::size_t width)
    {
        std::string out = text;
        while (out.size() < width) out += ' ';
        return out;
    }

    std::vector<int> rolls_;

    // True when the game was seeded with the tenth frame's rolls alone, so the
    // tenth frame can be examined without bowling the nine before it. The
    // earlier frames then have no rolls, which is why their scores -- and every
    // running total -- stay TBS.
    bool tenth_frame_only_ = false;
};
