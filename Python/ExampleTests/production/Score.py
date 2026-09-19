class Score:
    """A frame score or running total, or -1 (TBS) while the rolls it depends on have not
    all been made.

    The spec's ValidValues table bounds it at 0..300 -- 300 being a perfect game
    -- and rejects 301; -1 is valid only because the spec defines TBS as -1:
    a frame ending in a strike or a spare cannot be scored until its bonus
    rolls exist, and "not yet computable" is a normal state rather than an error.
    """

    TBS_VALUE = -1   # the integer the spec defines TBS as
    MIN = 0
    MAX = 300

    def __init__(self, value):
        """From the text form a table cell holds, or from a total."""
        points = int(str(value).strip())
        if points != self.TBS_VALUE and (points < self.MIN or points > self.MAX):
            raise ValueError('Score must be between %d and %d, got %d'
                             % (self.MIN, self.MAX, points))
        self.value = points

    def is_computable(self) -> bool:
        return self.value != self.TBS_VALUE

    def points(self) -> int:
        """Points, or -1 when not yet computable."""
        return self.value

    def __eq__(self, other):
        return isinstance(other, Score) and self.value == other.value

    def __hash__(self):
        return hash(self.value)

    def __str__(self):
        """The text form: what a table cell holds."""
        return str(self.value)


Score.TBS = Score(Score.TBS_VALUE)
