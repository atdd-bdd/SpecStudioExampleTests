package production;

/**
 * Where the next roll goes, and how many pins are standing for it — what a
 * keypad needs in order to disable the buttons that cannot be pressed.
 */
public class InputControl {
    public final int frame;
    public final int roll;
    public final int remaining;

    public InputControl(int frame, int roll, int remaining) {
        this.frame = frame;
        this.roll = roll;
        this.remaining = remaining;
    }
}
