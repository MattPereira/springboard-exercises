"""Seed file to make sample data for Users db"""

from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add Users
spike = User(first_name="Spike", last_name="Speigal",
             img_url="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9de9f935-0043-4391-8dee-e907d3536a3a/degnif9-55611fc1-2fa8-4bc4-98c7-15b046acbd60.jpg/v1/fill/w_1024,h_758,q_75,strp/spike_spiegel__cowboy_bebop__by_crowchyld_degnif9-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzU4IiwicGF0aCI6IlwvZlwvOWRlOWY5MzUtMDA0My00MzkxLThkZWUtZTkwN2QzNTM2YTNhXC9kZWduaWY5LTU1NjExZmMxLTJmYTgtNGJjNC05OGM3LTE1YjA0NmFjYmQ2MC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.pwjP2O246EVyUYMPoTxDWnjAo8dT9Vo-DCHC9kEvF44")
jet = User(first_name="Jet", last_name="Black",
           img_url="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aea8b4f7-4f5d-4a55-af20-4bc6b5923ac6/d97uy20-f87bb575-c8fe-4697-b272-f004a4fd8cba.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FlYThiNGY3LTRmNWQtNGE1NS1hZjIwLTRiYzZiNTkyM2FjNlwvZDk3dXkyMC1mODdiYjU3NS1jOGZlLTQ2OTctYjI3Mi1mMDA0YTRmZDhjYmEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ov2pAZTD7W7tqhnc3wIsRoW1mu0uVpJtKdH6NGVcaH8")
edward = User(first_name="Radical", last_name="Edward",
              img_url="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fc7ee5da-d380-46f0-b8b2-46db097b954f/d182c9x-42115e84-5665-4f4e-8dfe-b9bf5bb2e14d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZjN2VlNWRhLWQzODAtNDZmMC1iOGIyLTQ2ZGIwOTdiOTU0ZlwvZDE4MmM5eC00MjExNWU4NC01NjY1LTRmNGUtOGRmZS1iOWJmNWJiMmUxNGQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.z1R9fWeFKwNqR4T50p-nGRkM3utl7nOhwlAT3igwFDw")

# Add new objects to session, so they will persist
db.session.add(spike)
db.session.add(jet)
db.session.add(edward)

# Commit --otherwise, this never gets saved!
db.session.commit()
