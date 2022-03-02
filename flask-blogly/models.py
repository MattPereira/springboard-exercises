"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    first_name = db.Column(db.String(25),
                           nullable=False)

    last_name = db.Column(db.String(25),
                          nullable=False)

    img_url = db.Column(db.String(300),
                        nullable=False,
                        default="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png")

    def __repr__(self):
        u = self
        return f"<User id={u.id} first_name={u.first_name} last_name={u.last_name}>"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
