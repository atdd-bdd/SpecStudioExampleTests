"""The compact JSON-like text used by the Json specification: names are not
quoted, values are, and whitespace between tokens is insignificant.

    {anInt:"1",aString:"B"}
    [{anInt:"1",aString:"B"},{anInt:"2",aString:"C"}]

Field order is preserved, so a canonical form can be compared directly.
"""


class _Cursor:
    def __init__(self, text: str):
        self.text = text if text is not None else ''
        self.i = 0

    def at_end(self) -> bool:
        return self.i >= len(self.text)

    def peek(self) -> str:
        return '' if self.at_end() else self.text[self.i]

    def next(self) -> str:
        if self.at_end():
            return ''
        ch = self.text[self.i]
        self.i += 1
        return ch

    def skip_whitespace(self):
        while not self.at_end() and self.text[self.i].isspace():
            self.i += 1

    def expect(self, expected: str):
        self.skip_whitespace()
        if self.next() != expected:
            raise ValueError(f"Expected '{expected}' at {self.i}")


class SimpleJson:

    # -----------------------------------------------------------------
    # Writing
    # -----------------------------------------------------------------

    @staticmethod
    def to_object(fields: dict) -> str:
        parts = []
        for name, value in fields.items():
            parts.append(f'{name}:{SimpleJson._quoted(value)}')
        return '{' + ','.join(parts) + '}'

    @staticmethod
    def to_array(rows) -> str:
        return '[' + ','.join(SimpleJson.to_object(row) for row in rows) + ']'

    @staticmethod
    def _quoted(value) -> str:
        out = ['"']
        if value is not None:
            for c in str(value):
                if c in ('"', '\\'):
                    out.append('\\')
                out.append(c)
        out.append('"')
        return ''.join(out)

    # -----------------------------------------------------------------
    # Reading
    # -----------------------------------------------------------------

    @staticmethod
    def parse_object(text: str) -> dict:
        c = _Cursor(text)
        fields = SimpleJson._read_object(c)
        c.skip_whitespace()
        if not c.at_end():
            raise ValueError(f'Unexpected text after object at {c.i}')
        return fields

    @staticmethod
    def parse_array(text: str) -> list:
        c = _Cursor(text)
        c.skip_whitespace()
        c.expect('[')
        rows = []
        c.skip_whitespace()
        if c.peek() == ']':
            c.next()
        else:
            while True:
                rows.append(SimpleJson._read_object(c))
                c.skip_whitespace()
                d = c.next()
                if d == ',':
                    continue
                if d == ']':
                    break
                raise ValueError(f"Expected ',' or ']' at {c.i}")
        c.skip_whitespace()
        if not c.at_end():
            raise ValueError(f'Unexpected text after array at {c.i}')
        return rows

    @staticmethod
    def without_whitespace(text: str) -> str:
        """Remove whitespace that sits between tokens, leaving a plain string
        that can be compared to another one directly. Whitespace inside a
        quoted value is part of the value and is kept."""
        if text is None:
            return ''
        out = []
        in_quotes = False
        i = 0
        while i < len(text):
            c = text[i]
            if in_quotes:
                out.append(c)
                if c == '\\' and i + 1 < len(text):
                    out.append(text[i + 1])
                    i += 1
                elif c == '"':
                    in_quotes = False
            elif c == '"':
                in_quotes = True
                out.append(c)
            elif not c.isspace():
                out.append(c)
            i += 1
        return ''.join(out)

    # -----------------------------------------------------------------

    @staticmethod
    def _read_object(c: _Cursor) -> dict:
        c.skip_whitespace()
        c.expect('{')
        fields = {}
        c.skip_whitespace()
        if c.peek() == '}':
            c.next()
            return fields
        while True:
            c.skip_whitespace()
            name = SimpleJson._read_name(c)
            c.skip_whitespace()
            c.expect(':')
            c.skip_whitespace()
            fields[name] = SimpleJson._read_value(c)
            c.skip_whitespace()
            d = c.next()
            if d == ',':
                continue
            if d == '}':
                return fields
            raise ValueError(f"Expected ',' or '}}' at {c.i}")

    @staticmethod
    def _read_name(c: _Cursor) -> str:
        """A name is bare text up to the colon, or a quoted string."""
        if c.peek() == '"':
            return SimpleJson._read_quoted(c)
        out = []
        while not c.at_end() and c.peek() != ':':
            out.append(c.next())
        return ''.join(out).strip()

    @staticmethod
    def _read_value(c: _Cursor) -> str:
        """A value is a quoted string, or bare text up to the next ',' or '}'."""
        if c.peek() == '"':
            return SimpleJson._read_quoted(c)
        out = []
        while not c.at_end() and c.peek() not in (',', '}'):
            out.append(c.next())
        return ''.join(out).strip()

    @staticmethod
    def _read_quoted(c: _Cursor) -> str:
        c.expect('"')
        out = []
        while True:
            if c.at_end():
                raise ValueError(f'Unterminated string at {c.i}')
            ch = c.next()
            if ch == '"':
                return ''.join(out)
            if ch == '\\' and not c.at_end():
                ch = c.next()
            out.append(ch)
