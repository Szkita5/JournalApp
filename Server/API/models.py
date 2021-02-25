from django.db import models


class Resource(models.Model):
    name = models.CharField(max_length=120)
    link = models.URLField()
    date = models.DateField()

    def __str__(self):
        return self.name
