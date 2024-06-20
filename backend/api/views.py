from typing import Any

from django.contrib.auth.models import User
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response

from . import custom_permissions
from .models import Category, Profile, Task
from .serializers import CategorySerializer, ProfileSerializer, TaskSerializer, UserSerializer


class CreateUserView(generics.CreateAPIView):
    """新規ユーザー作成(username+password)ビュー"""

    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class ListUserView(generics.ListAPIView):
    """ユーザーリスト取得ビュー"""

    queryset = User.objects.all()
    serializer_class = UserSerializer


class LoginUserView(generics.RetrieveUpdateAPIView):
    """ログインユーザー情報取得ビュー"""

    serializer_class = UserSerializer

    def get_object(self) -> User:
        """ログイン中のユーザー情報を返します

        Returns:
            User: ユーザーオブジェクト
        """
        return self.request.user

    def update(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """PUTメソッドを禁止します

        Args:
            request (Any): リクエスト

        Returns:
            Response: エラーレスポンス(400 BAD REQUEST)
        """
        response = {"message": "PUT method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    """プロフィール 作成/更新ビュー"""

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer: ProfileSerializer) -> None:
        """プロフィールを作成します

        Args:
            serializer (ProfileSerializer): プロフィールシリアライザーオブジェクト
        """
        serializer.save(user_profile=self.request.user)

    def destroy(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """DELETEメソッドを禁止します

        Args:
            request (Any): リクエスト

        Returns:
            Response: エラーレスポンス(400 BAD REQUEST)
        """
        response = {"message": "DELETE method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """PATCHメソッドを禁止します

        Args:
            request (Any): リクエスト

        Returns:
            Response: エラーレスポンス(400 BAD REQUEST)
        """
        response = {"message": "PATCH method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CategoryViewSet(viewsets.ModelViewSet):
    """カテゴリ作成ビュー"""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def destroy(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """DELETEメソッドを禁止します

        Args:
            request (Any): リクエスト

        Returns:
            Response: エラーレスポンス(400 BAD REQUEST)
        """
        response = {"message": "DELETE method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """PUTメソッドを禁止します

        Args:
            request (Any): リクエスト

        Returns:
            Response: エラーレスポンス(400 BAD REQUEST)
        """
        response = {"message": "PUT method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """PATCHメソッドを禁止します

        Args:
            request (Any): リクエスト

        Returns:
            Response: エラーレスポンス(400 BAD REQUEST)
        """
        response = {"message": "PATCH method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class TaskViewSet(viewsets.ModelViewSet):
    """タスク作成/取得/更新/削除ビュー"""

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # タスクの操作(削除/編集)はowner(タスク作成者)のみ許可する
    permission_classes = (
        permissions.IsAuthenticated,
        custom_permissions.OwnerPermission,
    )

    def perform_create(self, serializer: TaskSerializer) -> None:
        """タスクを作成します

        Args:
            serializer (TaskSerializer): タスクシリアライザー
        """
        serializer.save(owner=self.request.user)

    def partial_update(self, request: Any, *args: Any, **kwargs: Any) -> Response:
        """PATCHメソッドを禁止します

        Args:
            request (Any): リクエスト

        Returns:
            Response: エラーレスポンス(400 BAD REQUEST)
        """
        response = {"message": "PATCH method is not allowed"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
