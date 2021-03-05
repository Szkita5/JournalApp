from rest_framework import viewsets, permissions
from .serializers import ResourceSerializer
from .models import Resource
from rest_framework import filters, authentication
from authApp.permissions import IsOwner


class ResourceViewSet(viewsets.ModelViewSet):
    model = Resource
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    serializer_class = ResourceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.request.user.posts.all()
