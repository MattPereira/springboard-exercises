"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify, render_template

from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)


@app.route('/')
def home():

    return render_template('home.html')


@app.route('/api/cupcakes')
def list_cupcakes():
    # Get data about all cupcakes
    all_cakes = [cake.serialize() for cake in Cupcake.query.all()]

    return jsonify(cupcakes=all_cakes)


@app.route('/api/cupcakes/<int:cake_id>')
def get_cupcake(cake_id):
    # Get data about a single cupcake
    cake = Cupcake.query.get_or_404(cake_id)

    return jsonify(cupcake=cake.serialize())


@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    # Create a cupcake
    new_cake = Cupcake(flavor=request.json["flavor"], size=request.json["size"],
                       rating=request.json["rating"], image=request.json.get(
                           "image", None))

    db.session.add(new_cake)
    db.session.commit()
    res = jsonify(cupcake=new_cake.serialize())
    return (res, 201)


@app.route('/api/cupcakes/<int:cake_id>', methods=["PATCH"])
def update_cupcake(cake_id):
    # Edit the details of a cupcake
    cake = Cupcake.query.get_or_404(cake_id)
    cake.flavor = request.json.get('flavor', cake.flavor)
    cake.image = request.json.get('image', cake.image)
    cake.rating = request.json.get('rating', cake.rating)
    cake.size = request.json.get('size', cake.size)
    db.session.commit()
    return jsonify(cupcake=cake.serialize())


@app.route('/api/cupcakes/<int:cake_id>', methods=["DELETE"])
def delete_cupcake(cake_id):
    # Delete a cupcake using cake_id
    cake = Cupcake.query.get_or_404(cake_id)
    db.session.delete(cake)
    db.session.commit()

    return jsonify(message=f"Deleted cupcake id:{cake.id}")
