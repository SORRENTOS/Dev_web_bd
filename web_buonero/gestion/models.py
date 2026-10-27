from django.db import models

class Usuario(models.Model):
    # Opciones predefinidas para el rol
    ROLES = [
        ('VISITANTE', 'Visitante'),
        ('CLIENTE', 'Cliente'),
        ('ADMINISTRADOR', 'Administrador'),
    ]

    nombre = models.CharField(max_length=100, null=True, blank=True)
    apellido = models.CharField(max_length=100, null=True, blank=True)
    correo = models.EmailField(max_length=240, unique=True, null=True, blank=True)
    rol = models.CharField(max_length=50, choices=ROLES, default='VISITANTE', null=True, blank=True)

    # Atributos de llenado automático para fechas
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.rol}"