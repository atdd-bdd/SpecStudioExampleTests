package spectable;

import java.util.List;
import java.util.ArrayList;
import spectable.common.*;
import production.*;
import java.util.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Drives BowlingGame from the specification's steps.
 *
 * There is no scoring here on purpose: every rule about strikes, spares, marks
 * and totals lives in the production classes, and this file only hands rolls in
 * and compares what comes back.
 */
public class Bowling_glue {
    private static final String DNCString = "?DNC?";

    private final BowlingGame game = new BowlingGame();

    // ---- given --------------------------------------------------------------

    public void Given_rolls_are(List<PinsString> values) {
        game.setRolls(asPins(values));
    }

    public void Given_rolls_for_tenth_frame_are(List<PinsString> values) {
        game.setTenthFrameRolls(asPins(values));
    }

    /** The frame values from the previous step are still on the same game. */
    public void Given_frame_values_are_as_previous() {
        assertNotNull(game.frames(), "no game to carry forward");
    }

    // ---- when ---------------------------------------------------------------

    public void When_roll_is(List<PinsString> values) {
        for (PinsString roll : values)
            game.addRoll(new Pins(roll.value));
    }

    public void When_scored() {
        game.score();
    }

    // ---- then ---------------------------------------------------------------

    public void Then_rolls_become(List<PinsString> values) {
        List<Pins> expected = asPins(values);
        List<Pins> actual = game.rolls();
        assertEquals(expected.size(), actual.size(), "number of rolls " + actual);
        for (int i = 0; i < expected.size(); i++)
            assertEquals(expected.get(i), actual.get(i), "roll " + (i + 1));
    }

    public void Then_display_is(String value) {
        assertEquals(value, game.display(), "display");
    }

    public void Then_frame_values_are(List<FrameValuesString> values) {
        for (FrameValuesString expected : values)
            assertFrameEquals(expected);
    }

    /**
     * The step reads "Then Then tenth frame values are" in the specification, and
     * the generated method name follows it. Renaming the method would only make
     * it disagree with the generated test.
     */
    public void Then_Then_tenth_frame_values_are(List<FrameValuesString> values) {
        for (FrameValuesString expected : values)
            assertFrameEquals(expected);
    }

    public void Then_display_values_are(List<FrameDisplayString> values) {
        List<FrameMarks> actual = game.marks();
        for (FrameDisplayString expected : values) {
            FrameMarks frame = markedFrame(actual, expected.frame);
            String where = "frame " + expected.frame + " ";
            assertField(where + "Mark1", expected.mark1, frame.mark1);
            assertField(where + "Mark2", expected.mark2, frame.mark2);
            assertField(where + "Mark3", expected.mark3, frame.mark3);
            assertField(where + "TotalScore", expected.totalScore, frame.totalScore);
        }
    }

    public void Then_game_complete_is(List<Boolean> values) {
        for (Boolean expected : values)
            assertEquals(expected, game.isComplete(), "game complete");
    }

    public void Then_input_control_is(List<InputControlValuesString> values) {
        for (InputControlValuesString expected : values) {
            InputControl actual = game.inputControl();
            assertField("input control Frame", expected.frame, String.valueOf(actual.frame));
            assertField("input control Roll", expected.roll.value, String.valueOf(actual.roll));
            assertField("input control Remaining", expected.remaining.value, String.valueOf(actual.remaining));
        }
    }

    // ---- DataType checks ----------------------------------------------------

    public void Examples_DataType_Pins(List<ValidValuesString> values) {
        for (ValidValuesString value : values) {
            boolean error = false;
            ValidValuesTyped vvt = new ValidValuesTyped(value);
            try {
                new Pins(vvt.value);
            }
            catch (NumberFormatException e) {
                error = true;
            }
            assertEquals(vvt.isValid.toBoolean(), !error, " Value " + vvt.value);
        }
    }

    public void Examples_DataType_Score(List<ValidValuesString> values) {
        for (ValidValuesString value : values) {
            boolean error = false;
            ValidValuesTyped vvt = new ValidValuesTyped(value);
            try {
                new Score(vvt.value);
            }
            catch (NumberFormatException e) {
                error = true;
            }
            assertEquals(vvt.isValid.toBoolean(), !error, " Value " + vvt.value);
        }
    }

    // ---- helpers ------------------------------------------------------------

    private void assertFrameEquals(FrameValuesString expected) {
        Frame frame = numberedFrame(expected.frame);
        String where = "frame " + expected.frame + " ";
        assertField(where + "Roll1", expected.roll1.value, frame.roll1.toString());
        assertField(where + "Roll2", expected.roll2.value, frame.roll2.toString());
        assertField(where + "Roll3", expected.roll3.value, frame.roll3.toString());
        assertField(where + "Score", expected.score.value, frame.score.toString());
        assertField(where + "TotalScore", expected.totalScore.value, frame.totalScore.toString());
    }

    private Frame numberedFrame(String number) {
        for (Frame frame : game.frames())
            if (String.valueOf(frame.number).equals(number.trim()))
                return frame;
        throw new AssertionError("no frame numbered " + number);
    }

    private static FrameMarks markedFrame(List<FrameMarks> frames, String number) {
        for (FrameMarks frame : frames)
            if (frame.frame.equals(number.trim()))
                return frame;
        throw new AssertionError("no frame numbered " + number);
    }

    /** A column of Pins reaches the glue as text; Pins itself is read here. */
    private static List<Pins> asPins(List<PinsString> cells) {
        List<Pins> out = new ArrayList<>();
        for (PinsString cell : cells)
            out.add(new Pins(cell.value));
        return out;
    }

    /** Honours the ?DNC? marker the generated *String classes use. */
    private static void assertField(String what, String expected, String actual) {
        if (DNCString.equals(expected))
            return;
        assertEquals(expected.trim(), actual.trim(), what);
    }
}
