class AddressComponents:
    def __init__(self, zip: str = '', street_name: str = '', city: str = '', pre_direction: str = '', suffix_direction: str = '', state: str = '', suffix_type: str = ''):
        self.zip = zip
        self.street_name = street_name
        self.city = city
        self.pre_direction = pre_direction
        self.suffix_direction = suffix_direction
        self.state = state
        self.suffix_type = suffix_type
