import requests
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import json
from django.http import Http404

from ..serializers import SaveJobSerializer, ProjectSerializer
from ..models import User, Project, SaveJob


class SavesJobView(APIView):
    def post(self, request):
        user = User.objects.filter(uuid=request.data['user']).first()
        queryset = SaveJob.objects.filter(user=user, saved=True)
        if queryset is not None:
            serializer = SaveJobSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)


class SavejobView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = SaveJob.objects.all().order_by('order')
        if queryset is not None:
            serializer = SaveJobSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)

    def post(self, request, *args, **kwargs):
        savejobAlreadyCreated = SaveJob.objects.filter(job=Project.objects.filter(pk=request.data['job']).first(),
                                                         user=User.objects.filter(uuid=request.data['user']).first()).first()
        if savejobAlreadyCreated:
            return Response('Already created', status=status.HTTP_204_NO_CONTENT)

        if (Project.objects.filter(pk=request.data['job'])):
            user = User.objects.filter(uuid=request.data['user']).first()
            project=Project.objects.filter(pk=request.data['job']).first()
            newSave = SaveJob(user=user, job=project, saved=True)
            newSave.save()
            serializer = SaveJobSerializer(newSave)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        serializerJob = ProjectSerializer(data=request.data['job'])
        if serializerJob.is_valid(raise_exception=True):
            serializerJob.save()
            user = User.objects.get(uuid=request.data['user']).first()
            job = Project.objects.get(pk=serializerJob.data['id'])
            newSave = SaveJob(user=user, job=job, saved=True)
            newSave.save()
            serializer = SaveJobSerializer(newSave)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class SaveJobViewDetailsView(APIView):
    """
    Retrieve, update or delete an instance.
    """
    def get_object(self, pk):
        try:
            return SaveJob.objects.get(pk=pk)
        except SaveJob.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        instance = self.get_object(pk)
        serializer = SaveJobSerializer(instance)
        return Response(serializer.data)

    def post(self, request):
        serializer = SaveJobSerializer(data=request.data)
        # CHECK IF ALREADY EXISTS
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        instance = self.get_object(pk)
        serializer = SaveJobSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        instance = self.get_object(pk)
        instance.delete()
        return Response('Data erased', status=status.HTTP_204_NO_CONTENT)