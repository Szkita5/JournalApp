from django.db import models


class Resource(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    url = models.URLField(blank=True)
    dateCreated = models.DateTimeField()

    def __str__(self):
        return self.name
