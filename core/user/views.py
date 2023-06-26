from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib import auth

from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


class TestingClassBasedView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        print(f"self={self}")
        print(f"request={request}")
        print(f"format={format}")

        return Response("hellow")

@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': "CSRF cookie set"}) 

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self,request, format=None):
        users = User.objects.all()

        users = UserSerializer(users, many=True)

        return Response(users.data)
    
@method_decorator(csrf_protect, name="dispatch")
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        isAuthenticated = User.is_authenticated

        if isAuthenticated:
            return Response({'isAuthenticated': "success"})
        else:
            return Response({'isAuthenticated': "error"})

@method_decorator(csrf_protect, name="dispatch")
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        email = data['email']
        password1 = data['password1']
        password2 = data['password2']

        if password1 != password2:
            return Response({'Error': "Passwords do not match"})
        
        if User.objects.filter(email=email).exists():
            return Response({'Error': "email already exist"})
        
        if len(password1) < 6:
            return Response({'Error': "Password must be at least 6 characters"})
        
        # try:

        user = User.objects.create_user(email=email, password=password1, username=email)
        # user.save()

        user = User.objects.get(id=user.id)
        print(1)
        return Response({'success': 'User created successfully'})
        # except: 
        #     return Response({'error': 'Somegthin went wrong when registering account'})

@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        try:
            data = self.request.data
            username = data['username']
            password = data['password']
            print(username, password)
            user = auth.authenticate(username=username, password=password)

            if user is None:
                return Response({'error': 'Error Authenticating'})
            auth.login(request, user)
            print("logged in")
            return Response({'success': 'User authenticated', 'username':username})
        except:
            return Response({'error': 'Something went wrong when logging user'})
        
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Logged out'})
        except:
            return Response({'error': 'Something went wrong when logging out'})

class GetUserInfo(APIView):
    def get(self, request, format=None):
        user = request.user
        user = UserSerializer(user).data

        return Response({'logged_user': user})