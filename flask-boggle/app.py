from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from boggle import Boggle

app = Flask(__name__)

app.config["SECRET_KEY"] = "miata"

debug = DebugToolbarExtension(app)

app.debug = True

boggle_game = Boggle()


@app.route('/')
def show_board():
    """Create game board and display on page"""
    board = boggle_game.make_board()
    session['board'] = board

    return render_template("boggle.html", board=board)


@app.route('/validate-word')
def validate_word():
    """Check if word is in dictionary and respond to front end with true or false"""
    board = session['board']
    word = request.args['word']
    res = boggle_game.check_valid_word(board, word)

    return jsonify({"result": res})


@app.route('/score-keeper', methods=['POST'])
def keep_score():
    """Receives game score from axios.post, update high score and games played"""
    score = request.json.get('score')
    high_score = session.get('high_score', 0)
    play_count = session.get('play_count', 0)

    session['play_count'] = play_count + 1
    session['high_score'] = max(int(score), high_score)

    return jsonify(newRecord=int(score) > high_score)
