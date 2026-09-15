from . import json_util as _json
from .discount_input_string import DiscountInputString

class DiscountInputTyped:
    def __init__(self, total_price: str = '', discount: str = '', notes: str = ''):
        self.total_price = total_price
        self.discount = discount
        self.notes = notes

    @classmethod
    def from_string_obj(cls, s: DiscountInputString) -> 'DiscountInputTyped':
        return cls(
            s.total_price,
            s.discount,
            s.notes
        )

    def to_string_obj(self) -> DiscountInputString:
        return DiscountInputString(
            str(self.total_price),
            str(self.discount),
            str(self.notes)
        )

    @staticmethod
    def to_string_list(items) -> list:
        return [t.to_string_obj() for t in items]

    @staticmethod
    def from_string_list(items) -> list:
        return [DiscountInputTyped.from_string_obj(s) for s in items]

    def to_json_value(self) -> dict:
        return {
            'Total Price': self.total_price,
            'Discount': self.discount,
            'Notes': self.notes,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'DiscountInputTyped':
        return cls(
            _json.as_str(_json.require(m, 'Total Price'), 'Total Price'),
            _json.as_str(_json.require(m, 'Discount'), 'Discount'),
            _json.as_str(_json.require(m, 'Notes'), 'Notes')
        )

    @classmethod
    def from_json(cls, text: str) -> 'DiscountInputTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'DiscountInputTyped')
        return [cls.from_json_value(e) for e in raw]

    def __str__(self):
        return (f'Total Price={self.total_price}' + ', ' +
                f'Discount={self.discount}' + ', ' +
                f'Notes={self.notes}')

    def _key(self):
        return (self.total_price, self.discount, self.notes)

    def __eq__(self, other):
        if not isinstance(other, DiscountInputTyped):
            return NotImplemented
        return self._key() == other._key()

    def __hash__(self):
        return hash(self._key())

    def __repr__(self):
        return f'DiscountInputTyped({self})'
