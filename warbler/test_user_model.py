"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py

##################### CANNOT FIGURE OUT HOW TO STOP APP IMPORT FROM MOVING TO TOP ON SAVE ##########################

import os
from unittest import TestCase
from sqlalchemy import exc
from models import db, User, Message, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database


os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app
from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""
        db.drop_all()
        db.create_all()

        u1 = User.signup(
            email="user1@test.com",
            username="testuser1",
            password="amadeus",
            image_url="image1.jpg"
        )

        uid1 = 111
        u1.id = uid1

        u2 = User.signup(
            email="user2@test.com",
            username="testuser2",
            password="miata",
            image_url="image2.jpg"
        )
        uid2 = 303
        u2.id = uid2

        db.session.add_all([u1, u2])
        db.session.commit()

        u1 = User.query.get(uid1)
        u2 = User.query.get(uid2)

        self.u1 = u1
        self.uid1 = uid1

        self.u2 = u2
        self.uid2 = uid1

        self.client = app.test_client()

    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_user_model(self):
        """Does basic model work?"""

        u = User(
            email="test@test.com",
            username="testuser",
            password="secretpassword"
        )

        db.session.add(u)
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)
        self.assertEqual(len(u.following), 0)
        self.assertEqual(len(u.likes), 0)
        self.assertEqual(repr(u), '<User #1: testuser, test@test.com>')

    ###### test user model relationship to following model #####
    def test_user_follows(self):
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertEqual(len(self.u2.following), 0)
        self.assertEqual(len(self.u2.followers), 1)
        self.assertEqual(len(self.u1.followers), 0)
        self.assertEqual(len(self.u1.following), 1)

        self.assertEqual(self.u2.followers[0].id, self.u1.id)
        self.assertEqual(self.u1.following[0].id, self.u2.id)

    def test_is_following(self):
        self.u1.following.append(self.u2)

        db.session.commit()

        self.assertTrue(self.u1.is_following(self.u2))
        self.assertFalse(self.u2.is_following(self.u1))

    def test_is_followed_by(self):
        self.u1.following.append(self.u2)
        db.session.commit()

        self.assertTrue(self.u2.is_followed_by(self.u1))
        self.assertFalse(self.u2.is_followed_by(self.u2))

    ###### test User.signup classmethod ########
    def test_valid_signup(self):
        stevie = User.signup("Stevie Chicks", "stevie@gmail.com",
                             "bokbok", "rooster.jpg")
        u_id = 888
        stevie.id = u_id
        db.session.commit()

        stevie = User.query.get(u_id)
        self.assertIsNotNone(stevie)
        self.assertEqual(stevie.username, "Stevie Chicks")
        self.assertEqual(stevie.email, "stevie@gmail.com")
        self.assertNotEqual(stevie.password, "bokbok")
        # Bcrypt strings should start with $2b$
        self.assertTrue(stevie.password.startswith("$2b$"))

    def test_invalid_username_signup(self):
        invalid = User.signup(None, "oopsie@gmail.com",
                              "secretpassword", "image.jpg")
        u_id = 987654321
        invalid.id = u_id
        # test if User.signup fails to create a new user if username validation fails
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_invalid_email_signup(self):
        invalid = User.signup("wyatt", None, "supersecret", None)
        u_id = 666
        invalid.id = u_id
        # test if User.signup fails to create a new user if email validation fails
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_invalid_password_signup(self):
        with self.assertRaises(ValueError) as context:
            User.signup("Waffles", "waffle@gmail.com", "", None)

        with self.assertRaises(ValueError) as context:
            User.signup("Pancakes", "pancake@email.com", None, None)

    ####### AUTHENTICATOIN TESTS #############
    def test_valid_authenticate(self):
        u = User.authenticate(self.u1.username, "amadeus")

        self.assertIsNotNone(u)
        self.assertEqual(u.id, self.uid1)

    def test_invalid_username(self):
        self.assertFalse(User.authenticate("MrRobot", "beepboop"))

    def test_wrong_password(self):
        self.assertFalse(User.authenticate(self.u1.username, "wrongpassword"))
