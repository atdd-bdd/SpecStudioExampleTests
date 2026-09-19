package production;

/**
 * How one frame is written on a scoresheet: X for a strike, / for a spare,
 * - for a gutter ball, blank for a roll not yet made.
 *
 * Mark3 is only ever filled on the tenth frame, the only frame that can have a
 * third roll of its own.
 */
public class FrameMarks {
    public final String frame;
    public final String mark1;
    public final String mark2;
    public final String mark3;
    public final String totalScore;

    public FrameMarks(String frame, String mark1, String mark2, String mark3, String totalScore) {
        this.frame = frame;
        this.mark1 = mark1;
        this.mark2 = mark2;
        this.mark3 = mark3;
        this.totalScore = totalScore;
    }

    /** The mark columns joined, as they appear in the top row of the display. */
    public String marks() {
        return mark1 + mark2 + mark3;
    }
}
