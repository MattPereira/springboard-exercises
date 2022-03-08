from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "chickensarcool"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


connect_db(app)


@app.route('/')
def home_page():
    """List all pets divided by availability"""
    pets = Pet.query.all()
    return render_template("home.html", pets=pets)


@app.route('/add', methods=["GET", "POST"])
def add_pet():
    """Render form and handle adding a new pet to db"""
    form = AddPetForm()

    if form.validate_on_submit():

        data = {k: v for k, v in form.data.items() if k != "csrf_token"}
        new_pet = Pet(**data)

        # The more simple, lame way to extract form data and create a new Pet
        # name = form.pet_name.data
        # species = form.species.data
        # photo_url = form.photo_url.data
        # age = form.age.data
        # notes = form.notes.data
        # available = form.available.data

        # pet = Pet(name=name, species=species,
        #           photo_url=photo_url, age=age, notes=notes, available=available)

        db.session.add(new_pet)
        db.session.commit()

        flash(f"{new_pet.name} has been added!")

        return redirect('/')

    else:
        return render_template("add.html", form=form)


@app.route('/<int:pet_id>', methods=["GET", "POST"])
def show_edit_pet(pet_id):
    """Show info about pet and form to edit some pet details"""
    pet = Pet.query.get(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.add(pet)
        db.session.commit()

        flash(f"{pet.name} has been updated!")
        return redirect('/')
    else:
        return render_template('show.html', pet=pet, form=form)
