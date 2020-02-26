from django.db import models

# Create your models here.

class accountModel(object):
    def __init__(self, username, password, email, is_staff, is_superuser, is_active, auth_token):
       self.username =username
       self.password = password
       self.email = email
       self.is_staff = is_staff
       self.is_superuser = is_superuser
       self.is_active = is_active
       self.auth_token = auth_token
