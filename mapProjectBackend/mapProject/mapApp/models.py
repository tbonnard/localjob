from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
from datetime import datetime, timedelta
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


def validate_password_length(value):
    if len(value) < 8:
        raise ValidationError('Le mot de passe doit être de 8 caractères minimum')


# Create your models here.
class User(AbstractUser):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, blank=False)
    email_confirmed = models.BooleanField(default=False)
    # type 1 = user -- type 2 = property owner
    user_type = models.IntegerField(default=1)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # when we only want the email, not the username:
    # Remove the username field
    username = models.CharField(max_length=255, unique=False, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    password = models.CharField(_('password'), max_length=128, validators=[validate_password_length])

    def get_admin_user(self):
        return User.objects.filter(is_superuser=True).first()

# override the methods that refer to the username
    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

# Osm_id is unique only within object type
# http://www.openstreetmap.org/way/40000000 vs http://www.openstreetmap.org/node/40000000
# Number of nodes     2412050198
# Number of ways      241029453
# Number of relations 2658037
# Every OSM object follows this coding scheme in order ==> typeObject + Id + Version(?)
# > Type of object (node/way/relation)
# > Id
# > Version of object

# https://www.openstreetmap.org/node/805825943
# https://www.openstreetmap.org/[typeOSM]/[osmID]

# https://nominatim.openstreetmap.org/search.php?q=490%20rue%20des%20croisades&polygon_geojson=1&format=jsonv2


class Property(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    source = models.CharField(null=False, blank=False, max_length=20, default="osm")
    place_id = models.IntegerField(null=False, blank=False)
    osm_id = models.IntegerField(null=False, blank=False)
    osm_type = models.CharField(null=False, blank=False, max_length=20)
    lat = models.DecimalField(max_digits=21, decimal_places=16)
    lon = models.DecimalField(max_digits=21, decimal_places=16)
    name = models.CharField(null=True, blank=True, max_length=500)
    addresstype = models.CharField(null=True, blank=True, max_length=100)
    house_number = models.CharField(null=True, blank=True, max_length=255)
    road = models.CharField(null=True, blank=True, max_length=500)
    city = models.CharField(null=True, blank=True, max_length=255)
    postcode = models.CharField(null=True, blank=True, max_length=20)
    state = models.CharField(null=True, blank=True, max_length=255)
    county = models.CharField(null=True, blank=True, max_length=255)
    region = models.CharField(null=True, blank=True, max_length=255)
    country = models.CharField(null=True, blank=True, max_length=255)
    suburb = models.CharField(null=True, blank=True, max_length=255)
    type = models.CharField(null=True, blank=True, max_length=100)
    display_name = models.CharField(null=False, blank=False, max_length=2000)
    with_suggestions = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="propertyOwnerFromUser", default=1)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="propertyFromUser", default=1)
    active = models.BooleanField(default=True)
    url = models.URLField(null=True, blank=True, max_length=2048)
    description = models.CharField(null=True, blank=True, max_length=2048)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.display_name


def get_default_now_my_datetime():
    return datetime.date.today() + timedelta(days=30)


def get_default_my_datetime():
    return datetime.date.today()


class Project(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="projectFromProperty")
    title = models.CharField(null=False, blank=False, max_length=255)
    description = models.CharField(null=True, blank=True, max_length=2000)
    starting_date = models.DateField(auto_now_add=True, blank=True)
    expiration_date = models.DateField(auto_now_add=True, blank=True)
    SALARY_OPTIONS = (("HOUR", "Par heure"), ("DAY", "Par jour"), ("MONTH", "Par mois"), ("YEAR", "Par an"))
    salary_frequency = models.CharField(choices=SALARY_OPTIONS, max_length=255, default="HOUR")
    salary = models.CharField(null=True, blank=True, max_length=255)
    JOB_TYPE_CHOICES = (("PART_TIME", "Temps partiel"), ("FULL_TIME", "Temps plein"), ("CONTRACT", "Contrat"), ("SEASON", "Saisonnier"))
    job_type = models.CharField(choices=JOB_TYPE_CHOICES, max_length=255, default="FULL_TIME")
    JOB_FLEXIBILITY_CHOICES = (("AT_WORK", "Présentiel"), ("HYBRID", "Hybride"), ("FROM_HOME", "Télétravail"))
    job_flexibility = models.CharField(choices=JOB_FLEXIBILITY_CHOICES, max_length=255, default="AT_WORK")
    active = models.BooleanField(default=True)
    contact_email = models.CharField(null=True, blank=True, max_length=255)
    contact_phone = models.CharField(null=True, blank=True, max_length=255)
    contact_url = models.URLField(null=True, blank=True, max_length=2048)
    created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projectFromUser", default=1)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followFromUser")
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="followFromProperty")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['follower', 'property'], name='unique_follower_property_combination'
            )
        ]


class SaveJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saveFromUser")
    job = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="saveFromJob")
    saved = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'job'], name='unique_save_job_combination'
            )
        ]


class ApplyJob(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applyFromUser")
    job = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="applyFromJob")
    applied = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'job'], name='unique_apply_job_combination'
            )
        ]
