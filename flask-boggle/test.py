from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class BoggleViews(TestCase):

    def test_show_board(self):
        """Make sure board information in session and HTML is displayed"""
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h3>SCORE :', html)
            self.assertIn('<h3>COUNTDOWN</h3>', html)
            self.assertIn('<h3>GAMES PLAYED</h3>', html)
            self.assertIn('board', session)
            self.assertTrue(isinstance(session['board'], list))
            self.assertTrue(len(session['board']) == 5)

    def test_valid_word(self):
        """Test if word is valid in pretend session['board']"""
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [['A', 'I', 'N', 'T', 'U'],
                                           ['S', 'A', 'D', 'L', 'Y'],
                                           ['W', 'N', 'W', 'Z', 'Y'],
                                           ['F', 'N', 'Y', 'Q', 'K'],
                                           ['G', 'T', 'K', 'S', 'H']]

            res = client.get('/validate-word?word=sadly')
            self.assertEqual(res.json['result'], 'ok')

    def test_invalid_word(self):
        """Test if word is valid but not in pretend session['board']"""
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [['A', 'I', 'N', 'T', 'U'],
                                           ['S', 'A', 'D', 'L', 'Y'],
                                           ['W', 'N', 'W', 'Z', 'Y'],
                                           ['F', 'N', 'Y', 'Q', 'K'],
                                           ['G', 'T', 'K', 'S', 'H']]

            res = client.get('/validate-word?word=befuddle')
            self.assertEqual(res.json['result'], 'not-on-board')

    def test_not_word(self):
        """Test if word is not a word in english dictionary"""

        with app.test_client() as client:
            client.get('/')
            res = client.get('/validate-word?word=pepehands')
            self.assertEqual(res.json['result'], 'not-word')

    def test_score_keeper(self):
        """Test if play_count is in session after hitting /score-keeper"""
        with app.test_client() as client:

            post_res = client.post('/score-keeper', json={'score': '111'})
            get_res = client.get('/')
            html = get_res.get_data(as_text=True)

            self.assertEqual(post_res.status_code, 200)
            self.assertIn('play_count', session)
            self.assertIn('high_score', session)
            self.assertEqual(session['play_count'], 1)
            self.assertEqual(session['high_score'], 111)
            self.assertIn('<h3>RECORD : 111</h3>', html)
