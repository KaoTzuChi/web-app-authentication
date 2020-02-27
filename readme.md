# Web app authentication: Angular, Python(Django) and SQLite in Docker

## Version
- Node 12.13.0
- Angular/cli 8.3.14
- Python 3.7.4
- Django 2.2.10
- SQLite3 3.27.2
- Docker 19.03.5
- Ubuntu 18.04.3 LTS


## Getting start
This example is for building a web application with authentication mechanism including user login, logout, and management operations. We will use Django authentication system to build the backend APIs, and to access user profiles in SQLlite. In the frontend, http requests would be authenticated by tokens. 

The source code of this example is [here](https://github.com/KaoTzuChi/web-app-authentication).

## Database preparation
Prepare the image of Python in docker first, and then create a container from the image.
After execute the container and we need to interact with migrations and Django.
Btw, we can find the <service_name> in docker-compose.yml and find <container_id> by "$ docker ps -a".
> $ docker-compose exec <service_name> python manage.py migrate

or
> $ docker exec -ti <container_id> ./manage.py migrate

Additionally, we can check the version of SQLite by this way: 
> $ docker-compose exec <service_name> python

> >>> import sqlite3

> >>> sqlite3.sqlite_version

or 
> $ docker-compose exec <service_name> python

> >>> from sqlite3 import dbapi2 as Database

> >>> Database.sqlite_version_info

Furthermore, we can create superusers by the command below.
> $ docker-compose exec <service_name> python manage.py createsuperuser --username=admin --email=admin@test.mysite.com

> Password: admin123456

> Password (again): admin123456

## Django authentication system

In the API views under django rest framework, we use the statements below to perform the managing operations about user.

```
from django.contrib import auth
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# get users
current_users = User.objects.all()
find_user = User.objects.get(username= 'admin' )

# create a new user
new_user = User.objects.create_user( "test_user_name", "test_user_password")
new_user.email = "testusermail@test.mysite.com"               
new_user.is_superuser = False
new_user.is_staff = False
new_user.save()

# update user profile
update_user = User.objects.get(username= 'test_user_name' )
update_user.set_password( "test_user_password_new" )
update_user.is_superuser = True
update_user.is_staff = True
update_user.save()

# deactivate / activate user
# not recommend the delete behavior for users, so we use deactivate instead
deactivate_user = User.objects.get(username= 'test_user_name' )
deactivate_user.is_active = False
deactivate_user.save()

update_user = User.objects.get(username= 'test_user_name' )
update_user.is_active = True
update_user.save()

# user login ; request is the httprequest in rest framework
login_user = User.objects.get( username= 'test_user_name' )
check = login_user.check_password('test_user_password')
if (check is True) & (login_user.is_active):
    auth_user = auth.authenticate( username= 'test_user_name', password= 'test_user_password' )
    if auth_user is not None:
        auth.login(request, auth_user)
        new_token, created = Token.objects.get_or_create( user=auth_user )

# user logout ; request is the httprequest in rest framework
logout_user = User.objects.get(username= 'test_user_name' )
auth.logout(request)
logout_user.auth_token.delete()
```

Moreover, we may need to define permissions and groups of users, but not discuss in this example.
More operations and detailed descriptions about Django authentication system, please reference [here](https://docs.djangoproject.com/en/3.0/topics/auth/default/).

<br />
The next step will be add decorators to those APIs which require authentication before access them.
```
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET/POST'])
@permission_classes([IsAuthenticated])
def test_api(request):
    ...

```

While we test the APIs requiring authentication, without login, we will get the response message: "Authentication credentials were not provided.". 
> http://localhost:9900/test_api/

For more information about API views of django REST framework, please reference [here](https://www.django-rest-framework.org/api-guide/views/).


## Access APIs by token

In the frontend app, now we have to use the issued token to access the APIs requiring authentication.
If the authentication is not necessary, our APIs fetching may looks like this.
```
let url: string = 'http://localhost:9900/';
let header: object = { headers: new HttpHeaders({'Content-Type':  'application/json'}) };

...
this.http.get<Product[]>( url+'test_api_noauth/', header )
      .pipe( tap(_ => this.log('fetched')) );
...
```


To fetch the APIs requiring authentication, we need to change the http header as below.
Assume we get the issued token from the http response of login API, and save the token in sessionStorage.
```
let header: object = {         
    headers: new HttpHeaders({
        'Content-Type':  'application/json',        
        'Authorization': 'Token ' + sessionStorage.getItem('userToken') 
    })
}
```
More details about HttpClient, please reference [here](https://angular.io/guide/http).


## References
- [See more topics in my website](http://www.tzuchikao.com/en/notes/)
- [Using the Django authentication system](https://docs.djangoproject.com/en/3.0/topics/auth/default/)
- [Django REST framework: Authentication](https://www.django-rest-framework.org/api-guide/authentication/)
- [Token based authentication for Django rest framework](https://medium.com/quick-code/token-based-authentication-for-django-rest-framework-44586a9a56fb)
- [Angular docs](https://angular.io/docs)

