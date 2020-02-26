from django.shortcuts import render
from django.http import HttpResponse
from datetime import date, time, datetime, tzinfo
import datetime
from bson.objectid import ObjectId
import sys
import django
import rest_framework

def index(request):
    showtext = '<h1> Welcome to the Django APP! </h1>'
    
    try:

        showtext = showtext + '<p> <b>Current time</b> = %s </p>' % datetime.datetime.now()
        showtext = showtext + '<p> <b>Version of python</b> = %s </p>' % sys.version
        showtext = showtext + '<p> <b>Version of django</b> = %s </p>' % django.get_version()
        showtext = showtext + '<p> <b>Version of rest_framework</b> = %s </p>' % rest_framework.VERSION

    except Exception as e:
        showtext = showtext + '<p> exception=%s </p>' % e
    
    return HttpResponse('<div>' + showtext + '</div>')