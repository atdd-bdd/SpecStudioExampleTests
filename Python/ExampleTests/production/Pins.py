class Pins:
    """The number of pins knocked down by one roll, or -1 (TBR) when the roll has not
    happened yet.

    The spec's ValidValues table is the contract: 0 and 10 are valid, 11 and -2
    are not, and -1 -- the spec's =TBR -- is valid because a scoresheet shows rolls that
    are still to come. The generated DataType test builds a Pins from each row
    and expects a ValueError for exactly the invalid ones, so a number out of
    range has to fail the same way an unparseable one does.
    """

    TBR_VALUE = -1   # the integer the spec defines TBR as
    MAX = 10

    def __init__(self, value):
        """From the text form a table cell holds, or from a count."""
        # int() raises ValueError on anything non-numeric.
        count = int(str(value).strip())
        if count != self.TBR_VALUE and (count < 0 or count > self.MAX):
            raise ValueError('Roll must be between 0 and %d, got %d' % (self.MAX, count))
        self.value = count

    def is_rolled(self) -> bool:
        """False when this is TBR -- the roll has not been made."""
        return self.value != self.TBR_VALUE

    def count(self) -> int:
        """Pin count, or -1 when the roll has not been made."""
        return self.value

    def is_strike(self) -> bool:
        return self.is_rolled() and self.value == self.MAX

    def __eq__(self, other):
        return isinstance(other, Pins) and self.value == other.value

    def __hash__(self):
        return hash(self.value)

    def __str__(self):
        """The text form: what a table cell holds."""
        return str(self.value)


Pins.TBR = Pins(Pins.TBR_VALUE)
