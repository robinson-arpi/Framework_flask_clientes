from . import db

class Cliente(db.Model):
    __tablename__ = 'clientes'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(100), nullable=False)

    def to_json(self):
        return {
            'nombre': self.nombre,
            'direccion': self.direccion,
            'telefono': self.telefono,
            'correo': self.correo
        }


