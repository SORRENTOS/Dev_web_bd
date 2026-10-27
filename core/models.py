from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ROLES = (
        ('CLIENTE', 'Cliente'),
        ('ADMIN', 'Administrador'),
    )
    rol = models.CharField(max_length=10, choices=ROLES, default='CLIENTE')
    email = models.EmailField(unique=True) # RF-11: Correo único

    def __str__(self):
        return f"{self.email} ({self.rol})"

class TemaVisual(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    identificador = models.CharField(max_length=20, unique=True)
    activo = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre

class MensajeContacto(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField()
    mensaje = models.TextField(max_length=2000)
    fecha_recepcion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Mensaje de {self.nombre} - {self.correo}"
