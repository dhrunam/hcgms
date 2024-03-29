"""hcgms_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
##from accounts import views as account_views

from django.conf import settings
# from django.conf import settings
from django.conf.urls.static import static


from hcgms_api.configuration import urls as conf_url
from hcgms_api.account import urls as acc_url
from hcgms_api.operation import urls as op_url
from hcgms_api.inventory import urls as inv_url

urlpatterns = [
    path("", include(op_url)),
    path("", include(acc_url)),
    path('', include(conf_url)),
    path("", include(inv_url)),
    path('admin/', admin.site.urls),
]
