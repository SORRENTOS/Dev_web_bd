from datetime import datetime, timezone

from bson import ObjectId
from bson.errors import InvalidId
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .mongo import get_productos_collection
from .serializers import ProductoSerializer


def _normalizar_documento(documento):
    if not documento:
        return None
    documento = dict(documento)
    documento["_id"] = str(documento["_id"])
    return documento


def _obtener_object_id(pk):
    try:
        return ObjectId(pk), None
    except InvalidId:
        return None, Response(
            {"detalle": "El id del producto no es valido."},
            status=status.HTTP_400_BAD_REQUEST,
        )


def _normalizar_entrada(datos, nombre_por_defecto="", parcial=False):
    if not isinstance(datos, dict):
        return datos

    datos = dict(datos)

    if "stock" in datos and "stock_fisico" not in datos:
        datos["stock_fisico"] = datos.pop("stock")
    if "stockFisico" in datos and "stock_fisico" not in datos:
        datos["stock_fisico"] = datos.pop("stockFisico")

    if "imagen" in datos and "imagenes" not in datos:
        imagen = datos.pop("imagen")
        datos["imagenes"] = [imagen] if imagen else []

    imagenes = datos.get("imagenes")
    if isinstance(imagenes, list):
        imagenes_normalizadas = []
        for item in imagenes:
            if isinstance(item, str):
                imagenes_normalizadas.append(
                    {"url": item, "alt": datos.get("nombre", nombre_por_defecto)}
                )
            elif isinstance(item, dict):
                imagenes_normalizadas.append(item)
        datos["imagenes"] = imagenes_normalizadas

    if not parcial:
        if "moneda" not in datos:
            datos["moneda"] = "CLP"
        if "stock_reservado" not in datos:
            datos["stock_reservado"] = 0
        if "version" not in datos:
            datos["version"] = 1

    return datos


@api_view(["GET", "POST"])
def productos_lista_crear(request):
    coleccion = get_productos_collection()

    if request.method == "GET":
        filtros = {}

        activo = request.query_params.get("activo")
        if activo is not None:
            filtros["activo"] = activo.lower() == "true"

        categoria = request.query_params.get("categoria")
        if categoria:
            filtros["categoria"] = categoria

        documentos = [
            _normalizar_documento(documento) for documento in coleccion.find(filtros)
        ]
        serializer = ProductoSerializer(documentos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    datos = _normalizar_entrada(request.data)
    serializer = ProductoSerializer(data=datos)

    if serializer.is_valid():
        datos_validados = serializer.validated_data
        ahora = datetime.now(timezone.utc)
        datos_validados["activo"] = datos_validados.get("activo", True)
        datos_validados["creado_en"] = ahora
        datos_validados["actualizado_en"] = ahora

        resultado = coleccion.insert_one(datos_validados)
        datos_validados["_id"] = str(resultado.inserted_id)

        return Response(
            ProductoSerializer(datos_validados).data,
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def producto_detalle(request, pk):
    coleccion = get_productos_collection()

    object_id, error = _obtener_object_id(pk)
    if error:
        return error

    documento = coleccion.find_one({"_id": object_id})
    if not documento:
        return Response(
            {"detalle": "Producto no encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":
        return Response(
            ProductoSerializer(_normalizar_documento(documento)).data,
            status=status.HTTP_200_OK,
        )

    if request.method in ("PUT", "PATCH"):
        parcial = request.method == "PATCH"
        datos = _normalizar_entrada(
            request.data, documento.get("nombre", ""), parcial=parcial
        )
        serializer = ProductoSerializer(data=datos, partial=parcial)

        if serializer.is_valid():
            actualizacion = serializer.validated_data
            actualizacion["actualizado_en"] = datetime.now(timezone.utc)

            if "stock_fisico" in actualizacion:
                reservado_actual = documento.get("stock_reservado", 0)
                if actualizacion["stock_fisico"] < reservado_actual:
                    return Response(
                        {
                            "stock_fisico": (
                                "No puede ser menor que el stock reservado actual."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            coleccion.update_one({"_id": object_id}, {"$set": actualizacion})

            documento_actualizado = coleccion.find_one({"_id": object_id})
            return Response(
                ProductoSerializer(_normalizar_documento(documento_actualizado)).data,
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    coleccion.update_one(
        {"_id": object_id},
        {
            "$set": {
                "activo": False,
                "actualizado_en": datetime.now(timezone.utc),
            }
        },
    )
    documento_actualizado = coleccion.find_one({"_id": object_id})
    return Response(
        ProductoSerializer(_normalizar_documento(documento_actualizado)).data,
        status=status.HTTP_200_OK,
    )


@api_view(["PATCH"])
def producto_activar(request, pk):
    coleccion = get_productos_collection()

    object_id, error = _obtener_object_id(pk)
    if error:
        return error

    resultado = coleccion.update_one(
        {"_id": object_id},
        {
            "$set": {
                "activo": True,
                "actualizado_en": datetime.now(timezone.utc),
            }
        },
    )

    if resultado.matched_count == 0:
        return Response(
            {"detalle": "Producto no encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )

    documento = coleccion.find_one({"_id": object_id})
    return Response(
        ProductoSerializer(_normalizar_documento(documento)).data,
        status=status.HTTP_200_OK,
    )


@api_view(["PATCH"])
def producto_desactivar(request, pk):
    coleccion = get_productos_collection()

    object_id, error = _obtener_object_id(pk)
    if error:
        return error

    resultado = coleccion.update_one(
        {"_id": object_id},
        {
            "$set": {
                "activo": False,
                "actualizado_en": datetime.now(timezone.utc),
            }
        },
    )

    if resultado.matched_count == 0:
        return Response(
            {"detalle": "Producto no encontrado."},
            status=status.HTTP_404_NOT_FOUND,
        )

    documento = coleccion.find_one({"_id": object_id})
    return Response(
        ProductoSerializer(_normalizar_documento(documento)).data,
        status=status.HTTP_200_OK,
    )