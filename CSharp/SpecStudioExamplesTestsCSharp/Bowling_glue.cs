namespace SpecStudioExamplesTestsCSharp.Bowling
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using SpecStudioExamplesTestsCSharp.common;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    using static Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
    using production;

    /// <summary>
    /// Drives BowlingGame from the specification's steps.
    ///
    /// There is no scoring here on purpose: every rule about strikes, spares,
    /// marks and totals lives in the production classes, and this file only
    /// hands rolls in and compares what comes back.
    /// </summary>
    public class Bowling_glue
    {
        const string DNCString = "?DNC?";

        private readonly BowlingGame _game = new BowlingGame();

        // ---- given ----------------------------------------------------------

        public void Given_rolls_are(List<List<string>> values)
        {
            _game.SetRolls(PinCounts(values));
        }

        public void Given_rolls_for_tenth_frame_are(List<List<string>> values)
        {
            _game.SetTenthFrameRolls(PinCounts(values));
        }

        /// <summary>The frame values from the previous step are still on the same game.</summary>
        public void Given_frame_values_are_as_previous()
        {
            IsNotNull(_game.GetFrames(), "no game to carry forward");
        }

        // ---- when -----------------------------------------------------------

        public void When_roll_is(List<List<string>> values)
        {
            foreach (var pinCount in PinCounts(values))
                _game.AddRoll(pinCount);
        }

        public void When_scored()
        {
            _game.Score();
        }

        // ---- then -----------------------------------------------------------

        public void Then_rolls_become(List<List<string>> values)
        {
            var expected = PinCounts(values);
            var actual = _game.Rolls();

            AreEqual(expected.Count, actual.Count,
                     "number of rolls " + string.Join(", ", actual));
            for (var i = 0; i < expected.Count; i++)
                AreEqual(expected[i], actual[i], "roll " + (i + 1));
        }

        public void Then_display_is(string value)
        {
            AreEqual(value, _game.Display(), "display");
        }

        public void Then_frame_values_are(List<FrameValuesString> values)
        {
            foreach (var expected in values) AssertFrameEquals(expected);
        }

        /// <summary>
        /// The step reads "Then Then tenth frame values are" in the
        /// specification, and the generated method name follows it. Renaming the
        /// method would only make it disagree with the generated test.
        /// </summary>
        public void Then_Then_tenth_frame_values_are(List<FrameValuesString> values)
        {
            foreach (var expected in values) AssertFrameEquals(expected);
        }

        public void Then_display_values_are(List<FrameDisplayString> values)
        {
            var actual = _game.Marks();

            foreach (var expected in values)
            {
                var frame = MarkedFrame(actual, expected.frame);
                var where = "frame " + expected.frame + " ";
                AssertField(where + "Mark1", expected.mark1, frame.Mark1);
                AssertField(where + "Mark2", expected.mark2, frame.Mark2);
                AssertField(where + "Mark3", expected.mark3, frame.Mark3);
                AssertField(where + "TotalScore", expected.totalScore, frame.TotalScore);
            }
        }

        public void Then_game_complete_is(List<List<string>> values)
        {
            foreach (var row in values)
                foreach (var expected in row)
                    AreEqual(expected.Trim(),
                             _game.IsComplete().ToString().ToLowerInvariant(),
                             "game complete");
        }

        public void Then_input_control_is(List<InputControlValuesString> values)
        {
            foreach (var expected in values)
            {
                var actual = _game.GetInputControl();
                AssertField("input control Frame", expected.frame,
                            actual.Frame.ToString(CultureInfo.InvariantCulture));
                AssertField("input control Roll", expected.roll,
                            actual.Roll.ToString(CultureInfo.InvariantCulture));
                AssertField("input control Remaining", expected.remaining,
                            actual.Remaining.ToString(CultureInfo.InvariantCulture));
            }
        }

        // ---- DataType checks -------------------------------------------------

        public void Examples_DataType_Pins(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                var error = false;
                try { new Pins(value.value); } catch (FormatException) { error = true; }

                AreEqual(IsTrue_(value.isValid), !error, " Value " + value.value);
            }
        }

        public void Examples_DataType_Score(List<ValidValuesString> values)
        {
            foreach (var value in values)
            {
                var error = false;
                try { new Score(value.value); } catch (FormatException) { error = true; }

                AreEqual(IsTrue_(value.isValid), !error, " Value " + value.value);
            }
        }

        // ---- helpers ---------------------------------------------------------

        /// <summary>Flattens the step's table into the pin counts it lists, in order.</summary>
        private static List<int> PinCounts(List<List<string>> values)
        {
            var result = new List<int>();
            foreach (var row in values)
                foreach (var cell in row)
                {
                    var text = cell.Trim();
                    if (text.Length > 0)
                        result.Add(int.Parse(text, CultureInfo.InvariantCulture));
                }
            return result;
        }

        private void AssertFrameEquals(FrameValuesString expected)
        {
            var frame = NumberedFrame(expected.frame);
            var where = "frame " + expected.frame + " ";
            AssertField(where + "Roll1", expected.roll1, frame.Roll1.ToString());
            AssertField(where + "Roll2", expected.roll2, frame.Roll2.ToString());
            AssertField(where + "Roll3", expected.roll3, frame.Roll3.ToString());
            AssertField(where + "Score", expected.score, frame.Score.ToString());
            AssertField(where + "TotalScore", expected.totalScore, frame.TotalScore.ToString());
        }

        private Frame NumberedFrame(string number)
        {
            foreach (var frame in _game.GetFrames())
                if (frame.Number.ToString(CultureInfo.InvariantCulture) == number.Trim())
                    return frame;
            throw new AssertFailedException("no frame numbered " + number);
        }

        private static FrameMarks MarkedFrame(List<FrameMarks> frames, string number)
        {
            foreach (var frame in frames)
                if (frame.Frame == number.Trim()) return frame;
            throw new AssertFailedException("no frame numbered " + number);
        }

        /// <summary>Honours the ?DNC? marker the generated *String classes use.</summary>
        private static void AssertField(string what, string expected, string actual)
        {
            if (DNCString == expected) return;
            AreEqual(expected.Trim(), actual.Trim(), what);
        }

        private static bool IsTrue_(string text)
        {
            switch (text.Trim().ToLowerInvariant())
            {
                case "yes": case "true": case "y": case "1": return true;
                default: return false;
            }
        }
    }
}
