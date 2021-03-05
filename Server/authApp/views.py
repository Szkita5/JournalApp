from rest_framework import generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_200_OK,
)
from rest_framework.response import Response

from .serializers import UserSerializer, UserSigninSerializer, UserRegisterSerializer
from .authentication import token_expire_handler, expires_in


@api_view(["POST"])
@permission_classes([AllowAny])
def signin(request):
    signin_serializer = UserSigninSerializer(data=request.data)
    if not signin_serializer.is_valid():
        return Response(signin_serializer.errors, status=HTTP_400_BAD_REQUEST)

    user = authenticate(
        username=signin_serializer.data['username'],
        password=signin_serializer.data['password'],
    )
    if not user:
        return Response({'detail': 'Invalid Credentials or activate account'}, status=HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    is_expired, token = token_expire_handler(token)
    user_serialized = UserSerializer(user)

    return Response({
        'user': user_serialized.data,
        'expires_in': expires_in(token),
        'token': token.key
    }, status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    register_serializer = UserRegisterSerializer(data=request.data)
    if not register_serializer.is_valid():
        return Response(register_serializer.errors, status=HTTP_400_BAD_REQUEST)

    if not register_serializer.data['password'] == register_serializer.data['confirm_password']:
        return Response({'detail': 'Passwords must match'}, status=HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=register_serializer.data['username']).exists():
        return Response({'detail': 'Username already exists'}, status=HTTP_400_BAD_REQUEST)
    else:
        user = User.objects.create_user(register_serializer.data['username'],
                                        register_serializer.data['email'],
                                        register_serializer.data['password'])

    token, _ = Token.objects.get_or_create(user=user)
    is_expired, token = token_expire_handler(token)
    user_serialized = UserSerializer(user)

    return Response({
        'user': user_serialized.data,
        'expires_in': expires_in(token),
        'token': token.key
    }, status=HTTP_200_OK)


@api_view(["GET"])
def user_info(request):
    return Response({
        'user': request.user.username,
        'expires_in': expires_in(request.auth)
    }, status=HTTP_200_OK)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
