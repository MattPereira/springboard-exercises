from models import db, Pet
from app import app

# Create all tables
db.drop_all()
db.create_all()


blaze = Pet(name="Blaze", species="dog", photo_url="https://images.unsplash.com/photo-1477973770766-6228305816df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
            age=4, notes="Hes a good boy", available=False)

snoop = Pet(name="Snoop", species="dog", photo_url="https://images.unsplash.com/photo-1625481725747-76e4aa13da46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            age=4, notes="Once ate an entire chocolate cake and survived")

ein = Pet(name="Ein", species="dog", photo_url="https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
          age=2, notes="A data dog", available=True)


db.session.add_all([blaze, snoop, ein])
db.session.commit()
