from rest_framework import viewsets
from . import models as models
from bson.objectid import ObjectId
from . import api_serializers as api_ser
from django.views.decorators.csrf import csrf_exempt 
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib import auth
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes


''' e.g. http://localhost:9900/account_read_all '''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def account_read_all(request):  
    if request.method == 'GET':
        try:
            data_list = []
            current_users = User.objects.all()
            # current_users = User.objects.get(is_active=True)
            for tmpuser in current_users:
                #print('--------account_read_all-------', get_token(tmpuser) )
                acc = models.accountModel( 
                    tmpuser.get_username(),
                    tmpuser.password,
                    tmpuser.email,
                    tmpuser.is_staff,
                    tmpuser.is_superuser,
                    tmpuser.is_active,
                    get_token(tmpuser)
                )
                data_list.append(acc)            
            serializedList = api_ser.accountSerializer(data_list, many=True)
            return Response(serializedList.data)
        except ObjectDoesNotExist:
            return Response({'status':'account_read_all ObjectDoesNotExist'})
    else:
        return Response({'status':'account_read_all fail'})


''' e.g. http://localhost:9900/account_read_one/user1 '''
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def account_read_one(request, accountname):   
    if request.method == 'GET':
        try:
            existing_user = User.objects.get(username=accountname)
            
            return_user = models.accountModel( 
                existing_user.get_username(),
                existing_user.password,
                existing_user.email,
                existing_user.is_staff,
                existing_user.is_superuser,
                existing_user.is_active,
                get_token( existing_user )
            )        
            serializedList = api_ser.accountSerializer(return_user, many=False)
            return Response(serializedList.data)
        except ObjectDoesNotExist:
            return Response({'status':'account_read_one ObjectDoesNotExist'})
    else:
        return Response({'status':'account_read_one fail'})


'''
e.g. http://localhost:9900/account_create/
request.data = { 
    "username": "user1", 
    "password" : "user1pwd", 
    "email" : "user1@test.mysite.com",
    "is_staff" : true,
    "is_superuser" : false,
    "is_active" : true,
    "auth_token" : "none"
}
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def account_create(request):
    serialized = api_ser.accountSerializer(data = request.data)
    if serialized.is_valid():
        return_user = None
        try:
            existing_user = User.objects.get( username = request.data.get("username") )
            return Response({'status':'account_create user already exists'})

        except ObjectDoesNotExist:
            new_user = User.objects.create_user(
                request.data.get("username"), 
                password=request.data.get("password")
            )
            new_user.set_password( request.data.get("password") )
            new_user.email = request.data.get("email")               
            new_user.is_superuser = request.data.get("is_superuser")
            new_user.is_staff = request.data.get("is_staff")
            new_user.save()

            return_user = models.accountModel( 
                new_user.get_username(),
                new_user.password,
                new_user.email,
                new_user.is_staff,
                new_user.is_superuser,
                new_user.is_active,
                get_token( new_user )
            )

        serializedList = api_ser.accountSerializer(return_user, many=False)
        return Response(serializedList.data)   
    else:
        return Response(serialized._errors)


'''
e.g. http://localhost:9900/account_update/
request.data = { 
    "username": "user1", 
    "password" : "user1_pwd", 
    "email" : "user_1@test.mysite.com",
    "is_staff" : false,
    "is_superuser" : true,
    "is_active" : true,
    "auth_token" : "none"
}
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def account_update(request):
    serialized = api_ser.accountSerializer(data = request.data)
    if serialized.is_valid():
        return_user = None
        try:
            existing_user = User.objects.get( username = request.data.get("username") )
            existing_user.set_password( request.data.get("password") )
            existing_user.email = request.data.get("email")               
            existing_user.is_superuser = request.data.get("is_superuser")
            existing_user.is_staff = request.data.get("is_staff")
            existing_user.save()

            return_user = models.accountModel( 
                existing_user.get_username(),
                existing_user.password,
                existing_user.email,
                existing_user.is_staff,
                existing_user.is_superuser,
                existing_user.is_active,
                get_token( existing_user )
            )
            serializedList = api_ser.accountSerializer(return_user, many=False)
            return Response(serializedList.data) 

        except ObjectDoesNotExist:
            return Response({'status':'account_update: the user does not exist'})
    else:
        return Response(serialized._errors)


''' 
e.g. http://localhost:9900/account_deactivate/
request.data = { "username": "user1" } 
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def account_deactivate(request):
    serialized = api_ser.accountSerializer(data = request.data)
    if serialized.is_valid():
        return_user = None
        try:
            existing_user = User.objects.get( username = request.data.get("username") )
            existing_user.is_active = False
            existing_user.save()
            return_user = models.accountModel( 
                existing_user.get_username(),
                existing_user.password,
                existing_user.email,
                existing_user.is_staff,
                existing_user.is_superuser,
                existing_user.is_active,
                get_token( existing_user )
            )
            serializedList = api_ser.accountSerializer(return_user, many=False)
            return Response(serializedList.data) 

        except ObjectDoesNotExist:
            return Response({'status':'account_deactivate: the user does not exist'})
    else:
        return Response(serialized._errors)


''' 
e.g. http://localhost:9900/account_activate/
request.data = { "username": "user1" } 
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def account_activate(request):
    serialized = api_ser.accountSerializer(data = request.data)
    if serialized.is_valid():
        return_user = None
        try:
            existing_user = User.objects.get( username = request.data.get("username") )
            existing_user.is_active = True
            existing_user.save()
            return_user = models.accountModel( 
                existing_user.get_username(),
                existing_user.password,
                existing_user.email,
                existing_user.is_staff,
                existing_user.is_superuser,
                existing_user.is_active,
                get_token( existing_user )
            )
            serializedList = api_ser.accountSerializer(return_user, many=False)
            return Response(serializedList.data) 

        except ObjectDoesNotExist:
            return Response({'status':'account_activate: the user does not exist'})
    else:
        return Response(serialized._errors)


'''
e.g. http://localhost:9900/account_login/
request.data = { "username": "admin", "password" : "admin123456" }
request.data = { "username": "user1", "password" : "user1_pwd" }
request.data = { "username": "user2", "password" : "user2pwd" }
'''
@api_view(['POST'])
def account_login(request):
    serialized = api_ser.accountSerializer(data = request.data)
    if serialized.is_valid():
        try:
            existing_user = User.objects.get( username = request.data.get("username") )
            check = existing_user.check_password( request.data.get("password") )
            if check is True:
                if existing_user.is_active:
                    auth_user = auth.authenticate(
                        username= existing_user.get_username(), 
                        password= request.data.get("password")
                    )
                    if auth_user is not None:
                        auth.login(request, auth_user)
                        # print('--------account_login-------',auth_user.is_authenticated)
                        # token, _ = Token.objects.get_or_create(user=user)
                        new_token, created = Token.objects.get_or_create( user=auth_user )
                        return_user = models.accountModel( 
                            existing_user.get_username(),
                            existing_user.password,
                            existing_user.email,
                            existing_user.is_staff,
                            existing_user.is_superuser,
                            existing_user.is_active,
                            new_token.key
                        )
                        serializedList = api_ser.accountSerializer(return_user, many=False)
                        return Response(serializedList.data)
                    else:
                        return Response({'status':'account_login: invalid credentials'})                    
                else:
                    return Response({'status':'account_login: unavailable user'})
            else:
                return Response({'status':'account_login: the password is not correct'})
        except ObjectDoesNotExist:
            return Response({'status':'account_login: the user does not exist'})
    else:
        return Response(serialized._errors)


'''
e.g. http://localhost:9900/account_logout/
request.data = { "username": "user1" }
'''
@api_view(['POST'])
def account_logout(request):
    serialized = api_ser.accountSerializer(data = request.data)
    if serialized.is_valid():
        try:
            existing_user = User.objects.get( username = request.data.get("username") )
            auth.logout(request)
            existing_user.auth_token.delete()
            return Response({'status':'account_logout: done'})

        except ObjectDoesNotExist:
            return Response({'status':'account_logout: the user does not exist'})
    else:
        return Response(serialized._errors)


def get_token( checking_user):
    return_string = None
    try:
        return_string = checking_user.auth_token
    except:
        return_string = None
    return return_string
