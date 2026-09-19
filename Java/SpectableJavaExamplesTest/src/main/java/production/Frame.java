package production;

/**
 * One frame's rolls as the scoresheet shows them, plus its score.
 *
 * Roll1..Roll3 are the three rolls starting at this frame's first roll — not
 * only the rolls bowled in this frame. After a strike, Roll2 and Roll3 are the
 * next frame's rolls, because those are what score this one. The spec's
 * FrameValues table is written that way: frame 4 is a strike and still lists
 * Roll2 and Roll3 as the two rolls that follow it.
 */
public class Frame {
    public final int number;
    public final Pins roll1;
    public final Pins roll2;
    public final Pins roll3;
    public final Score score;
    public final Score totalScore;

    public Frame(int number, Pins roll1, Pins roll2, Pins roll3, Score score, Score totalScore) {
        this.number = number;
        this.roll1 = roll1;
        this.roll2 = roll2;
        this.roll3 = roll3;
        this.score = score;
        this.totalScore = totalScore;
    }

    public boolean isStrike() {
        return roll1.isStrike();
    }

    /** A spare only counts when it is not already a strike. */
    public boolean isSpare() {
        return !isStrike()
            && roll1.isRolled() && roll2.isRolled()
            && roll1.count() + roll2.count() == Pins.MAX;
    }
}
