# Generated by Django 5.0.4 on 2024-04-10 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapApp', '0017_property_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='description',
            field=models.CharField(blank=True, max_length=2048, null=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='job_type',
            field=models.CharField(choices=[('PART_TIME', 'Temps partiel'), ('FULL_TIME', 'Temps plein'), ('CONTRACT', 'Contrat'), ('SEASON', 'Saisonnier')], default='FULL_TIME', max_length=255),
        ),
    ]