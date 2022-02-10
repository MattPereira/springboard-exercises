def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    # MY BAD SOLUTION
    # phrase_list = phrase.split(' ')
    # title_case = []

    # for word in phrase_list:
    #     title_case.append(word.capitalize())

    # return " ".join(title_case)

    # ALTERNATE SOLUTION
    # return ' '.join([word.capitalize() for word in phrase.split(' ')])

    # BEST SOLUTION
    return phrase.title()
