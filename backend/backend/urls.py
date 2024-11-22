from django.urls import include, path
from django.contrib import admin
from rest_framework import routers

from transactions import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'transactions', views.TransactionViewSet,
                basename='transaction')

urlpatterns = [
    path('api/', include(router.urls)),
    path(
        'api/api-auth/',
        include('rest_framework.urls', namespace='rest_framework')
    ),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
]
