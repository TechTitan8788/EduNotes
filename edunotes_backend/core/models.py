from django.db import models
from django.contrib.auth.models import User

class Field(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Year(models.Model):
    year = models.CharField(max_length=20)

    def __str__(self):
        return self.year

class Subject(models.Model):
    name = models.CharField(max_length=100)
    field = models.ForeignKey(Field, on_delete=models.CASCADE)
    year = models.ForeignKey(Year, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.year})"

class Note(models.Model):
    title = models.CharField(max_length=200)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    uploader = models.ForeignKey(User, on_delete=models.CASCADE)
    pdf_file = models.FileField(upload_to='notes/')
    tags = models.CharField(max_length=200, blank=True)  # Comma-separated tags
    is_paid = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
