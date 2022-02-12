from wordfinder import WordFinder


class SpecialWordFinder(WordFinder):
    """Extend WordFinder class to remove comments and blank lines
    >>> swf = SpecialWordFinder("specialwords.txt")
    4 words read

    >>> swf.random() in ['kale','parsnips','apple','mango']
    True

    >>> swf.random() in ['kale','parsnips','apple','mango']
    True

    >>> swf.random() in ['kale','parsnips','apple','mango']
    True
    """

    def extract(self, file):
        'filter out comments and blank lines from file'
        return [word.strip() for word in file if word.strip() and not word.startswith('#')]
