from django.urls import path
from .views import (csrfTokenViews, propertyViews, projectViews,
                    authViews, followViews, saveViews, applyViews)
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('get-csrf-token/', csrf_exempt(csrfTokenViews.get_csrf_token), name='get_csrf_token'),
    path('register/', authViews.RegisterView.as_view()),
    path('login/', authViews.LoginView.as_view()),
    path('logout/', authViews.LogoutView.as_view()),
    path('user/<str:uuid>/', authViews.UserAuthView.as_view()),
    path('user/admin/', authViews.UsersAPIView.as_view()),
    path('user/admin/<int:pk>/', authViews.UserView.as_view()),
    path('property/', propertyViews.PropertyView.as_view()),
    path('property/<str:uuid>/', propertyViews.PropertyDetailsView.as_view()),
    path('propertyowner/<str:uuid>/', propertyViews.PropertyOwner.as_view()),
    path('propertycheck/', propertyViews.PropertyCheckView.as_view()),
    path('querylocation/', propertyViews.PropertyQueryLocationView.as_view()),
    path('querylocationparameter/', propertyViews.PropertySearchParameter.as_view()),
    path('querylocationdb/', propertyViews.PropertyQueryLocationDBView.as_view()),
    path('querylocationaround/', propertyViews.PropertyQueryLocationAroundView.as_view()),
    path('querylocationaroundall/', propertyViews.PropertyQueryLocationViewNotInDBAll.as_view()),
    path('projects/', projectViews.ProjectsView.as_view()), #projects related to a property
    path('projectsall/', projectViews.ProjectsAllView.as_view()), #projects active or not related to a property
    path('projectsfollowedpropertiesuser/', projectViews.ProjectsUserFollowedPropertyView.as_view()), #projects related to property followed by the user
    path('projectssavedsuser/', projectViews.ProjectsUserSavedView.as_view()), #projects saved by the user
    path('projectsappliedsuser/', projectViews.ProjectsUserAppliedView.as_view()), #projects applied by the user
    path('project/<str:uuid>/', projectViews.ProjectDetailsView.as_view()),
    path('project/', projectViews.ProjectView.as_view()),
    path('allprojects/', projectViews.ProjectAllNearbyView.as_view()),
    path('follows/', followViews.FollowsView.as_view()),
    path('follow/', followViews.FollowView.as_view()),
    path('follow/<int:pk>/', followViews.FollowViewDetailsView.as_view()),
    path('saves/', saveViews.SavesJobView.as_view()),
    path('save/', saveViews.SavejobView.as_view()),
    path('save/<int:pk>/', saveViews.SaveJobViewDetailsView.as_view()),
    path('applies/', applyViews.AppliesJobView.as_view()),
    path('apply/', applyViews.ApplyjobView.as_view()),
    path('apply/<int:pk>/', applyViews.ApplyjobViewDetailsView.as_view()),
]