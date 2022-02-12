from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route('/add')
def sum():
    """Add a and b query string params"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    sum = add(a, b)
    return str(sum)


@app.route('/sub')
def difference():
    """subtract a and b query string params"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    diff = sub(a, b)
    return str(diff)


@app.route('/div')
def quotient():
    """Divide a and b query string parameters"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    quot = div(a, b)
    return str(quot)


@app.route('/mult')
def product():
    """Multiply a and b query string parameters"""
    a = int(request.args.get('a'))
    b = int(request.args.get('b'))
    prod = mult(a, b)
    return str(prod)


OPERATORS = {
    'add': add,
    'sub': sub,
    'div': div,
    'mult': mult
}


@app.route('/math/<operator>')
def math_operations(operator):
    """allows for query string parameters to be div,sub,mult, or added based on the dynamic route"""
    func = OPERATORS.get(operator, 'not a valid operation')

    a = int(request.args.get('a'))
    b = int(request.args.get('b'))

    result = func(a, b)
    return str(result)
