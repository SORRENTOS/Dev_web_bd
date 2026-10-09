# Plataforma E-commerce - Buonero

> **Asignatura:** Desarrollo de Aplicaciones Web / Proyecto Solemne 02
> **Sección:** P03
> **Año / Semestre:** 2026 - Segundo Semestre  

---

## 1. Identificación del Equipo y Roles
*COLOQUEN SUS NOMBRES DE GIT Y AGREGR RESPONSABILIDADES*

| Integrante | Rol Principal | Nombre / Usuario GitHub | Responsabilidades Principales |
| :--- | :--- | :--- | :--- |
| **Benjamín Rodrigez** | **Scrum Master (SM)** | `@SORRENTOS` | responsabilidad |
| **Antonella Araya** | **Developer** | `@nombre` | responsabilidad |
| **David Bravo** | **Developer** | `@eldeivith` | responsabilidad |
| **Jazmín Ruz** | **Developer** | `@kriscrosua` | responsabilidad |
| **Gullermo Tolentino** | **Developer** | `@nombre` | responsabilidad |
| **Nicolás Venegas** | **Developer** | `@Nicow647` | responsabilidad |

---

## 2. Contexto, Alcance y Mejoras Opcionales

### 2.1 Contexto del Negocio
* **Rubro seleccionado:** Venta de Armas
* **Nombre Comercial:** Buonero
* **Identidad Visual:** *AÑADIR DESCRIPCION*
* **Moneda de Operación:** Pesos Chilenos (`CLP`)

### 2.2 Alcance del Sistema
* **Páginas Públicas:** *AÑADIR DESCRIPCION*
* **Módulo Administrativo:** *AÑADIR DESCRIPCION*
* **Roles de Usuario y Reglas de Negocio:**
  * **Visitante:** Navegación, catálogo, carrito.
  * **Cliente Activo:** Compra autenticada, reserva temporal de stock (15 min), consulta de historial propio.
  * **Administrador Activo:** Gestión completa de la plataforma, sin facultad de compra o autorecorrido en checkout.
  * **Usuario Bloqueado:** Denegación total de inicio de sesión y acciones autenticadas.

### 2.3 Mejoras Opcionales / Características Adicionales
* *AÑADIR DESCRIPCION*

---

## 3. Arquitectura, Diagramas, Servicios y Datos

El proyecto está diseñado bajo una **Arquitectura de Microservicios** desacoplados que consumen y exponen contratos API REST.

### 3.1 Diagrama de Arquitectura
```
*COLOCAR DIAGRAMA AQUI*
```

### 3.2 Desglose de Microservicios y Propiedad de Datos

*AÑADIR DESCRIPCION*

---

## 4. Versiones, Compatibilidad y Prerrequisitos

### 4.1 Tecnologías Utilizadas
* **Frontend:** React `^18.x` (con Vite)
* **Backend:** Python `^3.11` / Django `6.1.1` / Django REST Framework `3.18.1`
* **Bases de Datos:** PostgreSQL `^15.x` / MongoDB `^6.x` (soporte para transacciones multidocumento / Replica Set en desarrollo/producción)
* **Pasarela de Pago:** Sandbox

### 4.2 Cuentas y Servicios de Terceros Necesarios
* *AÑADIR DESCRIPCION*

---

## 5. Instalación Desde Clon Limpio y Comandos por Servicio. 

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/SORRENTOS/Dev_web_bd.git
   ```

2. **Activar entorno virtual:**
   ```bash
   -- definir que entorno virtual vamos a usar
   ```

3. **Servicio de Gestión (PostgreSQL):**
   ```bash
   -- colocar código aquí
   ```

4. **Servicio de Catálogo e Inventario (MongoDB):**
   ```bash
   -- colocar código aquí
   ```

5. **Servicio de Comercio (PostgreSQL):**
   ```bash
   -- colocar código aquí
   ```

6. **Frontend (React + Vite):**
   ```bash
   -- colocar código aquí
   ```

---

## 6. Variables de Entorno Sin Secretos

### 6.1 Cod
```
-- colocar código aquí
```

---

## 7. Datos Iniciales y Primer Administrador Seguro

*AÑADIR DESCRIPCION*

---

## 8. Pruebas, Reportes; Estados, Reservas e Idempotencia

*AÑADIR DESCRIPCION*

---

## 9. URLs, Despliegue Remoto, Cuotas y Persistencia

*AÑADIR DESCRIPCION*

---

## 10. Logs, Reintentos, Respaldos y Recuperación.

*AÑADIR DESCRIPCION*

---

## 11. Trazabilidad, Contribuciones y Limitaciones Conocidas

*AÑADIR DESCRIPCION*

---

## 12. Procedencia y Licencias de Recursos

* **Librerías de Terceros:** *AÑADIR LIBRERIAS*
* **Documentación Oficial de Referencia:**
  * [Django](https://www.djangoproject.com/)
  * [Django REST Framework](https://www.django-rest-framework.org/)
  * [ISO/IEC](https://www.iso.org/standard/78176.html)
  * [MongoDB Atomicity](https://www.mongodb.com/docs/manual/core/write-operations-atomicity/)
  * [MongoDB Transactions](https://www.mongodb.com/docs/manual/core/transactions/)