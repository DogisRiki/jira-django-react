from django.urls import include, path
from rest_framework import routers

from .views import CategoryViewSet, CreateUserView, ListUserView, LoginUserView, ProfileViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register("category", CategoryViewSet)
router.register("tasks", TaskViewSet)
router.register("profile", ProfileViewSet)

urlpatterns = [
    path("create/", CreateUserView.as_view(), name="create"),
    path("users/", ListUserView.as_view(), name="users"),
    path("loginuser/", LoginUserView.as_view(), name="loginuser"),
    path("", include(router.urls)),
]
