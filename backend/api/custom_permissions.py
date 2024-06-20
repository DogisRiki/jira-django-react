from typing import Any

from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import View


class OwnerPermission(permissions.BasePermission):
    """オーナーのみ更新を許可するカスタムパーミッション"""

    def has_object_permission(self, request: Request, view: View, obj: Any) -> bool:
        """オブジェクトへのアクセス権をチェックします

        Args:
            request (Request): リクエスト
            view (View): ビューインスタンス
            obj (Any): アクセス対象のモデルインスタンス

        Returns:
            bool: アクセスの許可状態(許可されている: True, 許可されていない: False)
        """
        # 安全なメソッド(GET、OPTIONS、HEAD)の場合は全てのユーザーに許可
        if request.method in permissions.SAFE_METHODS:
            return True
        # それ以外のメソッドの場合はオーナーのみ許可
        return isinstance(request.user, User) and obj.owner.id == request.user.id
