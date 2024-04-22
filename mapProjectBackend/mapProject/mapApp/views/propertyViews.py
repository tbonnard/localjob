import requests
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import json
from django.http import JsonResponse
from django.http import Http404
from decimal import Decimal
from django.db.models import Q

import osmnx as ox

from ..utils.validateUserPerm import validate_record_owner_user

from ..serializers import PropertySerializer
from ..models import Property, User

from ..utils import distanceCoordinates


class PropertyView(APIView):
    def get(self, request):
        queryset = Property.objects.all()
        if queryset is not None:
            serializer = PropertySerializer(queryset, many=True)
            return Response(serializer.data)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)

    def post(self, request):
        property_data = request.data.get("property")
        if property_data is None:
            return Response({"error": "Property data is missing"}, status=status.HTTP_400_BAD_REQUEST)

        user_data = request.data.get("user")
        if user_data is None or "uuid" not in user_data:
            return Response({"error": "User data or UUID is missing"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = PropertySerializer(data=property_data)
        property_already_created = Property.objects.filter(osm_id=property_data.get('osm_id'), osm_type=property_data.get('osm_type')).first()

        if property_already_created:
            serializer = PropertySerializer(property_already_created)
            return Response(serializer.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            property_created = Property.objects.get(pk=serializer.data['id'])

            # Handling address data
            address_data = property_data.get('address', {})
            property_created.house_number = address_data.get('house_number', None)
            property_created.road = address_data.get('road', None)
            property_created.suburb = address_data.get('suburb', None)
            property_created.city = address_data.get('city', None)
            property_created.county = address_data.get('county', None)
            property_created.region = address_data.get('region', None)
            property_created.state = address_data.get('state', None)
            property_created.postcode = address_data.get('postcode', None)
            property_created.country = address_data.get('country', None)

            # Setting creator and owner
            creator_uuid = user_data.get("uuid")
            creator_requester = User.objects.filter(uuid=creator_uuid).first()
            if creator_requester:
                property_created.creator = creator_requester
                property_created.owner = creator_requester

            property_created.save()

            # Setting name if missing
            if property_created.name is None or property_created.name == '':
                property_created.name = property_created.display_name
                property_created.save()

            new_serializer = PropertySerializer(property_created)
            return Response(new_serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PropertyCheckView(APIView):
    def post(self, request):
        serializer = PropertySerializer(data=request.data)
        propertyAlreadyCreated = Property.objects.filter(osm_id=request.data['osm_id'],
                                                         osm_type=request.data['osm_type']).first()
        if propertyAlreadyCreated:
            serializer = PropertySerializer(propertyAlreadyCreated)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)


class PropertyOwner(APIView):
    def get(self, request, uuid, format=None):
        owner = User.objects.filter(uuid=uuid).first()
        if owner:
            property_owner = Property.objects.filter(owner=owner)
            serializer = PropertySerializer(property_owner, many=True)
            return Response(serializer.data)


class PropertyDetailsView(APIView):
    """
    Retrieve, update or delete an instance.
    """
    def get_object(self, uuid):
        try:
            return Property.objects.filter(uuid=uuid).first()
        except Property.DoesNotExist:
            raise Http404

    def get(self, request, uuid, format=None):
        instance = self.get_object(uuid)
        serializer = PropertySerializer(instance)
        return Response(serializer.data)

    def post(self, request):
        serializer = PropertySerializer(data=request.data)
        # CHECK IF ALREADY EXISTS
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, uuid, format=None):
        #print(request.data)
        instance = self.get_object(uuid)
        serializer = PropertySerializer(instance, data=request.data)
        #print(request.data)
        if validate_record_owner_user(request.data["user"]["uuid"], request.data["id"] , 0):
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response('No right', status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, uuid, format=None):
        instance = self.get_object(uuid)
        instance.delete()
        return Response('Data erased', status=status.HTTP_204_NO_CONTENT)


class PropertySearchParameter(APIView):
    def post(self, request):
        terms = request.data['itemObject'].split()
        q_objects = Q()
        for term in terms:
            # q_objects |= Q(name__icontains=term) | Q(display_name__icontains=term)
            q_objects &= Q(display_name__icontains=term)
        properties = Property.objects.filter(q_objects)
        if properties.exists():
            serializer = PropertySerializer(properties, many=True)
            return Response(serializer.data)
        else:
            return Response('No data', status=status.HTTP_204_NO_CONTENT)


class PropertyQueryLocationView(APIView):
    def post(self, request):
        coordinatesLatRequested = Decimal(request.data['itemObject']['latitude'])
        coordinatesLonRequested = Decimal(request.data['itemObject']['longitude'])
        allProperties = Property.objects.filter(active=True)
        propertiesInDistance = []
        for i in allProperties:
                valueDistance = distanceCoordinates.get_distance(coordinatesLatRequested, coordinatesLonRequested,
                                                             i.lat, i.lon)
                if (valueDistance <= 10):
                    propertiesInDistance.append(i)
        if len(propertiesInDistance) > 0:
            serializer = PropertySerializer(propertiesInDistance, many=True)
            return Response(serializer.data)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)


class PropertyQueryLocationViewNotInDBAll(APIView):
    def post(self, request):
        coordinatesLatRequested = Decimal(request.data['itemObjectSearchAround']['coordinates']['lat'])
        coordinatesLonRequested = Decimal(request.data['itemObjectSearchAround']['coordinates']['lon'])
        allProperties = request.data['itemObjectSearchAround']['properties']
        propertiesInDistance = []
        for i in allProperties:
            valueDistance = distanceCoordinates.get_distance(coordinatesLatRequested, coordinatesLonRequested,
                                                             i['lat'], i['lon'])
            if (valueDistance <= 10):
                    propertiesInDistance.append(i)
        if len(propertiesInDistance) > 0:
            # serializer = PropertySerializer(propertiesInDistance, many=True)
            # return Response(serializer.data)
            return JsonResponse(propertiesInDistance, safe=False)
        return Response('No data', status=status.HTTP_204_NO_CONTENT)


class PropertyQueryLocationDBView(APIView):
    def post(self, request):
        propertiesToReturn = []
        for i in request.data['itemObject']:
            if (Property.objects.filter(osm_id=i['osm_id'],
                                                     osm_type=i['osm_type']).first()):
                propertyToAdd = Property.objects.filter(osm_id=i['osm_id'],
                                                     osm_type=i['osm_type']).first()
                serializer = PropertySerializer(propertyToAdd)
                propertiesToReturn.append(serializer.data)
            else:
                propertiesToReturn.append((i))
        return JsonResponse(propertiesToReturn, safe=False)


# osmnx.features.features_from_bbox(north, south, east, west, tags)
# osmnx.features.features_from_point(center_point, tags, dist=1000)
# https://osmnx.readthedocs.io/en/stable/user-reference.html

class PropertyQueryLocationAroundView(APIView):
    def post(self, request):
        infoEx = ox.features.features_from_point((request.data['itemObject']['lat'],request.data['itemObject']['lng']),
                                                 tags={"amenity": True}, dist=100)
        return JsonResponse(infoEx.to_json(), safe=False)
