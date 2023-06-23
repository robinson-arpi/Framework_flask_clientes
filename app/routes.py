from . import create_app
from . import db
from .models import Cliente
from flask import jsonify, redirect, request, abort, render_template, url_for

app = create_app('development')

# Crea el contexto de aplicación
app.app_context().push()

# Crea todas las tablas en la base de datos
db.create_all()

#inicio
@app.route('/')
def index():
    clientes = Cliente.query.all()
    return render_template('index.html', clientes = clientes)

@app.route("/api/getClientes", methods=["GET"])
def get_clientes():
    clientes = Cliente.query.all()
    response = jsonify([cliente.to_json() for cliente in clientes])
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/api/getCliente/<int:id>", methods=["GET"])
def get_cliente(id):
    cliente = Cliente.query.get(id)
    if cliente is None:
        return jsonify({'message': 'Cliente no encontrado'})
    response = jsonify(cliente.to_json())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    

@app.route("/api/deleteCliente/<int:id>", methods=["DELETE"])
def delete_cliente(id):
    cliente = Cliente.query.get(id)
    if cliente is None:
        return jsonify({'message': 'Cliente no encontrado'})
    db.session.delete(cliente)
    db.session.commit()
    response = jsonify({'message': 'Cliente eliminado correctamente'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/api/updateCliente/<int:id>', methods=['PUT'])
def update_cliente(id):
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
    

@app.route('/api/addCliente', methods=['POST'])
def add_cliente():
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
    response = (jsonify({'message': 'Cliente creado correctamente'})).headers.add('Access-Control-Allow-Origin', '*') 
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response