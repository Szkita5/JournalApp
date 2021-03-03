from rest_framework import viewsets, permissions
from .serializers import ResourceSerializer
from .models import Resource
from rest_framework import filters, authentication
from auth.permissions import IsOwner


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all().order_by('id')
    serializer_class = ResourceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
