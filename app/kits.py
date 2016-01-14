# coding=utf-8

import urllib
import urllib2

from flask import session
from flask.ext.login import current_user

from models import Option


def request_api_url(url, private=False):
    if private:
        token = session.get('user_access_token') or current_user.access_token
    else:
        token = session.get('access_token') or Option.get_option('access_token')
    print token
    headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/47.0.2526.106 Safari/537.36',
        'X-TOKEN': token
    }
    request = urllib2.Request(url, headers=headers)
    response = urllib2.urlopen(request)
    return response
