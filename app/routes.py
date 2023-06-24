from . import create_app
from . import db
from .models import Cliente
from flask import jsonify, redirect, request, abort, render_template, url_for

app = create_app('development')

app.app_context().push()

db.create_all()

#inicio
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/api/getClientes", methods=["GET"])
def get_clientes():
    try:
        clientes = Cliente.query.all()
        response = jsonify([cliente.to_json() for cliente in clientes])
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception:
        abort(404)

    

@app.route("/api/getCliente/<int:id>", methods=["GET"])
def get_cliente(id):
    try:
        cliente = Cliente.query.get(id)
        if cliente is None:
            return jsonify({'message': 'Cliente no encontrado'})
        response = jsonify(cliente.to_json())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception:
        abort(404)
    

@app.route("/api/deleteCliente/<int:id>", methods=["DELETE"])
def delete_cliente(id):
    try:
        cliente = Cliente.query.get(id)
        if cliente is None:
            return jsonify({'message': 'Cliente no encontrado'})
        db.session.delete(cliente)
        db.session.commit()
        response = jsonify({'message': 'Cliente eliminado correctamente'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception:
        abort(404)

@app.route('/api/updateCliente/<int:id>', methods=['PUT'])
def update_cliente(id):
    try:
        if not request.json:
            return jsonify({'message': 'Sin respuesta'})
        cliente = Cliente.query.get(id)
        if cliente is None:
            return jsonify({'message': 'Cliente no encontrado'})
        cliente.nombre = request.json.get('nombre', cliente.nombre)
        cliente.direccion = request.json.get('direccion', cliente.direccion)
        cliente.telefono = request.json.get('telefono', cliente.telefono)
        cliente.correo = request.json.get('correo', cliente.correo)
        db.session.commit()
        
        response = jsonify({'message': 'Cliente actualizado correctamente'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception:
        abort(404)

@app.route('/api/addCliente', methods=['POST'])
def add_cliente():
    try:
        if not request.json:
            return jsonify({'message': 'Sin respuesta'})
        cliente = Cliente(
            nombre = request.json.get('nombre'),
            direccion = request.json.get('direccion'),
            telefono =request.json.get('telefono'),
            correo = request.json.get('correo')
        )
        db.session.add(cliente)
        db.session.commit()
        response = jsonify({'message': 'Cliente creado correctamente'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception:
        abort(404)