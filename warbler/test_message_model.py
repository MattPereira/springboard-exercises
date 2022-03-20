"""Message model tests."""

from app import app
import os
from unittest import TestCase
from sqlalchemy import exc

from models import db, User, Message, Follows, Likes


os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


db.create_all()


class MessageModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Set up sample data and save to self"""
        db.drop_all()
        db.create_all()

        self.uid = 23
        u = User.signup("bojack", "horseman@test.com", "whiskey", None)
        u.id = self.uid
        db.session.commit()

        self.u = User.query.get(self.uid)

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_message_model(self):
        """Does basic model work?"""

        m = Message(
            text="bok bok bok",
            user_id=self.uid
        )

        db.session.add(m)
        db.session.commit()

        self.assertEqual(len(self.u.messages), 1)
        self.assertEqual(self.u.messages[0].text, "bok bok bok")

    def test_message_likes(self):
        m1 = Message(
            text="woof woof woof",
            user_id=self.uid
        )

        m2 = Message(
            text="bark bark bark",
            user_id=self.uid
        )

        m3 = Message(
            text="wooooooooooof",
            user_id=self.uid
        )

        u = User.signup("clifford", "walks@email.com", "peanutbutter", None)
        uid = 333
        u.id = uid
        db.session.add_all([m1, m2, m3, u])
        db.session.commit()

        u.likes.append(m1)
        u.likes.append(m3)

        db.session.commit()

        l = Likes.query.filter(Likes.user_id == uid).all()
        self.assertEqual(len(l), 2)
        self.assertEqual(l[0].message_id, m1.id)
