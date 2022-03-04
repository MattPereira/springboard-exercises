"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = "chickensarcool"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)


@app.route('/')
def home():
    """Display 5 most recent blogly posts"""
    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()

    return render_template('home.html', posts=posts)


@app.errorhandler(404)
def page_not_found(e):
    """Display custom page for 404 errors"""
    return render_template('404.html')


@app.route('/users')
def list_users():
    """Show list of all users"""
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users.html', users=users)


@app.route('/users/new')
def add_user():
    """Show a form to add a new user"""
    return render_template('users/new.html')


@app.route('/users/new', methods=["POST"])
def create_user():
    """Extract new user data from form and add to database"""

    new_user = User(
        first_name=request.form["first_name"],
        last_name=request.form["last_name"],
        img_url=request.form["img_url"] or None)

    db.session.add(new_user)
    db.session.commit()

    flash(f"User {new_user.full_name} added!")
    return redirect(f'/users')


@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show details about a particular user"""
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user_id).all()
    return render_template('users/details.html', user=user, posts=posts)


@app.route('/users/<int:user_id>/edit')
def edit_form(user_id):
    """Show form to edit a particular user"""

    user = User.query.get(user_id)
    return render_template('users/edit.html', user=user)


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

    flash(f"User {user.full_name} has been edited!")

    return redirect('/users')


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Delete a particular user when delete form is submitted"""
    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    flash(f"User {user.full_name} has been deleted!")
    return redirect('/users')


@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    """Show form to add a new post"""
    user = User.query.get_or_404(user_id)
    return render_template('posts/new.html', user=user)


@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def create_post(user_id):
    """Handle add form by adding post to db and then redirect to user details"""

    title = request.form["title"]
    content = request.form["content"]

    new_post = Post(title=title, content=content, user_id=user_id)

    db.session.add(new_post)
    db.session.commit()

    flash(f"New post {new_post.title} has been created!")

    return redirect(f'/users/{user_id}')


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Show the details of a particular post"""
    post = Post.query.get_or_404(post_id)

    return render_template('posts/details.html', post=post)


@app.route('/posts/<int:post_id>/edit')
def edit_post_form(post_id):
    """Show form to edit a particular post"""
    post = Post.query.get_or_404(post_id)

    return render_template('posts/edit.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    """Update title and content of post in db then redirect to post details"""
    title = request.form["title"]
    content = request.form["content"]

    post = Post.query.get_or_404(post_id)

    post.title = title
    post.content = content

    db.session.add(post)
    db.session.commit()

    flash(f"Post {post.title} has been edited!")

    return redirect(f'/posts/{post_id}')


@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    """Delete a particular user when delete form is submitted"""
    post = Post.query.get_or_404(post_id)

    user_id = post.user.id

    db.session.delete(post)
    db.session.commit()

    flash(f"Post {post.title} has been deleted!")

    return redirect(f'/users/{user_id}')
