import uuid

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


def upload_avatar_path(instance: "Profile", filename: str) -> str:
    """アップロードするアバター画像のファイルパスを返します

    Args:
        instance (Profile): Profileモデルインスタンス
        filename (str): 保存するアバター画像のファイル名

    Returns:
        str: ファイルパス
    """
    file_extension = filename.split(".")[-1]
    return "/".join(["avatars", str(instance.user_profile.id) + str(".") + str(file_extension)])


class Profile(models.Model):
    """Profileモデル"""

    user_profile = models.OneToOneField(User, related_name="user_profile", on_delete=models.CASCADE)
    img = models.ImageField(blank=True, null=True, upload_to=upload_avatar_path)

    def __str__(self) -> str:
        return str(self.user_profile.username)


class Category(models.Model):
    """Categoryモデル"""

    item = models.CharField(max_length=100)

    def __str__(self) -> str:
        return str(self.item)


class Task(models.Model):
    """Taskモデル"""

    STATUS = (("1", "Not started"), ("2", "On going"), ("3", "Done"))
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    task = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    criteria = models.CharField(max_length=100)
    status = models.CharField(max_length=40, choices=STATUS, default="1")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    estimate = models.IntegerField(validators=[MinValueValidator(0)])
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    responsible = models.ForeignKey(User, on_delete=models.CASCADE, related_name="responsible")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.task)
