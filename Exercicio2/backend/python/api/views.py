from rest_framework.response import Response
from rest_framework.decorators import api_view
from cloudpark.models import Customer, Plan, Vehicle
from .serializers import CustomerSerializer, PlanSerializer, VehicleSerializer

# CUSTOMER VIEWS 

def find_all_customers(request):
  customers = Customer.objects.all()
  serializer = CustomerSerializer(customers, many=True)
  return Response(serializer.data)
  
def create_customer(request):
  serializer = CustomerSerializer(data=request.data)

  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=400)

def update_customer(request, pk):
  try:
    customer = Customer.objects.get(pk=pk)
  except Customer.DoesNotExist:
    return Response({'error': 'Customer not found'}, status=400)
  serializer = CustomerSerializer(customer, data=request.data, partial=True)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=400)



@api_view(['GET', 'POST', 'PUT', 'PATCH'])
def customer_views(request, pk=None):
  match request.method:
    case 'GET':
      return find_all_customers(request)
    case 'POST':
      return create_customer(request)
    case 'PUT' | 'PATCH':
      return update_customer(request, pk)
    

# PLAN VIEWS 
    
def find_all_plans(request):
  plans = Plan.objects.all()
  serializer = PlanSerializer(plans, many=True)
  return Response(serializer.data)

def create_plan(request):
  serializer = PlanSerializer(data=request.data)

  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=400)

def update_plan(request, pk):
  try:
    plan = Plan.objects.get(pk=pk)
  except Plan.DoesNotExist:
    return Response({'error': 'Plan not found'}, status=400)
  serializer = PlanSerializer(plan, data=request.data, partial=True)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=400)

@api_view(['GET', 'POST', 'PUT', 'PATCH'])
def plan_views(request, pk=None):
  match request.method:
    case 'GET':
      return find_all_plans(request)
    case 'POST':
      return create_plan(request)
    case 'PUT' | 'PATCH':
      return update_plan(request, pk)
    

# VEHICLE VIEWS

def find_all_vehicles(request):
  vehicles = Vehicle.objects.all()
  serializer = VehicleSerializer(vehicles, many=True)
  return Response(serializer.data)

def create_vehicle(request):
  serializer = VehicleSerializer(data=request.data)

  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=400)

def update_vehicle(request, pk):
  try:
    vehicle = Vehicle.objects.get(pk=pk)
  except Vehicle.DoesNotExist:
    return Response({'error': 'Vehicle not found'}, status=400)
  serializer = VehicleSerializer(vehicle, data=request.data, partial=True)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(serializer.errors, status=400)

@api_view(['GET', 'POST', 'PUT', 'PATCH'])
def vehicle_views(request, pk=None):
  match request.method:
    case 'GET':
      return find_all_vehicles(request)
    case 'POST':
      return create_vehicle(request)
    case 'PUT' | 'PATCH':
      return update_vehicle(request, pk)
    
