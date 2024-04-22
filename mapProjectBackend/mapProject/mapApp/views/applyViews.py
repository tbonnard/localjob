import requests
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import json
from django.http import Http404

from ..serializers import ApplyJobSerializer, ProjectSerializer
from ..models import User, Project, ApplyJob


# DOIT CHANGER LES ID EN UUID POUR LE USER

class AppliesJobView(APIView):
    def post(self, request):
        queryset = ApplyJob.objects.filter(user=request.data['user'], applied=True)
        if queryset is not None:
            serializer = ApplyJobSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)


class ApplyjobView(APIView):
    def get(self, request):
        queryset = ApplyJob.objects.all().order_by('order')
        if queryset is not None:
            serializer = ApplyJobSerializer(queryset, many=True)
            return Response(serializer.data)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)

    def post(self, request):
        applyjobAlreadyCreated = ApplyJob.objects.filter(job=Project.objects.filter(pk=request.data['job']).first(),
                                                         user=User.objects.filter(pk=request.data['user']).first()).first()
        if applyjobAlreadyCreated:
            return Response('Already created', status=status.HTTP_204_NO_CONTENT)

        if (Project.objects.filter(pk=request.data['job'])):
            user = User.objects.get(pk=request.data['user'])
            project=Project.objects.filter(pk=request.data['job']).first()
            newSave = ApplyJob(user=user, job=project, applied=True)
            newSave.save()
            serializer = ApplyJobSerializer(newSave)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        serializerJob = ProjectSerializer(data=request.data['job'])
        if serializerJob.is_valid(raise_exception=True):
            serializerJob.save()
            user = User.objects.get(pk=request.data['user'])
            job = Project.objects.get(pk=serializerJob.data['id'])
            newApply = ApplyJob(user=user, job=job, applied=True)
            newApply.save()
            serializer = ApplyJobSerializer(newApply)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApplyjobViewDetailsView(APIView):
    """
    Retrieve, update or delete an instance.
    """
    def get_object(self, pk):
        try:
            return ApplyJob.objects.get(pk=pk)
        except ApplyJob.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        instance = self.get_object(pk)
        serializer = ApplyJobSerializer(instance)
        return Response(serializer.data)

    def post(self, request):
        serializer = ApplyJobSerializer(data=request.data)
        # CHECK IF ALREADY EXISTS
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        instance = self.get_object(pk)
        serializer = ApplyJobSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        instance = self.get_object(pk)
        instance.delete()
        return Response('Data erased', status=status.HTTP_204_NO_CONTENT)