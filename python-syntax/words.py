def print_upper_words(word_list):
    """prints all caps version of each item in word list on a seperate line"""
    for word in word_list:
        print(word.upper())


def print_upper_words_starting_with_letter(word_list, must_start_with):
    """prints all caps version of each item in word list that starts with a particular letter"""
    for word in word_list:
        if word.startswith(must_start_with):
            print((word.upper()))


def print_upper_words_starting_with_set(word_list, must_start_with):
    """prints each word from word list that starts with a letter from the set which is the second parameter from the function"""
    for word in word_list:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.upper())
