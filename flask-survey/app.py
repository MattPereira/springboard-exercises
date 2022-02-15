from flask import Flask, render_template, request, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension

from surveys import surveys

app = Flask(__name__)

app.config['SECRET_KEY'] = "miataisalwaystheanswer"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


RESPONSES = []
SURVEY_CHOICE = []


@app.route('/')
def choose_survey():
    """Shows survey choices"""
    return render_template('choose_survey.html', surveys=surveys)


@app.route('/start', methods=['POST'])
def title_page():
    """Shows survey information"""
    # add survey to SURVEY_CHOICE list
    choice = request.form['survey']
    survey = surveys.get(choice)
    SURVEY_CHOICE.append(survey)

    print(SURVEY_CHOICE[0])

    # add variables to display on survey start page
    title = survey.title
    instructions = survey.instructions
    return render_template('start_survey.html', title=title, instructions=instructions)


@app.route('/questions/<int:num>')
def show_question(num):
    """Shows form asking current question"""
    survey = SURVEY_CHOICE[0]
    questions = survey.questions

    if num != len(RESPONSES):
        flash('INVALID QUESTION URL! NO HACKING ALLOWED!')
        return redirect(f'/questions/{len(RESPONSES)}')

    if len(RESPONSES) == len(questions):
        return redirect('/thanks')

    question = questions[num].question
    choices = questions[num].choices
    text = questions[num].allow_text
    print(text)

    return render_template('questions.html', question=question, choices=choices, text=text)


@app.route('/answer', methods=['POST'])
def add_answer():
    """add answer to RESPONSES"""
    answer = request.form['answer']
    text = request.form.get("text", "")
    # Add to pretend DB
    RESPONSES.append(answer)

    survey = SURVEY_CHOICE[0]

    if len(RESPONSES) == len(survey.questions):
        return redirect('/thanks')

    return redirect(f"/questions/{len(RESPONSES)}")


@app.route('/thanks')
def thank_user():

    survey = SURVEY_CHOICE[0]

    return render_template("thanks.html", responses=RESPONSES, survey=survey)
