from django.db import models

# Create your models here.

class Customer(models.Model):
  name = models.CharField(max_length=50)
  card_id = models.CharField(max_length=10)

  def __str__(self):
    return self.name


class Vehicle(models.Model):
  plate = models.CharField(max_length=10)
  model = models.CharField(max_length=30, null=True, blank=True)
  description = models.CharField(max_length=50, null=True, blank=True)
  customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)

  def __str__(self):
    return self.plate
  

class Plan(models.Model):
  description = models.CharField(max_length=50)
  value = models.DecimalField(max_digits=10, decimal_places=2)

  def __str__(self):
    return self.description
  

class CustomerPlan(models.Model):
  customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
  plan_id = models.ForeignKey(Plan, on_delete=models.CASCADE)
  due_date = models.DateTimeField(null=True)

  def __str__(self):
    return f'customer: {self.customer_id}, plan:{self.plan_id}'
  

class Contract(models.Model):
  description = models.CharField(max_length=50)
  max_value = models.DecimalField(max_digits=10, decimal_places=2)

  def __str__(self):
    return self.description


class ContractRule(models.Model):
  contract_id = models.ForeignKey(Contract, on_delete=models.CASCADE)
  until = models.IntegerField()
  value = models.DecimalField(max_digits=10, decimal_places=2)

  def __str__(self):
    return f'contract: {self.contract_id}, until: {self.until}, value: {self.value}'
  

class ParkMovement(models.Model):
  entry_date = models.DateTimeField(auto_now_add=True)
  exit_date = models.DateTimeField(null=True, blank=True)
  vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
  value = models.DecimalField(max_digits=10, decimal_places=2)

  def __str__(self):
    return f'entry:{self.entry_date}, exit:{self.exit_date}'
