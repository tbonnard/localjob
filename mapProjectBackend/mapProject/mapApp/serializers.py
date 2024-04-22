from rest_framework import serializers
from .models import Property, Project, User, Follow, SaveJob, ApplyJob


class PropertySerializer(serializers.ModelSerializer):
    owner_uuid = serializers.SerializerMethodField()

    def get_owner_uuid(self, obj):
        return obj.owner.uuid

    class Meta:
        model = Property
        #fields = '__all__'
        exclude = ['owner', "creator"]


class ProjectSerializer(serializers.ModelSerializer):
    properties = serializers.SerializerMethodField()
    class Meta:
        model = Project
        #fields = '__all__'
        exclude = ['creator']


    def get_properties(self, obj):
        selected_properties = Property.objects.filter(pk=obj.property.id).distinct()
        return PropertySerializer(selected_properties, many=True).data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', "email_confirmed", "uuid"]
        # pour ne pas display le password en return
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # Permet de hash le password lors du create user
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id',  'email', "uuid"]


class FollowSerializer(serializers.ModelSerializer):
    properties = serializers.SerializerMethodField()
    follower_uuid = serializers.SerializerMethodField()

    def get_follower_uuid(self, obj):
        return obj.follower.uuid

    def get_properties(self, obj):
        selected_properties = Property.objects.filter(pk=obj.property.id).distinct()
        return PropertySerializer(selected_properties, many=True).data

    class Meta:
        model = Follow
        # fields = '__all__'
        fields = ['id', 'follower_uuid', 'property', 'properties']


class SaveJobSerializer(serializers.ModelSerializer):
    user_uuid = serializers.SerializerMethodField()

    def get_user_uuid(self, obj):
        return obj.user.uuid

    class Meta:
        model = SaveJob
        # fields = '__all__'
        fields = ['id', 'user_uuid', 'job', 'saved']


class ApplyJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplyJob
        # fields = '__all__'
        fields = ['id', 'user', 'job', 'applied']
