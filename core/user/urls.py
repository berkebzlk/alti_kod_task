from django.urls import path
from . import views


urlpatterns = [
    # Diğer URL yönlendirmeleri
    # path('', views.register, name='register'),
    path('', views.GetUserInfo.as_view()),
    path('get_users/', views.GetUsersView.as_view()),
    path('get_csrf/', views.GetCSRFToken.as_view()),
    path('authenticated/', views.CheckAuthenticatedView.as_view()),
    path('register/', views.SignupView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('logout/', views.LogoutView.as_view()),

    path('testing/', views.TestingClassBasedView.as_view())
]