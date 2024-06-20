from django.contrib import admin

from .models import Category, Profile, Task

[admin.site.register(model) for model in [Category, Profile, Task]]
