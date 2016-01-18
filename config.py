# coding=utf-8
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'kuoV1q2huiatPz9IFhvge'
    SSL_DISABLE = False
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    MAIL_SERVER = 'smtp.qq.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    WRGV_NAME = '高清游戏视频'
    WRGV_MAIL_SUBJECT_PREFIX = '[高清游戏视频]'
    WRGV_MAIL_SENDER = '高清游戏视频邮件组 <%s>' % os.environ.get('WRGV_ADMIN')  # sender must be same with SMTP account
    WRGV_ADMIN = os.environ.get('WRGV_ADMIN')
    WRGV_POSTS_PER_PAGE = 20
    WRGV_FOLLOWERS_PER_PAGE = 50
    WRGV_COMMENTS_PER_PAGE = 30
    WRGV_SLOW_DB_QUERY_TIME = 0.5

    API_SERVER_OPEN_URL = 'http://127.0.0.1:5000/open/v1.0/' or 'http://api.parser.cc/open/v1.0/'
    API_SERVER_API_URL = 'http://127.0.0.1:5000/api/v1.0/' or 'http://api.parser.cc/api/v1.0/'

    STATIC_DIR_PREFIX = 'dist'

    @staticmethod
    def init_app(app):
        pass


class DevConfig(Config):
    DEBUG = True
    STATIC_DIR_PREFIX = 'src'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app/data/gv-dev.db')


class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app/data/gv-test.db')
    WTF_CSRF_ENABLED = False


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app/data/gv.db')

    @classmethod
    def init_app(cls, app):
        Config.init_app(app)

config = {
    'dev': DevConfig,
    'test': TestConfig,
    'product': ProductionConfig,
    'default': DevConfig
}
