"""The text form of an Entity.

Its attribute values as space separated tokens, in the order the attributes
are declared. A value containing a space is wrapped in double quotes; a nested
Entity's own text form is wrapped in single quotes. A run of spaces separates
one token from the next exactly as a single space does.
"""


def split(text):
    out = []
    if text is None:
        return out
    n, i = len(text), 0
    while i < n:
        while i < n and text[i].isspace():
            i += 1
        if i >= n:
            break
        c = text[i]
        if c in ('"', "'"):
            close = _closing_quote(text, i, c)
            out.append(text[i + 1:close])
            i = close + 1
        else:
            j = i
            while j < n and not text[j].isspace():
                j += 1
            out.append(text[i:j])
            i = j
    return out


def _closing_quote(text, open_at, quote):
    # The closing quote is the next one of the same kind followed by whitespace
    # or the end of the text, which is what lets a nested Entity, itself single
    # quoted, sit inside a single quoted value.
    for j in range(open_at + 1, len(text)):
        if text[j] != quote:
            continue
        if j + 1 == len(text) or text[j + 1].isspace():
            return j
    raise ValueError('No closing %s in: %s' % (quote, text))


def token(value):
    if not value:
        return '\"\"'
    if any(ch.isspace() for ch in value):
        return '\"' + value + '\"'
    return value


def nested(text):
    return "'" + ('' if text is None else text) + "'"


def require(text, expected, type_name):
    parts = split(text)
    if len(parts) != expected:
        raise ValueError('%s takes %d values but got %d: %s'
                         % (type_name, expected, len(parts), text))
    return parts
