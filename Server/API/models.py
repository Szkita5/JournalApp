from django.db import models


class Resource(models.Model):
    resourceName = models.CharField(max_length=120)
    resourceUrl = models.URLField()
    dateCreated = models.DateField()

    def __str__(self):
        return self.resourceName
