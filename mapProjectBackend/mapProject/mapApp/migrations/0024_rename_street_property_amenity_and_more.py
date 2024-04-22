# Generated by Django 5.0.4 on 2024-04-20 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapApp', '0023_property_city_property_country_property_housenumber_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='street',
            new_name='amenity',
        ),
        migrations.RenameField(
            model_name='property',
            old_name='province',
            new_name='county',
        ),
        migrations.RenameField(
            model_name='property',
            old_name='neighbourhood',
            new_name='region',
        ),
        migrations.AddField(
            model_name='property',
            name='road',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='property',
            name='state',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='property',
            name='suburb',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='property',
            name='display_name',
            field=models.CharField(max_length=2000),
        ),
        migrations.AlterField(
            model_name='property',
            name='name',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
