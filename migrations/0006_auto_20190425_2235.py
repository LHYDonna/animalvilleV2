# Generated by Django 2.1.7 on 2019-04-25 12:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('puzzle', '0005_auto_20190425_2228'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='specie',
        ),
        migrations.AddField(
            model_name='specie',
            name='photo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='puzzle.Photo'),
        ),
    ]
