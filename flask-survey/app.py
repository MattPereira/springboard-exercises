from flask import Flask, make_response, render_template, request, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension

from surveys import surveys

app = Flask(__name__)

app.config['SECRET_KEY'] = "miataisalwaystheanswer"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def show_survey_choices():
    """Shows survey choices"""
    return render_template('choose_survey.html', surveys=surveys)


@app.route('/', methods=['POST'])
def choose_survey():
    """Shows survey information"""
    # add survey to SURVEY_CHOICE list
    survey_id = request.form['survey_id']

    # prevent repeating a completed survey
    if request.cookies.get(f'completed_{survey_id}'):
        return 'NO SURVEY FOR YOU! (please choose a survey you have not completed)'

    survey = surveys[survey_id]

    session['current_survey'] = survey_id

    return render_template('start_survey.html', survey=survey)


@app.route('/begin', methods=['POST'])
def start_survey():
    """clear session of response data and redirect to first survey question"""
    session['responses'] = []

    return redirect('/questions/0')


@app.route('/questions/<int:num>')
def show_question(num):
    """Shows form asking current question"""
    survey = surveys[session['current_survey']]
    questions = survey.questions

    if num != len(session['responses']):
        flash('INVALID QUESTION URL! NO HACKING ALLOWED!')
        return redirect(f'/questions/{len(session["responses"])}')

    if len(session['responses']) == len(questions):
        return redirect('/thanks')

    question = questions[num].question
    choices = questions[num].choices
    text = questions[num].allow_text

    return render_template('questions.html', question=question, choices=choices, text=text)


@app.route('/answer', methods=['POST'])
def add_answer():
    """add answer to session['responses']"""

    answer = request.form.get('answer', 'no response')
    text = request.form.get("text", "")

    # Adds the answer to session['responses']
    responses = session['responses']
    responses.append({'answer': answer, 'text': text})
    session['responses'] = responses

    survey = surveys[session['current_survey']]

    if len(session['responses']) == len(survey.questions):
        return redirect('/thanks')

    return redirect(f"/questions/{len(responses)}")


@app.route('/thanks')
def thank_user():

    survey = surveys[session['current_survey']]
    responses = session['responses']

    html = render_template("thanks.html", responses=responses, survey=survey)

    res = make_response(html)

    res.set_cookie(
        f'completed_{session["current_survey"]}', "true", max_age=30)

    return res

    # Set cookie noting this survey is done so they can't re-do it
