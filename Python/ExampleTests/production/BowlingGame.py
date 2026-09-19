from production.Pins import Pins
from production.Score import Score


class Frame:
    """One frame's rolls as the scoresheet shows them, plus its score.

    roll1..roll3 are the three rolls starting at this frame's first roll -- not
    only the rolls bowled in this frame. After a strike, roll2 and roll3 are the
    next frame's rolls, because those are what score this one. The spec's
    FrameValues table is written that way: frame 4 is a strike and still lists
    Roll2 and Roll3 as the two rolls that follow it.
    """

    def __init__(self, number, roll1, roll2, roll3, score, total_score):
        self.number = number
        self.roll1 = roll1
        self.roll2 = roll2
        self.roll3 = roll3
        self.score = score
        self.total_score = total_score

    def is_strike(self) -> bool:
        return self.roll1.is_strike()

    def is_spare(self) -> bool:
        """A spare only counts when it is not already a strike."""
        return (not self.is_strike()
                and self.roll1.is_rolled() and self.roll2.is_rolled()
                and self.roll1.count() + self.roll2.count() == Pins.MAX)


class FrameMarks:
    """How one frame is written on a scoresheet: X for a strike, / for a spare,
    - for a gutter ball, blank for a roll not yet made.

    mark3 is only ever filled on the tenth frame, the only frame that can have a
    third roll of its own.
    """

    def __init__(self, frame, mark1, mark2, mark3, total_score):
        self.frame = frame
        self.mark1 = mark1
        self.mark2 = mark2
        self.mark3 = mark3
        self.total_score = total_score

    def marks(self) -> str:
        """The mark columns joined, as they appear in the top row of the display."""
        return self.mark1 + self.mark2 + self.mark3


class InputControl:
    """Where the next roll goes, and how many pins are standing for it -- what a
    keypad needs in order to disable the buttons that cannot be pressed.
    """

    def __init__(self, frame, roll, remaining):
        self.frame = frame
        self.roll = roll
        self.remaining = remaining


class BowlingGame:
    """A game of ten-pin bowling: the rolls made so far, the scoresheet they
    produce, and what the next roll is allowed to be.

    All the scoring lives here rather than in the test glue. The glue's job is to
    hand rolls in and read values out.
    """

    FRAMES = 10

    def __init__(self):
        self._rolls = []
        # True when the game was seeded with the tenth frame's rolls alone, so
        # the tenth frame can be examined without bowling the nine before it.
        # The earlier frames then have no rolls, which is why their scores --
        # and every running total -- stay TBS.
        self._tenth_frame_only = False

    def rolls(self) -> list:
        return list(self._rolls)

    def set_rolls(self, pin_counts):
        """Replaces the rolls outright. Setup, not play -- no validation."""
        self._rolls = list(pin_counts)
        self._tenth_frame_only = False

    def set_tenth_frame_rolls(self, pin_counts):
        """Seeds only the tenth frame; frames 1..9 are left unbowled."""
        self._rolls = list(pin_counts)
        self._tenth_frame_only = True

    def add_roll(self, pin_count: int) -> bool:
        """Bowls one roll. Returns False and changes nothing when the roll is
        impossible -- more pins than are standing, or a game already over.
        """
        if pin_count < 0 or pin_count > Pins.MAX:
            return False
        if self.is_complete():
            return False
        if pin_count > self.input_control().remaining:
            return False
        self._rolls.append(pin_count)
        return True

    def score(self):
        """Recomputes the scoresheet. Scoring is derived on demand, so this
        exists to give the specification's "When scored" step something real to
        drive.
        """
        self.frames()

    # ---- scoresheet ------------------------------------------------------

    def frames(self) -> list:
        result = []
        starts = self._frame_starts()
        running = 0
        running_known = True

        for f in range(1, self.FRAMES + 1):
            start = starts[f]
            roll1 = self._pins_at(start)
            roll2 = self._pins_at(start + 1)
            roll3 = self._pins_at(start + 2)

            strike = roll1.is_strike()
            spare = (not strike
                     and roll1.is_rolled() and roll2.is_rolled()
                     and roll1.count() + roll2.count() == Pins.MAX)

            # A strike or a spare is only worth what the following rolls make
            # it, so it needs three rolls before it can be scored at all.
            needed = 3 if (strike or spare) else 2
            scorable = self._all_rolled(start, needed)

            score = Score.TBS
            total = Score.TBS
            if scorable:
                points = roll1.count() + roll2.count() + (roll3.count() if needed == 3 else 0)
                score = Score(points)
                if running_known:
                    running += points
                    total = Score(running)
            else:
                # Once one frame cannot be scored, no later total can be either.
                running_known = False

            result.append(Frame(f, roll1, roll2, roll3, score, total))
        return result

    def marks(self) -> list:
        result = []
        for frame in self.frames():
            mark1 = mark2 = mark3 = ''

            if frame.roll1.is_rolled():
                mark1 = 'X' if frame.roll1.is_strike() else self._digit(frame.roll1)

            if frame.number < self.FRAMES:
                # Frames 1..9 show only their own two rolls; after a strike there
                # is no second mark, even though roll2 holds the next frame's roll.
                if (not frame.roll1.is_strike()
                        and frame.roll1.is_rolled() and frame.roll2.is_rolled()):
                    mark2 = ('/' if frame.roll1.count() + frame.roll2.count() == Pins.MAX
                             else self._digit(frame.roll2))
            else:
                if frame.roll2.is_rolled():
                    if frame.roll1.is_strike():
                        mark2 = 'X' if frame.roll2.is_strike() else self._digit(frame.roll2)
                    else:
                        mark2 = ('/' if frame.roll1.count() + frame.roll2.count() == Pins.MAX
                                 else self._digit(frame.roll2))
                if frame.roll3.is_rolled():
                    spare_on_bonus = (frame.roll1.is_strike()
                                      and not frame.roll2.is_strike()
                                      and frame.roll2.count() + frame.roll3.count() == Pins.MAX)
                    if spare_on_bonus:
                        mark3 = '/'
                    else:
                        mark3 = 'X' if frame.roll3.is_strike() else self._digit(frame.roll3)

            total = str(frame.total_score) if frame.total_score.is_computable() else ''
            result.append(FrameMarks(str(frame.number), mark1, mark2, mark3, total))
        return result

    def display(self) -> str:
        """The scoresheet as two rows: marks above, running totals below.

        Each frame's column is as wide as the wider of its two cells, so a frame
        whose total reaches three digits widens both rows together and the
        columns stay aligned under each other.

        Two rows, no trailing newline: that is what the docstring in the
        specification holds, and it is compared as text.
        """
        top, bottom = [], []
        for frame in self.marks():
            width = max(len(frame.marks()), len(frame.total_score))
            top.append('| ' + frame.marks().ljust(width) + ' ')
            bottom.append('| ' + frame.total_score.ljust(width) + ' ')
        return ''.join(top) + '|\n' + ''.join(bottom) + '|'

    # ---- state -----------------------------------------------------------

    def is_complete(self) -> bool:
        """True once the tenth frame has had every roll it is entitled to."""
        start = self._frame_starts()[self.FRAMES]
        roll1 = self._pins_at(start)
        roll2 = self._pins_at(start + 1)
        if not roll1.is_rolled() or not roll2.is_rolled():
            return False

        strike = roll1.is_strike()
        spare = not strike and roll1.count() + roll2.count() == Pins.MAX
        return self._pins_at(start + 2).is_rolled() if (strike or spare) else True

    def input_control(self) -> InputControl:
        """Which frame and roll the next ball belongs to, and how many pins stand."""
        starts = self._frame_starts()

        for f in range(1, self.FRAMES):
            start = starts[f]
            roll1 = self._pins_at(start)
            if not roll1.is_rolled():
                return InputControl(f, 1, Pins.MAX)
            if roll1.is_strike():
                continue                        # one roll ends the frame
            if not self._pins_at(start + 1).is_rolled():
                return InputControl(f, 2, Pins.MAX - roll1.count())

        start = starts[self.FRAMES]
        roll1 = self._pins_at(start)
        roll2 = self._pins_at(start + 1)
        if not roll1.is_rolled():
            return InputControl(self.FRAMES, 1, Pins.MAX)
        if not roll2.is_rolled():
            return InputControl(self.FRAMES, 2,
                                Pins.MAX if roll1.is_strike() else Pins.MAX - roll1.count())

        # Third roll of the tenth. After two strikes the rack is full again;
        # after a strike then a non-strike, only what that ball left standing;
        # after a spare, a fresh rack.
        if roll1.is_strike():
            remaining = Pins.MAX if roll2.is_strike() else Pins.MAX - roll2.count()
        else:
            remaining = Pins.MAX
        return InputControl(self.FRAMES, 3, remaining)

    # ---- helpers ---------------------------------------------------------

    def _frame_starts(self) -> list:
        """Index of each frame's first roll. A strike ends a frame in one roll,
        so the next frame starts one later rather than two.
        """
        starts = [0] * (self.FRAMES + 1)
        if self._tenth_frame_only:
            # Frames 1..9 are unbowled: point them past every roll so each one
            # reads back as TBR.
            for f in range(1, self.FRAMES):
                starts[f] = len(self._rolls) + self.FRAMES * 2
            starts[self.FRAMES] = 0
            return starts

        index = 0
        for f in range(1, self.FRAMES):
            starts[f] = index
            index += 1 if (index < len(self._rolls) and self._rolls[index] == Pins.MAX) else 2
        starts[self.FRAMES] = index
        return starts

    def _pins_at(self, index: int) -> Pins:
        if index < 0 or index >= len(self._rolls):
            return Pins.TBR
        return Pins(self._rolls[index])

    def _all_rolled(self, start: int, count: int) -> bool:
        return all(self._pins_at(start + i).is_rolled() for i in range(count))

    @staticmethod
    def _digit(pins: Pins) -> str:
        """A gutter ball is written as a dash, not a zero."""
        return '-' if pins.count() == 0 else str(pins.count())
