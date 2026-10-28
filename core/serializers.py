from rest_framework import serializers


class ImagenSerializer(serializers.Serializer):
    url = serializers.CharField()
    alt = serializers.CharField(required=False, allow_blank=True, default="")


class ProductoSerializer(serializers.Serializer):
    id = serializers.CharField(source="_id", read_only=True)
    nombre = serializers.CharField(max_length=120)
    descripcion = serializers.CharField()
    precio = serializers.FloatField(min_value=0.01)
    moneda = serializers.CharField(required=False, default="CLP", max_length=10)
    categoria = serializers.CharField(required=False, default="general", max_length=50)
    stock_fisico = serializers.IntegerField(min_value=0)
    stock_reservado = serializers.IntegerField(required=False, min_value=0, default=0)
    imagenes = ImagenSerializer(many=True)
    activo = serializers.BooleanField(default=True)
    version = serializers.IntegerField(required=False, min_value=1, default=1)
    creado_en = serializers.DateTimeField(read_only=True)
    actualizado_en = serializers.DateTimeField(read_only=True)

    def validate(self, data):
        stock_fisico = data.get("stock_fisico")
        stock_reservado = data.get("stock_reservado")
        if stock_fisico is not None and stock_reservado is not None:
            if stock_reservado > stock_fisico:
                raise serializers.ValidationError(
                    {"stock_reservado": "No puede ser mayor que stock_fisico."}
                )

        imagenes = data.get("imagenes", None)
        if imagenes is not None:
            if len(imagenes) < 4 or len(imagenes) > 6:
                raise serializers.ValidationError(
                    {"imagenes": "Debe incluir entre 4 y 6 imagenes."}
                )
            for imagen in imagenes:
                if not imagen.get("url"):
                    raise serializers.ValidationError(
                        {"imagenes": "Cada imagen debe tener una url valida."}
                    )

        if "nombre" in data and not str(data.get("nombre", "")).strip():
            raise serializers.ValidationError({"nombre": "No puede estar vacio."})
        if "descripcion" in data and not str(data.get("descripcion", "")).strip():
            raise serializers.ValidationError({"descripcion": "No puede estar vacio."})

        return data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if "_id" in instance:
            data["id"] = str(instance["_id"])
        return data