from django.conf import settings
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.exceptions import AuthenticationFailed

import os

import jwt
import re
from mapApp.models import User


def jwt_middleware(get_response):

    def middleware(request):
        # Define a list of URL patterns that don't require authentication
        unauthenticated_urls = ['/admin/', '/api/logout/', '/api/projects/', '/api/allprojects/', '/api/propertycheck/',
                                '/api/querylocationaround/', '/api/querylocationaroundall/',
                                '/api/querylocation/', '/api/querylocationparameter/', '/api/querylocationdb/', '/api/choice/', '/api/login/',
                                '/api/register/', '/api/get-csrf-token/', "/api/projectsall/", "/"]

        # Check if the request URL is in the unauthenticated URLs list
        if request.path in unauthenticated_urls:
            # Skip authentication check for unauthenticated URLs
            return get_response(request)

        if request.path.startswith('/admin/'):
            return get_response(request)

        if request.path.startswith('/api/votes'):
            return get_response(request)

        if request.path.startswith('/api/property/'):
            return get_response(request)

        if request.path.startswith('/api/project/'):
            return get_response(request)

        if request.path.startswith('/api/propertyowner/'):
            return get_response(request)

        if not request.META.get('HTTP_AUTHORIZATION') or len(request.META.get('HTTP_AUTHORIZATION')) < 8:
            return JsonResponse({'error': 'No Authorization header found'}, status=401)

        try:
            token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
            SECRET_KEY_AUTH_APP = os.environ.get('SECRET_KEY_AUTH_APP')
            payload = jwt.decode(token, SECRET_KEY_AUTH_APP, algorithms=['HS256'])
            user_id = payload['id']
            user = User.objects.get(id=user_id)
            request.user = user

        except jwt.InvalidSignatureError as e:
            return JsonResponse({'error': f'Invalid signature {e}'}, status=401)
        except jwt.DecodeError as e:
            return JsonResponse({'error': f'Invalid crypto padding {e}'}, status=401)
        except jwt.exceptions.InvalidTokenError as e:
            return JsonResponse({'error': f'Invalid token {e}'}, status=401)
        except jwt.exceptions.DecodeError:
            return JsonResponse({'error': 'Invalid token.'}, status=401)
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=401)

        response = get_response(request)
        return response

    return middleware
