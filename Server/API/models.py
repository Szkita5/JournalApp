from django.db import models


class Resource(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    url = models.URLField(blank=True)
    dateCreated = models.DateTimeField()
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
