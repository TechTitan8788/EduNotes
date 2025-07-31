from django.urls import path
from .views import NoteUploadView

urlpatterns = [
    path('upload-note/', NoteUploadView.as_view(), name='upload-note'),
]
