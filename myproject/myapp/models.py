# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',  # Change this to avoid clash
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_user_permissions',  # Change this to avoid clash
        blank=True,
    )

class Hall(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField()
    dimensions = models.CharField(max_length=50)
    square_feet = models.IntegerField()
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    accommodation = models.CharField(max_length=100)
    features = models.TextField()

class Booking(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('Card', 'Card'),
        ('GPay', 'GPay'),
        # Add more payment methods if needed
    ]

    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.name} - {self.amount}'
