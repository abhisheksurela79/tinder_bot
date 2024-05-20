from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from django import forms


# Register your models here.

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('username', 'email', 'phone_number', 'price_indian_rupee', 'bought_from', 'is_banned')
    search_fields = ('username', 'email', 'phone_number')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info',
         {'fields': ('email', 'phone_number', 'price_indian_rupee', 'bought_from', 'is_banned', 'banned_reason')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )


admin.site.register(User, CustomUserAdmin)

# "email", "phone_number", "price_indian_rupee", "bought_from", "is_banned", "banned_reason"
