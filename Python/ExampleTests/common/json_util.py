"""Field accessors layered over the standard-library json module.

A missing key or a value of the wrong type raises ValueError.  An explicit
JSON null is passed through as None rather than treated as an error.
"""

import decimal
import json


def loads(text):
    """Parse JSON text, keeping numbers exact (floats become Decimal)."""
    try:
        return json.loads(text, parse_float=decimal.Decimal)
    except json.JSONDecodeError as exc:
        raise ValueError("Invalid JSON: %s" % exc) from exc


def dumps(value):
    """Serialize a value graph.  Decimal is written as a string so no
    precision is lost; the readers here and in the other generated languages
    accept a number or a string for decimal fields."""
    return json.dumps(value, default=_fallback)


def _fallback(obj):
    if isinstance(obj, decimal.Decimal):
        return str(obj)
    raise TypeError("Cannot serialize %r to JSON" % type(obj).__name__)


def _describe(value):
    if value is None:                 return "null"
    if isinstance(value, bool):       return "a boolean"
    if isinstance(value, (int, float, decimal.Decimal)): return "a number"
    if isinstance(value, str):        return "a string"
    if isinstance(value, list):       return "an array"
    if isinstance(value, dict):       return "an object"
    return type(value).__name__


def _type_error(ctx, expected, value):
    return ValueError("JSON field '%s' is not %s (got %s)" % (ctx, expected, _describe(value)))


def require(obj, key):
    if not isinstance(obj, dict):
        raise ValueError("Expected an object holding field '%s'" % key)
    if key not in obj:
        raise ValueError("Missing JSON field '%s'" % key)
    return obj[key]


def as_str(value, ctx):
    if value is None:                 return None
    if isinstance(value, str):        return value
    if isinstance(value, bool):       return "true" if value else "false"
    if isinstance(value, (int, float, decimal.Decimal)): return str(value)
    raise _type_error(ctx, "a string", value)


def as_decimal(value, ctx):
    if isinstance(value, bool):
        raise _type_error(ctx, "a number", value)
    if isinstance(value, decimal.Decimal):
        return value
    if isinstance(value, (int, float)):
        return decimal.Decimal(str(value))
    if isinstance(value, str):
        try:
            return decimal.Decimal(value.strip())
        except decimal.InvalidOperation:
            raise _type_error(ctx, "a number", value) from None
    raise _type_error(ctx, "a number", value)


def as_int(value, ctx):
    d = as_decimal(value, ctx)
    if d != d.to_integral_value():
        raise _type_error(ctx, "an integer", value)
    return int(d)


def as_float(value, ctx):
    return float(as_decimal(value, ctx))


def as_bool(value, ctx):
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        low = value.strip().lower()
        if low in ("true", "t", "yes", "y", "1"):  return True
        if low in ("false", "f", "no", "n", "0"):  return False
    raise _type_error(ctx, "a boolean", value)


def as_list(value, ctx):
    if value is None:               return None
    if isinstance(value, list):     return value
    raise _type_error(ctx, "an array", value)
