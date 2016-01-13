# coding=utf-8
import os
import time
import urllib
import urllib2
import random
import string
import json

from flask import url_for
from flask import redirect
from flask import request
from flask import session
from flask import flash
from flask import current_app
from flask.ext.login import login_user

from . import auth
from ..models import generate_sign
from ..models import User
from .. import main


@auth.route('/login')
def login():
    app_key = os.getenv('APP_KEY')
    app_secret = os.getenv('APP_SECRET')
    redirect_url = url_for('auth.login', _external=True)

    if request.args.get('code') and request.args.get('state'):
        code = request.args.get('code')
        state = request.args.get('state')
        if state != session['state']:
            flash('unmatched state')
            return redirect('main.index')
        query = dict(grant_type='authorization_code', client_id=app_key, code=code, redirect_url=redirect_url)
        url = (current_app.config['API_SERVER_OPEN_URL'] or 'http://api.parser.cc/open/v1.0/')+'user_token?'+urllib.urlencode(query)
        req = urllib2.Request(url)
        response = urllib2.urlopen(req)
        f = response.read()
        if f:
            data = json.loads(f)
            user = User.insert_social_user(data.get('open_id'), data.get('nickname'), data.get('access_token'))
            login_user(user, True)
            flash('you have logged successfully')
            return redirect(url_for('main.index'))
        else:
            flash('login failed, please retry')
            return redirect(url_for('main.index'))

    timestamp = int(time.time())
    sign = generate_sign(app_key, app_secret, timestamp, redirect_url)
    state = ''.join(random.choice(string.digits) for _ in range(10))

    session['state'] = state

    query = dict(response_type='code', client_id=app_key, tstamp=timestamp, sign=sign, state=state, redirect_url=redirect_url)

    url = (current_app.config['API_SERVER_OPEN_URL'] or 'http://api.parser.cc/open/v1.0/')+'authorize?'+urllib.urlencode(query)
    return redirect(url)
