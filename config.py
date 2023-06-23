class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass

#$ SET DEV_DATABASE_URL=mysql+pymysql://root:@localhost:3306/bookshop
class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost:3306/framework_flask2'

config = {
    "development": DevelopmentConfig,
    "default": DevelopmentConfig
}