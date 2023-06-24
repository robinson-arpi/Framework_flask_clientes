# # Clase padre para configuraciones estardar

# class Config:
#     # Deshabilitar el sistema de seguimiento de modificaciones
#     # Evitar sobrecarga al rastrear cambios de flask-sqlalchemy a la biblioteca sqlalchemy
#     SQLALCHEMY_TRACK_MODIFICATIONS = False

#     # Inicializamos las configuraciones de la aplicacion
#     @staticmethod
#     def init_app(app):
#         pass

# class DevelopmentConfig(Config):
#     # Depuracion
#     DEBUG = True
#     # Enlace a la base de datos
#     SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/clientes_crud'

# class TestingConfig(Config):
#     # Depuracion
#     DEBUG = True
#     # Enlace a la base de datos
#     SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/clientes_crud_test'

# config = {
#     "development": DevelopmentConfig,
#     "testing": TestingConfig,
#     "default": DevelopmentConfig
# }