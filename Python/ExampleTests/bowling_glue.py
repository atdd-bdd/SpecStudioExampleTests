"""Drives BowlingGame from the specification's steps.

There is no scoring here on purpose: every rule about strikes, spares, marks and
totals lives in the production classes, and this file only hands rolls in and
compares what comes back.
"""
from common import *
from production.BowlingGame import BowlingGame
from production.Pins import Pins
from production.Score import Score

DNC_STRING = '?DNC?'


class BowlingGlue:
    DNC_STRING = DNC_STRING

    def __init__(self):
        self.game = BowlingGame()

    # ---- given -----------------------------------------------------------

    def given_rolls_are(self, values: list):
        self.game.set_rolls(self._pin_counts(values))

    def given_rolls_for_tenth_frame_are(self, values: list):
        self.game.set_tenth_frame_rolls(self._pin_counts(values))

    def given_frame_values_are_as_previous(self):
        """The frame values from the previous step are still on the same game."""
        assert self.game.frames() is not None, 'no game to carry forward'

    # ---- when ------------------------------------------------------------

    def when_roll_is(self, values: list):
        for pin_count in self._pin_counts(values):
            self.game.add_roll(pin_count)

    def when_scored(self):
        self.game.score()

    # ---- then ------------------------------------------------------------

    def then_rolls_become(self, values: list):
        expected = self._pin_counts(values)
        actual = self.game.rolls()

        assert len(expected) == len(actual), 'number of rolls %s' % actual
        for i, want in enumerate(expected):
            assert want == actual[i], 'roll %d' % (i + 1)

    def then_display_is(self, value: str):
        assert self.game.display() == value, 'display'

    def then_frame_values_are(self, values: list):
        for expected in values:
            self._assert_frame_equals(expected)

    def then_then_tenth_frame_values_are(self, values: list):
        """The step reads "Then Then tenth frame values are" in the
        specification, and the generated method name follows it. Renaming the
        method would only make it disagree with the generated test.
        """
        for expected in values:
            self._assert_frame_equals(expected)

    def then_display_values_are(self, values: list):
        actual = self.game.marks()
        for expected in values:
            frame = self._marked_frame(actual, expected.frame)
            where = 'frame %s ' % expected.frame
            self._assert_field(where + 'Mark1', expected.mark1, frame.mark1)
            self._assert_field(where + 'Mark2', expected.mark2, frame.mark2)
            self._assert_field(where + 'Mark3', expected.mark3, frame.mark3)
            self._assert_field(where + 'TotalScore', expected.total_score, frame.total_score)

    def then_game_complete_is(self, values: list):
        for row in values:
            for expected in row:
                assert expected.strip() == str(self.game.is_complete()).lower(), \
                    'game complete'

    def then_input_control_is(self, values: list):
        for expected in values:
            actual = self.game.input_control()
            self._assert_field('input control Frame', expected.frame, str(actual.frame))
            self._assert_field('input control Roll', expected.roll, str(actual.roll))
            self._assert_field('input control Remaining', expected.remaining,
                               str(actual.remaining))

    # ---- DataType checks -------------------------------------------------

    def examples_DataType_Pins(self, values: list):
        for value in values:
            error = False
            try:
                Pins(value.value)
            except ValueError:
                error = True
            assert self._is_true(value.is_valid) == (not error), ' Value ' + value.value

    def examples_DataType_Score(self, values: list):
        for value in values:
            error = False
            try:
                Score(value.value)
            except ValueError:
                error = True
            assert self._is_true(value.is_valid) == (not error), ' Value ' + value.value

    # ---- helpers ---------------------------------------------------------

    @staticmethod
    def _pin_counts(values: list) -> list:
        """Flattens the step's table into the pin counts it lists, in order."""
        result = []
        for row in values:
            for cell in row:
                if cell.strip():
                    result.append(int(cell.strip()))
        return result

    def _assert_frame_equals(self, expected):
        frame = self._numbered_frame(expected.frame)
        where = 'frame %s ' % expected.frame
        self._assert_field(where + 'Roll1', expected.roll1, str(frame.roll1))
        self._assert_field(where + 'Roll2', expected.roll2, str(frame.roll2))
        self._assert_field(where + 'Roll3', expected.roll3, str(frame.roll3))
        self._assert_field(where + 'Score', expected.score, str(frame.score))
        self._assert_field(where + 'TotalScore', expected.total_score, str(frame.total_score))

    def _numbered_frame(self, number: str):
        for frame in self.game.frames():
            if str(frame.number) == number.strip():
                return frame
        raise AssertionError('no frame numbered ' + number)

    @staticmethod
    def _marked_frame(frames: list, number: str):
        for frame in frames:
            if frame.frame == number.strip():
                return frame
        raise AssertionError('no frame numbered ' + number)

    @staticmethod
    def _assert_field(what: str, expected: str, actual: str):
        """Honours the ?DNC? marker the generated *String classes use."""
        if expected == DNC_STRING:
            return
        assert expected.strip() == actual.strip(), \
            '%s: expected %r but was %r' % (what, expected.strip(), actual.strip())

    @staticmethod
    def _is_true(text: str) -> bool:
        return text.strip().lower() in ('yes', 'true', 'y', '1')
