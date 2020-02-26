# Web app login and authentication by token: angular, python(django rest) and sqlite in docker




**connect to sqlite**
$ docker-compose exec backend-service python manage.py migrate


**Creating super users**
$ docker-compose exec backend-service python manage.py createsuperuser --username=admin --email=admin@test.mysite.com
Password: admin123456
Password (again): admin123456


**------**
