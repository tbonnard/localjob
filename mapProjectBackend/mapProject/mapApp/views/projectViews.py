import requests
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import json
from django.http import Http404

from ..serializers import ProjectSerializer, PropertySerializer
from ..models import Project, Property, User, Follow, SaveJob, ApplyJob

from ..utils.validateUserPerm import validate_record_owner_user

from .propertyViews import PropertyCheckView

#projects related to a property
class ProjectsView(APIView):
    def post(self, request):
        if (Property.objects.filter(osm_id=request.data['osm_id'], osm_type=request.data['osm_type'])):
            queryset = Project.objects.filter(active=True,
                                              property=Property.objects.filter(osm_id=request.data['osm_id'],
                                                                               osm_type=request.data['osm_type']).first()).order_by('-created')
            serializer = ProjectSerializer(queryset, many=True)
            return Response(serializer.data)
        queryset = Project.objects.none()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)


class ProjectsAllView(APIView):
    def post(self, request):
        #print(request.data)
        if (Property.objects.filter(osm_id=request.data["cie"]['osm_id'], osm_type=request.data["cie"]['osm_type'])):
            propertyToCheck = Property.objects.filter(osm_id=request.data["cie"]['osm_id'],
                                                                               osm_type=request.data["cie"]['osm_type']).first()
            userReq = request.data.get('user')
            if userReq is not None:
                uuidUser = userReq.get('uuid')
                if uuidUser is not None:
                    userRequester = User.objects.filter(uuid=request.data["user"]['uuid']).first()
                    if propertyToCheck.owner == userRequester:
                        queryset = Project.objects.filter(property=Property.objects.filter(osm_id=request.data["cie"]['osm_id'],
                                                                                           osm_type=request.data["cie"]['osm_type']).first()).order_by('-created')
                        serializer = ProjectSerializer(queryset, many=True)
                        return Response(serializer.data)
                    else:
                        queryset = Project.objects.filter(active=True,
                                                          property=Property.objects.filter(
                                                              osm_id=request.data["cie"]['osm_id'],
                                                              osm_type=request.data["cie"][
                                                                  'osm_type']).first()).order_by('-created')
                        serializer = ProjectSerializer(queryset, many=True)
                        return Response(serializer.data)
            else:
                queryset = Project.objects.filter(active=True,
                                                  property=Property.objects.filter(osm_id=request.data["cie"]['osm_id'],
                                                                                   osm_type=request.data["cie"]['osm_type']).first()).order_by('-created')
                serializer = ProjectSerializer(queryset, many=True)
                return Response(serializer.data)
        queryset = Project.objects.none()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)



class ProjectsUserFollowedPropertyView(APIView):
    def post(self, request):
        propertiesFollowedbyUser = [i.property for i in Follow.objects.filter(follower=User.objects.filter(uuid=request.data['user']).first())]
        projectsToReturn = Project.objects.filter(active=True, property__in=propertiesFollowedbyUser).order_by('-created')
        serializer = ProjectSerializer(projectsToReturn, many=True)
        return Response(serializer.data)


class ProjectsUserSavedView(APIView):
    def post(self, request):
        saved_jobs = SaveJob.objects.filter(user=User.objects.filter(uuid=request.data['uuid']).first(), saved=True).values_list('job_id', flat=True)
        projects_saved = Project.objects.filter(id__in=saved_jobs, active=True).order_by('-updated')
        serializer = ProjectSerializer(projects_saved, many=True)
        return Response(serializer.data)


class ProjectsUserAppliedView(APIView):
    def post(self, request):
        applied_jobs = ApplyJob.objects.filter(user=User.objects.get(pk=request.data['id']), applied=True).values_list('job_id', flat=True)
        projects_applied = Project.objects.filter(id__in=applied_jobs, active=True).order_by('-updated')
        serializer = ProjectSerializer(projects_applied, many=True)
        return Response(serializer.data)


class ProjectView(APIView):
    def get(self, request):
        queryset = Project.objects.all()
        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        if (Property.objects.filter(osm_id=request.data['property']['osm_id'], osm_type=request.data['property']['osm_type'])):
            property=Property.objects.filter(osm_id=request.data['property']['osm_id'], osm_type=request.data['property']['osm_type']).first()
            creator = User.objects.filter(uuid=request.data['user']['uuid']).first()
            if validate_record_owner_user(creator.uuid, property.id, 0):
                newProject = Project(property=property, title=request.data['title'], description=request.data['description']
                                     , creator=creator, starting_date=request.data['starting_date'],
                                     expiration_date=request.data['starting_date'], salary_frequency=request.data['salary_frequency'],
                                     salary=request.data['salary'], job_type=request.data['job_type'],
                                     job_flexibility=request.data['job_flexibility'], contact_email=request.data['contact_email'],
                                     contact_phone=request.data['contact_phone'], contact_url=request.data['contact_url'])
                newProject.save()
                if property.with_suggestions is False:
                    property.with_suggestions = True
                    property.save()
                serializer = ProjectSerializer(newProject)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response('No right', status=status.HTTP_403_FORBIDDEN)

        else:
            serializerProperty = PropertySerializer(data=request.data['property'])
            if serializerProperty.is_valid(raise_exception=True):
                serializerProperty.save()
                property = Property.objects.get(pk=serializerProperty.data['id'])
                creator = User.objects.filter(uuid=request.data['user']['uuid']).first()
                if validate_record_owner_user(creator.uuid, property.id, 0):
                    newProject = Project(property=property, title=request.data['title'],
                                         description=request.data['description'], creator=creator,
                                         starting_date=request.data['starting_date'], expiration_date=request.data['starting_date'],
                                         salary_frequency=request.data['salary_frequency'], salary=request.data['salary'],
                                         job_type=request.data['job_type'], job_flexibility=request.data['job_flexibility'],
                                         contact_email=request.data['contact_email'], contact_phone=request.data['contact_phone'],
                                         contact_url=request.data['contact_url'])
                    newProject.save()
                    if property.with_suggestions is False:
                        property.with_suggestions = True
                        property.save()
                    serializer = ProjectSerializer(newProject)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response('No right', status=status.HTTP_403_FORBIDDEN)
            return Response(serializerProperty.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectAllNearbyView(APIView):
    def post(self, request):
        allProperties = request.data
        allProjects = []
        for i in allProperties:
            try:
                projectsFromProperty = Project.objects.filter(active=True, property=Property.objects.get(pk=i['id'])).order_by('-created')
                for y in projectsFromProperty:
                    allProjects.append(y)
            except:
                pass
        allProjectsSorted = sorted(allProjects, key=lambda x: x.created, reverse=True)
        serializer = ProjectSerializer(allProjectsSorted, many=True)
        return Response(serializer.data)

class ProjectDetailsView(APIView):
    """
    Retrieve, update or delete an instance.
    """
    def get_object(self, uuid):
        try:
            return Project.objects.filter(uuid=uuid).first()
        except Project.DoesNotExist:
            raise Http404

    def get(self, request, uuid, format=None):
        instance = self.get_object(uuid)
        serializer = ProjectSerializer(instance)
        return Response(serializer.data)

    def put(self, request, uuid, format=None):
        instance = self.get_object(uuid)
        serializer = ProjectSerializer(instance, data=request.data)
        #print(request.data)
        if validate_record_owner_user(request.data["user"]["uuid"], request.data["id"] , 1):
            if serializer.is_valid():
                serializer.save()
                property_project = instance.property
                property_jbs = Project.objects.filter(property=property_project, active=True)
                if len(property_jbs) > 0:
                    if property_project.with_suggestions is False:
                        property_project.with_suggestions = True
                        property_project.save()
                else:
                    if property_project.with_suggestions is True:
                        property_project.with_suggestions = False
                        property_project.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response('No right', status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, uuid, format=None):
        instance = self.get_object(uuid)
        instance.delete()
        return Response('Data erased', status=status.HTTP_204_NO_CONTENT)