package production;

import java.util.ArrayList;
import java.util.List;

/**
 * A game of ten-pin bowling: the rolls made so far, the scoresheet they produce,
 * and what the next roll is allowed to be.
 *
 * All the scoring lives here rather than in the test glue. The glue's job is to
 * hand rolls in and read values out.
 */
public class BowlingGame {
    private static final int FRAMES = 10;

    private final List<Integer> rolls = new ArrayList<>();

    /**
     * True when the game was seeded with the tenth frame's rolls alone, so the
     * tenth frame can be examined without bowling the nine before it. The earlier
     * frames then have no rolls, which is why their scores — and every running
     * total — stay TBS.
     */
    private boolean tenthFrameOnly = false;

    public List<Integer> rolls() {
        return new ArrayList<>(rolls);
    }

    /** Replaces the rolls outright. Setup, not play — no validation. */
    public void setRolls(List<Integer> pinCounts) {
        rolls.clear();
        rolls.addAll(pinCounts);
        tenthFrameOnly = false;
    }

    /** Seeds only the tenth frame; frames 1..9 are left unbowled. */
    public void setTenthFrameRolls(List<Integer> pinCounts) {
        rolls.clear();
        rolls.addAll(pinCounts);
        tenthFrameOnly = true;
    }

    /**
     * Bowls one roll. Returns false and changes nothing when the roll is
     * impossible — more pins than are standing, or a game already over.
     */
    public boolean addRoll(int pinCount) {
        if (pinCount < 0 || pinCount > Pins.MAX)
            return false;
        if (isComplete())
            return false;
        if (pinCount > inputControl().remaining)
            return false;
        rolls.add(pinCount);
        return true;
    }

    /**
     * Recomputes the scoresheet. Scoring is derived on demand, so this exists to
     * give the specification's "When scored" step something real to drive.
     */
    public void score() {
        frames();
    }

    // ---- scoresheet ---------------------------------------------------------

    public List<Frame> frames() {
        List<Frame> result = new ArrayList<>();
        int[] starts = frameStarts();
        int running = 0;
        boolean runningKnown = true;

        for (int f = 1; f <= FRAMES; f++) {
            int start = starts[f];
            Pins roll1 = pinsAt(start);
            Pins roll2 = pinsAt(start + 1);
            Pins roll3 = pinsAt(start + 2);

            boolean strike = roll1.isStrike();
            boolean spare = !strike
                         && roll1.isRolled() && roll2.isRolled()
                         && roll1.count() + roll2.count() == Pins.MAX;

            // A strike or a spare is only worth what the following rolls make it,
            // so it needs three rolls before it can be scored at all.
            int needed = (strike || spare) ? 3 : 2;
            boolean scorable = allRolled(start, needed);

            Score score = Score.TBS;
            Score total = Score.TBS;
            if (scorable) {
                int points = roll1.count() + roll2.count()
                           + (needed == 3 ? roll3.count() : 0);
                score = new Score(points);
                if (runningKnown) {
                    running += points;
                    total = new Score(running);
                }
            } else {
                // Once one frame cannot be scored, no later total can be either.
                runningKnown = false;
            }
            result.add(new Frame(f, roll1, roll2, roll3, score, total));
        }
        return result;
    }

    public List<FrameMarks> marks() {
        List<FrameMarks> result = new ArrayList<>();
        for (Frame frame : frames()) {
            String mark1 = "";
            String mark2 = "";
            String mark3 = "";

            if (frame.roll1.isRolled())
                mark1 = frame.roll1.isStrike() ? "X" : digit(frame.roll1);

            if (frame.number < FRAMES) {
                // Frames 1..9 show only their own two rolls; after a strike there
                // is no second mark, even though Roll2 holds the next frame's roll.
                if (!frame.roll1.isStrike() && frame.roll1.isRolled() && frame.roll2.isRolled())
                    mark2 = frame.roll1.count() + frame.roll2.count() == Pins.MAX
                          ? "/" : digit(frame.roll2);
            } else {
                if (frame.roll2.isRolled()) {
                    if (frame.roll1.isStrike())
                        mark2 = frame.roll2.isStrike() ? "X" : digit(frame.roll2);
                    else
                        mark2 = frame.roll1.count() + frame.roll2.count() == Pins.MAX
                              ? "/" : digit(frame.roll2);
                }
                if (frame.roll3.isRolled()) {
                    boolean spareOnBonus = frame.roll1.isStrike()
                                        && !frame.roll2.isStrike()
                                        && frame.roll2.count() + frame.roll3.count() == Pins.MAX;
                    mark3 = spareOnBonus ? "/"
                          : frame.roll3.isStrike() ? "X" : digit(frame.roll3);
                }
            }

            String total = frame.totalScore.isComputable() ? frame.totalScore.toString() : "";
            result.add(new FrameMarks(String.valueOf(frame.number), mark1, mark2, mark3, total));
        }
        return result;
    }

    /**
     * The scoresheet as two rows: marks above, running totals below.
     *
     * Each frame's column is as wide as the wider of its two cells, so a frame
     * whose total reaches three digits widens both rows together and the columns
     * stay aligned under each other.
     */
    public String display() {
        List<FrameMarks> frames = marks();
        StringBuilder top = new StringBuilder();
        StringBuilder bottom = new StringBuilder();
        for (FrameMarks frame : frames) {
            int width = Math.max(frame.marks().length(), frame.totalScore.length());
            top.append("| ").append(padRight(frame.marks(), width)).append(' ');
            bottom.append("| ").append(padRight(frame.totalScore, width)).append(' ');
        }
        top.append('|');
        bottom.append('|');
        return top + "\n" + bottom + "\n";
    }

    // ---- state --------------------------------------------------------------

    /** True once the tenth frame has had every roll it is entitled to. */
    public boolean isComplete() {
        int start = frameStarts()[FRAMES];
        Pins roll1 = pinsAt(start);
        Pins roll2 = pinsAt(start + 1);
        if (!roll1.isRolled() || !roll2.isRolled())
            return false;
        boolean strike = roll1.isStrike();
        boolean spare = !strike && roll1.count() + roll2.count() == Pins.MAX;
        return (strike || spare) ? pinsAt(start + 2).isRolled() : true;
    }

    /** Which frame and roll the next ball belongs to, and how many pins stand. */
    public InputControl inputControl() {
        int[] starts = frameStarts();

        for (int f = 1; f < FRAMES; f++) {
            int start = starts[f];
            Pins roll1 = pinsAt(start);
            if (!roll1.isRolled())
                return new InputControl(f, 1, Pins.MAX);
            if (roll1.isStrike())
                continue;                       // one roll ends the frame
            if (!pinsAt(start + 1).isRolled())
                return new InputControl(f, 2, Pins.MAX - roll1.count());
        }

        int start = starts[FRAMES];
        Pins roll1 = pinsAt(start);
        Pins roll2 = pinsAt(start + 1);
        if (!roll1.isRolled())
            return new InputControl(FRAMES, 1, Pins.MAX);
        if (!roll2.isRolled())
            return new InputControl(FRAMES, 2,
                    roll1.isStrike() ? Pins.MAX : Pins.MAX - roll1.count());

        // Third roll of the tenth. After two strikes the rack is full again;
        // after a strike then a non-strike, only what that ball left standing;
        // after a spare, a fresh rack.
        int remaining;
        if (roll1.isStrike())
            remaining = roll2.isStrike() ? Pins.MAX : Pins.MAX - roll2.count();
        else
            remaining = Pins.MAX;
        return new InputControl(FRAMES, 3, remaining);
    }

    // ---- helpers ------------------------------------------------------------

    /**
     * Index of each frame's first roll. A strike ends a frame in one roll, so the
     * next frame starts one later rather than two.
     */
    private int[] frameStarts() {
        int[] starts = new int[FRAMES + 1];
        if (tenthFrameOnly) {
            // Frames 1..9 are unbowled: point them past every roll so each one
            // reads back as TBR.
            for (int f = 1; f < FRAMES; f++)
                starts[f] = rolls.size() + FRAMES * 2;
            starts[FRAMES] = 0;
            return starts;
        }
        int index = 0;
        for (int f = 1; f < FRAMES; f++) {
            starts[f] = index;
            index += (index < rolls.size() && rolls.get(index) == Pins.MAX) ? 1 : 2;
        }
        starts[FRAMES] = index;
        return starts;
    }

    private Pins pinsAt(int index) {
        if (index < 0 || index >= rolls.size())
            return Pins.TBR;
        return new Pins(rolls.get(index));
    }

    private boolean allRolled(int start, int count) {
        for (int i = 0; i < count; i++)
            if (!pinsAt(start + i).isRolled())
                return false;
        return true;
    }

    /** A gutter ball is written as a dash, not a zero. */
    private static String digit(Pins pins) {
        return pins.count() == 0 ? "-" : String.valueOf(pins.count());
    }

    private static String padRight(String text, int width) {
        StringBuilder b = new StringBuilder(text);
        while (b.length() < width) b.append(' ');
        return b.toString();
    }
}
