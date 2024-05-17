from django.urls import path
from . import views

urlpatterns = [
  path('customer', views.customer_views, name='customer-list-create'),
  path('customer/<int:pk>', views.customer_views, name='customer-update'),
  path('plan', views.plan_views, name='plan-list-create'),
  path('plan/<int:pk>', views.plan_views, name='plan-update'),
  path('vehicle', views.vehicle_views, name='vehicle-list-create'),
  path('vehicle/<int:pk>', views.vehicle_views, name='vehicle-update'),
]