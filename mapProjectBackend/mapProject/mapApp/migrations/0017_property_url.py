# Generated by Django 5.0.4 on 2024-04-10 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mapApp', '0016_project_salary_frequency'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='url',
            field=models.URLField(blank=True, max_length=2048, null=True),
        ),
    ]