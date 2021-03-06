#!/usr/bin/env python
import os

# import environment in file
if os.path.exists('.env'):
    print "Importing environment vars from .env"
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]

from app import create_app, db
from app.models import User, Option
from flask.ext.script import (Manager, Shell)
from flask.ext.migrate import (Migrate, MigrateCommand)

app = create_app(os.getenv('WRGV_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)


def make_shell_context():
    return dict(app=app, db=db, User=User, Option=Option)
manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)


@manager.command
def deploy():
    """Run deployment tasks."""
    from flask.ext.migrate import upgrade
    # from app.models import User, Option

    upgrade()


if __name__ == '__main__':
    manager.run()
