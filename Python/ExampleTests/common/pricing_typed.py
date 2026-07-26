from . import json_util as _json
from .pricing_string import PricingString

class PricingTyped:
    def __init__(self, total_price: str = ''):
        self.total_price = total_price

    @classmethod
    def from_string_obj(cls, s: PricingString) -> 'PricingTyped':
        return cls(
            s.total_price
        )

    def to_json_value(self) -> dict:
        return {
            'total_price': self.total_price,
        }

    def to_json(self) -> str:
        return _json.dumps(self.to_json_value())

    @classmethod
    def from_json_value(cls, m: dict) -> 'PricingTyped':
        return cls(
            _json.as_str(_json.require(m, 'total_price'), 'total_price')
        )

    @classmethod
    def from_json(cls, text: str) -> 'PricingTyped':
        return cls.from_json_value(_json.loads(text))

    @staticmethod
    def to_json_list(items) -> str:
        return _json.dumps([item.to_json_value() for item in items])

    @classmethod
    def from_json_list(cls, text: str) -> list:
        raw = _json.as_list(_json.loads(text), 'PricingTyped')
        return [cls.from_json_value(e) for e in raw]
