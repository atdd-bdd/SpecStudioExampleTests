class TemperatureConverter:
    @staticmethod
    def fahrenheit_to_celsius(fahrenheit: int) -> int:
        # Integer division truncating toward zero, so -40F comes out -40C.
        return int((fahrenheit - 32) * 5 / 9)
