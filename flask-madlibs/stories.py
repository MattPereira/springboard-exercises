"""Madlibs Stories."""


import code


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, inst, title, words, text):
        """Create story with words and template text."""
        self.inst = inst
        self.title = title
        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started


story = Story(
    "story_one",
    'A Fairy Tale',
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

bonus_story = Story(
    "story_two",
    "Bonus Story",
    ['adjective', 'plural_food_1', 'verb', 'saying', 'noun',
        'plural_food_2', 'color', 'vehicle', 'animal', 'person'],
    """Today I went to my favorite Taco Stand called the {adjective} {animal}. Unlike most food stands, they cook and prepare the food in a {vehicle} while you {verb}. The best thing on the menu is the {color} {noun}. Instead of ground beef they fill the taco with {plural_food_1}, cheese, and top if off with a salsa made from {plural_food_2}. If that doesn't make your mouth water, then it's just like {person} always says: {saying}"""
)

# Makes a dict that looks like {inst:story, inst:bonus_story}
stories = {s.inst: s for s in [story, bonus_story]}
