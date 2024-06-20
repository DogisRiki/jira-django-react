from typing import Any

from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Category, Profile, Task


class UserSerializer(serializers.ModelSerializer):
    """Userシリアライザー"""

    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data: dict[str, Any]) -> User:
        """検証済みのデータを基に新しいUserインスタンスを作成して返します

        Args:
            validated_data (dict[str, Any]): シリアライザからの検証済みデータ

        Returns:
            User: 作成されたUserインスタンス
        """
        user = User.objects.create_user(**validated_data)
        return user


class CategorySerializer(serializers.ModelSerializer):
    """Categoryシリアライザー"""

    class Meta:
        model = Category
        fields = ["id", "item"]


class ProfileSerializer(serializers.ModelSerializer):
    """Profileシリアライザー"""

    class Meta:
        model = Profile
        fields = ["id", "user_profile", "img"]
        extra_kwargs = {"user_profile": {"read_only": True}}


class TaskSerializer(serializers.ModelSerializer):
    """Taskシリアライザー"""

    category_item = serializers.ReadOnlyField(source="category.item", read_only=True)
    owner_username = serializers.ReadOnlyField(source="owner.username", read_only=True)
    responsible_username = serializers.ReadOnlyField(source="responsible.username", read_only=True)
    status_name = serializers.CharField(source="get_status_display", read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "task",
            "description",
            "criteria",
            "status",
            "status_name",
            "category",
            "category_item",
            "estimate",
            "responsible",
            "responsible_username",
            "owner",
            "owner_username",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"owner": {"read_only": True}}
