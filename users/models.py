from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=50, unique=True, blank=False, null=False)
    email = models.EmailField(unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    price_indian_rupee = models.IntegerField(default=0)
    bought_from = models.CharField(max_length=200, blank=True, null=True)
    is_banned = models.BooleanField(default=False)
    banned_reason = models.TextField(blank=True, null=True)

    def clean_username(self):
        """Ensures username is always lowercase before saving."""
        self.username = self.username.lower()  # Convert username to lowercase
        return self.username

    def clean_email(self):
        """Ensures email is always lowercase before saving."""
        self.email = self.email.lower()  # Convert email to lowercase
        return self.email

    def save(self, *args, **kwargs):
        self.clean_username()  # Call clean_username before saving
        self.clean_email()  # Call clean_email before saving
        super().save(*args, **kwargs)  # Call the original save method
