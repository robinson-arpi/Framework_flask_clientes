from app import db
from app.models import Cliente
db.create_all()
cliente1 = Cliente(nombre="Robinson", direccion="El valle", telefono="0988062074", correo="robinson.arpi@ucuenca.edu.ec")
cliente2 = Cliente(nombre="Gerardo", direccion="El valle", telefono="0988062074", correo="robinson.arpi@ucuenca.edu.ec")
db.session.add(cliente1)
db.session.add(cliente2)
db.session.commit()
