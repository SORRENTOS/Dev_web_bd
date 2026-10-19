# Task Campus

Task Campus es una plataforma web interactiva diseñada para la creación y gestión de listas de tareas (To-Do list), orientada a facilitar la organización y mejorar la productividad de sus usuarios.

## Equipo de Desarrollo

| Nombre                  | Rol                   |
| :---------------------- | :-------------------- |
| **Benjamín Rodríguez**  | **Scrum Master (SM)** |
| **Antonella Araya**     | **Developer**         |
| **David Bravo**         | **Developer**         |
| **Jazmín Ruz**          | **Developer**         |
| **Guillermo Tolentino** | **Developer**         |
| **Nicolás Venegas**     | **Developer**         |

## Tecnologías Clave

Este proyecto está construido con un enfoque en el rendimiento y una sólida experiencia de desarrollo:

- **React & React DOM:** Librerías principales para la construcción de la interfaz de usuario.
- **Vite:** Entorno de desarrollo local ultrarrápido y herramienta de construcción.
- **TypeScript:** Añade tipado estático al proyecto, mejorando la mantenibilidad del código y reduciendo errores.
- **Oxlint:** Linter de alto rendimiento basado en Rust, diseñado para validaciones de código rápidas.
- **LightningCSS:** Procesador CSS ultrarrápido para el manejo y optimización de estilos.
- **Nanoid:** Utilidad para la generación de identificadores de strings únicos y compactos (ideal para manejar las _keys_ de las listas de tareas).

## Requisitos Previos

- [Node.js](https://nodejs.org/) (Versión recomendada: 18 o superior)
- Gestor de paquetes (`npm`, `yarn` o `pnpm`)

## Instalación y Ejecución

1. Accede al directorio raíz del proyecto desde tu terminal:

   ```bash
   cd taskcampus
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

## Construcción para Producción

Para compilar la aplicación y prepararla para su despliegue estático, ejecuta:

```bash
npm run build
```

Este proceso empaquetará y optimizará los archivos en el directorio de salida (generalmente `dist/`).

## Linting

Para ejecutar el análisis estático de código y detectar posibles mejoras o errores, utiliza:

```bash
npx oxlint
```
