from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, IntegerField
from wtforms.validators import InputRequired, URL


class AddCupcakeForm(FlaskForm):
    """Form for adding cupcakes."""

    flavor = StringField("Flavor", validators=[InputRequired()])
    size = StringField("Size", validators=[InputRequired()])
    rating = IntegerField("Rating", validators=[InputRequired()])
    image = StringField("Image", validators=[InputRequired(), URL()])


class AddSearchForm(FlaskForm):
    """Form for searching cupcakes"""

    search = StringField("Search", validators=[InputRequired()])
