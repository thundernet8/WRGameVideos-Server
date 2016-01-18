# coding = utf-8

import os
import urllib
import urllib2
import time
import json
import cgi

from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
from flask import current_app
from flask import abort
from flask import session
from flask import send_file
from flask.ext.login import current_user

from . import main
from ..models import Option
from ..models import User
from ..models import generate_sign
from ..kits import request_api_url


@main.before_app_first_request
def before_app_first_request():
    return  # TODO clear
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

    lol_cate_url = (current_app.config['API_SERVER_API_URL'] or 'http://api.parser.cc/api/v1.0/')+'videos/cate/2'
    lol_cate_response = request_api_url(lol_cate_url).read()
    lol_videos = json.loads(lol_cate_response).get('videos')

    return render_template('home.html', current_app=current_app, slides=slides, lol_videos=lol_videos,
                           dota_videos=lol_videos, sh_videos=lol_videos, hs_videos=lol_videos, mc_videos=lol_videos,
                           d3_videos=lol_videos, wow_videos=lol_videos, cf_videos=lol_videos)


@main.route('/detail')
def video_detail():
    """
    detail page of a video
    request args: video_id: ID of the video
    request args: video_name: name of the video
    """
    video_id = request.args.get('video_id')
    url = (current_app.config['API_SERVER_API_URL'] or 'http://api.parser.cc/api/v1.0/')+'videos/'
    url += cgi.escape(str(video_id))

    try:
        req = request_api_url(url)
        response = req.read()
        response = json.loads(response)
        video = response.get('video')
        star_num = int(round(video.get('video_score')/10.0)*5)
        return render_template('detail.html', current_app=current_app, video=video, star_num=star_num)
    except Exception, e:
        return render_template('detail.html', current_app=current_app, video={'video_score': 0}, star_num=0)


@main.route('/channel')
def channel_home():
    """
    channel home page, list all channels/categories for choosing
    :return:
    """
    url = (current_app.config['API_SERVER_API_URL'] or 'http://api.parser.cc/api/v1.0/')\
           + 'taxonomies?taxonomy_id=2&taxonomy_id=3&taxonomy_id=4&taxonomy_id=5&taxonomy_id=6&taxonomy_id=7&' \
           'taxonomy_id=8&taxonomy_id=9'
    try:
        req = request_api_url(url)
        response = req.read()
        response = json.loads(response)
        taxonomies = response.get('taxonomies')
        return render_template('channelindex.html', current_app=current_app, taxonomies=taxonomies)
    except Exception, e:
        # TODO 404 handle, black page for iphone
        print(e)
        return render_template('channelindex.html', current_app=current_app, taxonomies=None)


@main.route('/channel/<int:channel_id>')
def channel_list(channel_id):
    """
    channel page, just a big category including some sub-categories
    :param channel_id:
    :return:
    """
    url = (current_app.config['API_SERVER_API_URL'] or 'http://api.parser.cc/api/v1.0/')+'videos/channel/'
    url += str(channel_id)
    try:
        req = request_api_url(url)
        response = req.read()
        response = json.loads(response)
        subchannels = response.get('channels')
        return render_template('channellist.html', current_app=current_app, subchannels=subchannels)
    except Exception, e:
        # TODO 404 handle, black page for iphone
        print(e)
        return render_template('channellist.html', current_app=current_app, subchannels=None)


@main.route('/channel/<int:channel_id>/list')
def channel_video_list(channel_id):
    """
    list all videos for a channel/category, including its sub-categories, ajax loads more pages
    :param channel_id:
    :return:
    """
    return render_template('list.html', current_app=current_app, channel_id=channel_id)
