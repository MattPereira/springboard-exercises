from random import choice


class WordFinder:
    """finds random words from a file containing lots of words

    >>> wf = WordFinder('words.txt')
    235886 words read

    >>> wf.random() in wf.word_list
    True

    >>> wf.random() in wf.word_list
    True

    >>> wf.random() in wf.word_list
    True

    """

    def __init__(self, file_path):
        "Read file and print number of items read"
        file = open(file_path)

        self.word_list = self.extract(file)

        print(f'{len(self.word_list)} words read')

    def extract(self, file):
        'turns file into a list of words'
        return [word.strip() for word in file]

    def random(self):
        'returns a random word'
        return choice(self.word_list)
