from .SimpleText import SimpleText


class Address:
    def __init__(self, street: SimpleText, city: SimpleText,
                 state: SimpleText, zip: SimpleText):
        self.street = street
        self.city = city
        self.state = state
        self.zip = zip

    def __eq__(self, other):
        if not isinstance(other, Address):
            return NotImplemented
        return (self.street, self.city, self.state, self.zip) == \
               (other.street, other.city, other.state, other.zip)

    def __hash__(self):
        return hash((self.street, self.city, self.state, self.zip))

    def __str__(self):
        return f'Address{{{self.street}, {self.city}, {self.state}, {self.zip}}}'
