# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from config import config
# # Permite que el navegador del cliente compruebe si la solicitud está autorizada antes de realizar cualquier transferencia de datos
# from flask_cors import CORS

# # instancia de base de datos
# db = SQLAlchemy()

# # instacia basada en el entorno
# def create_app(config_name):
#     app = Flask(__name__)
#     CORS(app)
#     app.config.from_object(config[config_name])
#     config[config_name].init_app(app)

#     db.init_app(app)
#     return app