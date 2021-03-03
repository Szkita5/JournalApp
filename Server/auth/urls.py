from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>', views.UserDetail.as_view()),
    path('login/', views.signin),
    path('user_info/', views.user_info),
]
