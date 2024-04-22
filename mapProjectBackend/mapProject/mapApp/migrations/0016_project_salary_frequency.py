# Generated by Django 5.0.4 on 2024-04-09 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapApp', '0015_property_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='salary_frequency',
            field=models.CharField(choices=[('HOUR', 'Par heure'), ('DAY', 'Par jour'), ('MONTH', 'Par mois'), ('YEAR', 'Par an')], default='HOUR', max_length=255),
        ),
    ]