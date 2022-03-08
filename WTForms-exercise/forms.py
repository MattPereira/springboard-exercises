from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import InputRequired, Optional, URL, AnyOf, NumberRange


class AddPetForm(FlaskForm):
    name = StringField("Pet Name", validators=[InputRequired()])
    species = StringField("Species", validators=[
                          InputRequired(), AnyOf(values=["cat", "dog", "porcupine"])])
    photo_url = StringField("Photo Url", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[
                       Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes", validators=[Optional()])
    available = BooleanField("Available", default="checked")


class EditPetForm(FlaskForm):
    photo_url = StringField("Photo Url", validators=[URL(), Optional()])
    age = IntegerField("Age", validators=[NumberRange(
        min=0, max=30, message="The age of pet should be between 0 and 30!"), Optional()])
    notes = StringField("Notes")
    available = BooleanField("Available")
