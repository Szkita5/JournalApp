from rest_framework import viewsets
from .serializers import ResourceSerializer
from .models import Resource


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all().order_by('id')
    serializer_class = ResourceSerializer
