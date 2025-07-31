from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import NoteSerializer
from .models import Note

class NoteUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Login required

    def post(self, request, format=None):
        data = request.data.copy()
        data['uploader'] = request.user.id  # Assign logged-in user
        serializer = NoteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Note uploaded successfully", "note": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
