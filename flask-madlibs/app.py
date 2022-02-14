from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import stories

app = Flask(__name__)

app.config['SECRET_KEY'] = "MiataIsAlwaysTheAnswer"

debug = DebugToolbarExtension(app)


@app.route('/')
def ask_story():
    """Show story options"""
    return render_template('story-selections.html', stories=stories.values())


@app.route('/madlib_form')
def madlib_form():
    """shows madlib form on home page"""
    story_id = request.args['story_id']
    story = stories[story_id]

    prompts = story.prompts
    return render_template("madlib_form.html", story_id=story_id, title=story.title, prompts=prompts)


@app.route('/story')
def show_story():
    """shows madlib story results"""
    story_id = request.args['story_id']
    story = stories[story_id]

    text = story.generate(request.args)

    return render_template('story.html', ttile=story.title, text=text)
