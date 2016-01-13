# coding = utf-8

import os
import urllib
import urllib2
import time
import json

from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import current_app
from flask import abort
from flask import session
from flask.ext.login import current_user

from . import main
from ..models import Option
from ..models import User
from ..models import generate_sign
from ..kits import request_api_url


@main.before_app_first_request
def before_app_first_request():
    if current_user.is_authenticated:
        access_token = current_user.access_token
        session['user_access_token'] = access_token
    else:
        access_token = Option.get_option('access_token')
        session['access_token'] = access_token
    if not access_token:
        timestamp = int(time.time())
        redirect_url = url_for('main.index', _external=True)
        app_key = os.getenv('APP_KEY')
        app_secret = os.getenv('APP_SECRET')
        sign = generate_sign(app_key, app_secret, timestamp, redirect_url)
        query = dict(grant_type='authorization_code', client_id=app_key, tstamp=timestamp, sign=sign, redirect_url=redirect_url)
        url = (current_app.config['API_SERVER_OPEN_URL'] or 'http://api.parser.cc/open/v1.0/')+'access_token?'+urllib.urlencode(query)
        req = urllib2.Request(url)
        response = urllib2.urlopen(req).read()
        print response
        if response and json.loads(response).get('access_token'):
            token = json.loads(response).get('access_token')
            Option.set_option('access_token', token)
            session['access_token'] = access_token
        else:
            abort(403)  # TODO deal with get access_token error
    else:
        pass


@main.route('/')
def index():
    # return urllib2.urlopen('http://www.baidu.com').read()
    url = (current_app.config['API_SERVER_API_URL'] or 'http://api.parser.cc/api/v1.0/')+'slides'
    response = request_api_url(url).read()
    slides = json.loads(response).get('slides')
    return render_template('test_slides.html', slides=slides)
