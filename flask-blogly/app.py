"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "chickensarcool"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def home():
    """only redirects to /users for now"""
    return redirect('/users')


@app.route('/users')
def list_users():
    """Show list of all users"""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users.html', users=users)


@app.route('/users/new')
def add_user():
    """Show a form to add a new user"""
    return render_template('new.html')


@app.route('/users/new', methods=["POST"])
def create_user():
    """Extract new user data from form and add to database"""
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    img_url = request.form["img_url"]

    new_user = User(first_name=first_name,
                    last_name=last_name, img_url=img_url or None)

    db.session.add(new_user)
    db.session.commit()

    return redirect(f'/users/{new_user.id}')


@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show details about a particular user"""
    user = User.query.get_or_404(user_id)
    return render_template('details.html', user=user)


@app.route('/users/<int:user_id>/edit')
def edit_form(user_id):
    """Show form to edit a particular user"""

    user = User.query.get(user_id)
    return render_template('edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def update_user(user_id):
    """Update user information in database using data from form, then redirect to all users page"""
    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    img_url = request.form["img_url"]

    user = User.query.get(user_id)
    user.first_name = first_name
    user.last_name = last_name
    user.img_url = img_url

    db.session.add(user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Delete a particular user when delete form is submitted"""
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()
    return redirect('/users')
