from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Email, Length
import email_validator


class RegisterForm(FlaskForm):
    username = StringField("Username", validators=[
                           InputRequired(), Length(min=3, max=20)])
    password = PasswordField("Password", validators=[InputRequired()])
    email = StringField("Email", validators=[
                        InputRequired(), Email(), Length(min=5, max=50)])
    first_name = StringField("First Name", validators=[
                             InputRequired(), Length(max=30)])
    last_name = StringField("Last Name", validators=[
                            InputRequired(), Length(max=30)])
    is_admin = BooleanField("Admin")


class LoginForm(FlaskForm):
    username = StringField("Username", validators=[
                           InputRequired(), Length(min=3, max=20)])
    password = PasswordField("Password", validators=[
                             InputRequired(), Length(min=7, max=30)])


class FeedbackForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(max=100)])
    content = TextAreaField("Content", validators=[InputRequired()])
