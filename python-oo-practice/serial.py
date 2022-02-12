"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        "create serialgenerator with starting number"
        self.start = self.up_only = start

    def __repr__(self):
        "show better representation of instance"
        return f'Machine counts up by 1 starting from {self.start}'

    def generate(self):
        "if no self.up_only: declare it, if self.up_only : add 1 to up_only"
        self.up_only += 1
        return self.up_only - 1

    def reset(self):
        "remove self.up_only attr from instance of SerialGenerator"
        self.up_only = self.start
