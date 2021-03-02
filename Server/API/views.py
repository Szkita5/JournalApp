from rest_framework import viewsets
from .serializers import ResourceSerializer
from .models import Resource
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all().order_by('id')
    serializer_class = ResourceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
