namespace production
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Text;

    /// <summary>
    /// One frame's rolls as the scoresheet shows them, plus its score.
    ///
    /// Roll1..Roll3 are the three rolls starting at this frame's first roll --
    /// not only the rolls bowled in this frame. After a strike, Roll2 and Roll3
    /// are the next frame's rolls, because those are what score this one. The
    /// spec's FrameValues table is written that way: frame 4 is a strike and
    /// still lists Roll2 and Roll3 as the two rolls that follow it.
    /// </summary>
    public class Frame
    {
        public readonly int Number;
        public readonly Pins Roll1;
        public readonly Pins Roll2;
        public readonly Pins Roll3;
        public readonly Score Score;
        public readonly Score TotalScore;

        public Frame(int number, Pins roll1, Pins roll2, Pins roll3, Score score, Score totalScore)
        {
            Number = number;
            Roll1 = roll1;
            Roll2 = roll2;
            Roll3 = roll3;
            Score = score;
            TotalScore = totalScore;
        }

        public bool IsStrike() => Roll1.IsStrike();

        /// <summary>A spare only counts when it is not already a strike.</summary>
        public bool IsSpare() =>
            !IsStrike() && Roll1.IsRolled() && Roll2.IsRolled()
            && Roll1.Count() + Roll2.Count() == Pins.Max;
    }

    /// <summary>
    /// How one frame is written on a scoresheet: X for a strike, / for a spare,
    /// - for a gutter ball, blank for a roll not yet made.
    ///
    /// Mark3 is only ever filled on the tenth frame, the only frame that can have
    /// a third roll of its own.
    /// </summary>
    public class FrameMarks
    {
        public readonly string Frame;
        public readonly string Mark1;
        public readonly string Mark2;
        public readonly string Mark3;
        public readonly string TotalScore;

        public FrameMarks(string frame, string mark1, string mark2, string mark3, string totalScore)
        {
            Frame = frame;
            Mark1 = mark1;
            Mark2 = mark2;
            Mark3 = mark3;
            TotalScore = totalScore;
        }

        /// <summary>The mark columns joined, as in the top row of the display.</summary>
        public string Marks() => Mark1 + Mark2 + Mark3;
    }

    /// <summary>
    /// Where the next roll goes, and how many pins are standing for it -- what a
    /// keypad needs in order to disable the buttons that cannot be pressed.
    /// </summary>
    public class InputControl
    {
        public readonly int Frame;
        public readonly int Roll;
        public readonly int Remaining;

        public InputControl(int frame, int roll, int remaining)
        {
            Frame = frame;
            Roll = roll;
            Remaining = remaining;
        }
    }

    /// <summary>
    /// A game of ten-pin bowling: the rolls made so far, the scoresheet they
    /// produce, and what the next roll is allowed to be.
    ///
    /// All the scoring lives here rather than in the test glue. The glue's job is
    /// to hand rolls in and read values out.
    /// </summary>
    public class BowlingGame
    {
        private const int Frames = 10;

        private readonly List<int> _rolls = new List<int>();

        // True when the game was seeded with the tenth frame's rolls alone, so
        // the tenth frame can be examined without bowling the nine before it.
        // The earlier frames then have no rolls, which is why their scores --
        // and every running total -- stay TBS.
        private bool _tenthFrameOnly;

        public List<int> Rolls() => new List<int>(_rolls);

        /// <summary>Replaces the rolls outright. Setup, not play -- no validation.</summary>
        public void SetRolls(IEnumerable<int> pinCounts)
        {
            _rolls.Clear();
            _rolls.AddRange(pinCounts);
            _tenthFrameOnly = false;
        }

        /// <summary>Seeds only the tenth frame; frames 1..9 are left unbowled.</summary>
        public void SetTenthFrameRolls(IEnumerable<int> pinCounts)
        {
            _rolls.Clear();
            _rolls.AddRange(pinCounts);
            _tenthFrameOnly = true;
        }

        /// <summary>
        /// Bowls one roll. Returns false and changes nothing when the roll is
        /// impossible -- more pins than are standing, or a game already over.
        /// </summary>
        public bool AddRoll(int pinCount)
        {
            if (pinCount < 0 || pinCount > Pins.Max) return false;
            if (IsComplete()) return false;
            if (pinCount > GetInputControl().Remaining) return false;

            _rolls.Add(pinCount);
            return true;
        }

        /// <summary>
        /// Recomputes the scoresheet. Scoring is derived on demand, so this
        /// exists to give the specification's "When scored" step something real
        /// to drive.
        /// </summary>
        public void Score() => GetFrames();

        // ---- scoresheet ------------------------------------------------------

        public List<Frame> GetFrames()
        {
            var result = new List<Frame>();
            var starts = FrameStarts();
            var running = 0;
            var runningKnown = true;

            for (var f = 1; f <= Frames; f++)
            {
                var start = starts[f];
                var roll1 = PinsAt(start);
                var roll2 = PinsAt(start + 1);
                var roll3 = PinsAt(start + 2);

                var strike = roll1.IsStrike();
                var spare = !strike && roll1.IsRolled() && roll2.IsRolled()
                            && roll1.Count() + roll2.Count() == Pins.Max;

                // A strike or a spare is only worth what the following rolls make
                // it, so it needs three rolls before it can be scored at all.
                var needed = (strike || spare) ? 3 : 2;

                var score = production.Score.TBS;
                var total = production.Score.TBS;
                if (AllRolled(start, needed))
                {
                    var points = roll1.Count() + roll2.Count()
                               + (needed == 3 ? roll3.Count() : 0);
                    score = new Score(points);
                    if (runningKnown)
                    {
                        running += points;
                        total = new Score(running);
                    }
                }
                else
                {
                    // Once one frame cannot be scored, no later total can be either.
                    runningKnown = false;
                }

                result.Add(new Frame(f, roll1, roll2, roll3, score, total));
            }
            return result;
        }

        public List<FrameMarks> Marks()
        {
            var result = new List<FrameMarks>();

            foreach (var frame in GetFrames())
            {
                var mark1 = "";
                var mark2 = "";
                var mark3 = "";

                if (frame.Roll1.IsRolled())
                    mark1 = frame.Roll1.IsStrike() ? "X" : Digit(frame.Roll1);

                if (frame.Number < Frames)
                {
                    // Frames 1..9 show only their own two rolls; after a strike
                    // there is no second mark, even though Roll2 holds the next
                    // frame's roll.
                    if (!frame.Roll1.IsStrike() && frame.Roll1.IsRolled() && frame.Roll2.IsRolled())
                        mark2 = frame.Roll1.Count() + frame.Roll2.Count() == Pins.Max
                              ? "/" : Digit(frame.Roll2);
                }
                else
                {
                    if (frame.Roll2.IsRolled())
                    {
                        if (frame.Roll1.IsStrike())
                            mark2 = frame.Roll2.IsStrike() ? "X" : Digit(frame.Roll2);
                        else
                            mark2 = frame.Roll1.Count() + frame.Roll2.Count() == Pins.Max
                                  ? "/" : Digit(frame.Roll2);
                    }
                    if (frame.Roll3.IsRolled())
                    {
                        var spareOnBonus = frame.Roll1.IsStrike() && !frame.Roll2.IsStrike()
                                        && frame.Roll2.Count() + frame.Roll3.Count() == Pins.Max;
                        mark3 = spareOnBonus ? "/"
                              : frame.Roll3.IsStrike() ? "X" : Digit(frame.Roll3);
                    }
                }

                var total = frame.TotalScore.IsComputable() ? frame.TotalScore.ToString() : "";
                result.Add(new FrameMarks(frame.Number.ToString(CultureInfo.InvariantCulture),
                                          mark1, mark2, mark3, total));
            }
            return result;
        }

        /// <summary>
        /// The scoresheet as two rows: marks above, running totals below.
        ///
        /// Each frame's column is as wide as the wider of its two cells, so a
        /// frame whose total reaches three digits widens both rows together and
        /// the columns stay aligned under each other.
        ///
        /// Two rows, no trailing newline: that is what the docstring in the
        /// specification holds, and it is compared as text.
        /// </summary>
        public string Display()
        {
            var top = new StringBuilder();
            var bottom = new StringBuilder();

            foreach (var frame in Marks())
            {
                var width = Math.Max(frame.Marks().Length, frame.TotalScore.Length);
                top.Append("| ").Append(frame.Marks().PadRight(width)).Append(' ');
                bottom.Append("| ").Append(frame.TotalScore.PadRight(width)).Append(' ');
            }
            return top + "|\n" + bottom + "|";
        }

        // ---- state -----------------------------------------------------------

        /// <summary>True once the tenth frame has had every roll it is entitled to.</summary>
        public bool IsComplete()
        {
            var start = FrameStarts()[Frames];
            var roll1 = PinsAt(start);
            var roll2 = PinsAt(start + 1);
            if (!roll1.IsRolled() || !roll2.IsRolled()) return false;

            var strike = roll1.IsStrike();
            var spare = !strike && roll1.Count() + roll2.Count() == Pins.Max;
            return (strike || spare) ? PinsAt(start + 2).IsRolled() : true;
        }

        /// <summary>Which frame and roll the next ball belongs to, and how many pins stand.</summary>
        public InputControl GetInputControl()
        {
            var starts = FrameStarts();

            for (var f = 1; f < Frames; f++)
            {
                var start = starts[f];
                var roll1 = PinsAt(start);
                if (!roll1.IsRolled()) return new InputControl(f, 1, Pins.Max);
                if (roll1.IsStrike()) continue;          // one roll ends the frame
                if (!PinsAt(start + 1).IsRolled())
                    return new InputControl(f, 2, Pins.Max - roll1.Count());
            }

            var tenth = starts[Frames];
            var first = PinsAt(tenth);
            var second = PinsAt(tenth + 1);
            if (!first.IsRolled()) return new InputControl(Frames, 1, Pins.Max);
            if (!second.IsRolled())
                return new InputControl(Frames, 2,
                    first.IsStrike() ? Pins.Max : Pins.Max - first.Count());

            // Third roll of the tenth. After two strikes the rack is full again;
            // after a strike then a non-strike, only what that ball left
            // standing; after a spare, a fresh rack.
            var remaining = first.IsStrike()
                ? (second.IsStrike() ? Pins.Max : Pins.Max - second.Count())
                : Pins.Max;
            return new InputControl(Frames, 3, remaining);
        }

        // ---- helpers ---------------------------------------------------------

        /// <summary>
        /// Index of each frame's first roll. A strike ends a frame in one roll,
        /// so the next frame starts one later rather than two.
        /// </summary>
        private int[] FrameStarts()
        {
            var starts = new int[Frames + 1];

            if (_tenthFrameOnly)
            {
                // Frames 1..9 are unbowled: point them past every roll so each
                // one reads back as TBR.
                for (var f = 1; f < Frames; f++) starts[f] = _rolls.Count + Frames * 2;
                starts[Frames] = 0;
                return starts;
            }

            var index = 0;
            for (var f = 1; f < Frames; f++)
            {
                starts[f] = index;
                index += (index < _rolls.Count && _rolls[index] == Pins.Max) ? 1 : 2;
            }
            starts[Frames] = index;
            return starts;
        }

        private Pins PinsAt(int index)
        {
            if (index < 0 || index >= _rolls.Count) return Pins.TBR;
            return new Pins(_rolls[index]);
        }

        private bool AllRolled(int start, int count)
        {
            for (var i = 0; i < count; i++)
                if (!PinsAt(start + i).IsRolled()) return false;
            return true;
        }

        /// <summary>A gutter ball is written as a dash, not a zero.</summary>
        private static string Digit(Pins pins) =>
            pins.Count() == 0 ? "-" : pins.Count().ToString(CultureInfo.InvariantCulture);
    }
}
