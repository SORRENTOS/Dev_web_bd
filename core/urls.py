from django.urls import path

from . import views

urlpatterns = [
    path("api/productos/", views.productos_lista_crear, name="productos-lista-crear"),
    path(
        "api/productos/<str:pk>/activar/",
        views.producto_activar,
        name="producto-activar",
    ),
    path(
        "api/productos/<str:pk>/desactivar/",
        views.producto_desactivar,
        name="producto-desactivar",
    ),
    path("api/productos/<str:pk>/", views.producto_detalle, name="producto-detalle"),
]