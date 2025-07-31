from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'subject', 'uploader', 'pdf_file', 'tags', 'is_paid', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at', 'uploader']
