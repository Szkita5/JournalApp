from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        if not User.objects.filter(username='geory').exists():
            User.objects.create_superuser('geory', 'gergely.eory@solirius.com', 'Ger_023344')
            self.stdout.write(self.style.SUCCESS('Successfully created new super user'))

        if not User.objects.filter(username='test').exists():
            User.objects.create_user('test', 'gergely.eory@gmail.com', 'Ger_023344')
            self.stdout.write(self.style.SUCCESS('Successfully created new test user'))
