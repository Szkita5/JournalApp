# Generated by Django 3.1.7 on 2021-02-26 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_auto_20210226_1230'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='url',
            field=models.URLField(blank=True),
        ),
    ]