"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

import datetime

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User of website"""
    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    first_name = db.Column(db.String(25),
                           nullable=False)

    last_name = db.Column(db.String(25),
                          nullable=False)

    img_url = db.Column(db.Text,
                        nullable=False,
                        default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png")

    posts = db.relationship("Post", backref="user",
                            cascade="all, delete-orphan")

    def __repr__(self):
        u = self
        return f"<User id={u.id} first_name={u.first_name} last_name={u.last_name}>"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Post(db.Model):
    """Blog post"""
    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    title = db.Column(db.String(50),
                      nullable=False)

    content = db.Column(db.Text,
                        nullable=False)

    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    tags = db.relationship('Tag', secondary="posts_tags", backref="posts")

    def __repr__(self):
        return f"<Post title:{self.title} content:{self.content} created_at:{self.created_at}>"

    @property
    def friendly_datetime(self):
        """Return human readable date and time string"""

        return self.created_at.strftime("%B %d %Y, %I:%M %p")


class Tag(db.Model):
    """Tag that will be added to posts."""
    __tablename__ = "tags"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    name = db.Column(db.Text, nullable=False, unique=True)

    def __repr__(self):
        return f"<Tag id={self.id}, name={self.name}>"


class PostTag(db.Model):
    """Tag on a post."""
    __tablename__ = "posts_tags"

    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)

    def __repr__(self):
        return f"<PostTag post_id={self.post_id}, tag_id={self.tag_id}>"
