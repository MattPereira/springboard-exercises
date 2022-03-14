
from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError

from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "miataisalwaystheanswer"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)

toolbar = DebugToolbarExtension(app)


@app.route('/')
def home_page():
    """redirect to /register"""

    return redirect('/register')


@app.route('/register', methods=["GET", "POST"])
def register_user():
    """show register form and handle user registration"""

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        is_admin = form.is_admin.data

        new_user = User.register(
            username, password, email, first_name, last_name, is_admin)
        db.session.add(new_user)

        try:
            db.session.commit()
        except IntegrityError:
            flash('Username is already taken', 'danger')
            return redirect('/register')

        session['username'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")
        return redirect(f'/users/{new_user.username}')

    return render_template('users/register.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login_user():
    """show login form and handle user login"""

    if "username" in session:
        return redirect(f"/users/{session['username']}")

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            flash(f"Welcome back, {user.username}!", "success")
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password']

    return render_template('users/login.html', form=form)


@app.route('/logout', methods=["POST"])
def logout_user():
    """Handle logout of user using session.pop('username')"""
    session.pop('username')
    flash("You have been logged out!", "info")
    return redirect('/')


@app.route('/users/<username>')
def show_user(username):
    """Show information about a user AND show all user submitted feedback"""

    # Extra logic on this route to allow admin users to see other users pages
    if 'username' not in session:
        flash('You must be logged in to use this website!', 'danger')
        return redirect('/login')

    curr_user = session['username']

    if username != curr_user and not User.admin_status(curr_user):
        return render_template('401.html')

    user = User.query.get_or_404(username)

    return render_template('users/show.html', user=user)


@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    """Remove user from db, delete all of user's feedback, cleanse session """

    if 'username' not in session or username != session['username']:
        return render_template('401.html')

    user = User.query.get_or_404(username)
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    flash(f"User {user.username} deleted!", "success")

    return redirect("/")


@app.route('/users/<username>/feedback/add', methods=["POST", "GET"])
def add_feedback(username):
    """display feedback form and handle submission of form"""

    if 'username' not in session or username != session['username']:
        return render_template('401.html')

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        new_feedback = Feedback(
            title=title, content=content, username=username)

        db.session.add(new_feedback)
        db.session.commit()

        flash('Thank you for submitting feedback!', 'success')
        return redirect(f'/users/{new_feedback.username}')

    return render_template('feedback/add.html', form=form, username=username)


@app.route('/feedback/<feedback_id>/update', methods=["GET", "POST"])
def edit_feedback(feedback_id):
    """Show edit form and handle submission"""

    feedback = Feedback.query.get_or_404(feedback_id)

    if 'username' not in session or feedback.username != session['username']:
        return render_template('401.html')

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.add(feedback)
        db.session.commit()
        flash('Feedback updated!', 'success')
        return redirect(f'/users/{feedback.username}')

    return render_template('feedback/edit.html', form=form, feedback=feedback)


@app.route('/feedback/<feedback_id>/delete', methods=["POST"])
def delete_feedback(feedback_id):
    """Delete feedback if user in session"""
    feedback = Feedback.query.get_or_404(feedback_id)

    if 'username' not in session or feedback.username != session['username']:
        return render_template('401.html')

    db.session.delete(feedback)
    db.session.commit()

    flash('Feedback deleted!', 'success')
    return redirect(f'/users/{feedback.username}')
