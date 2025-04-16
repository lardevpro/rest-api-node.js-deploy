
<img src="https://github.com/user-attachments/assets/ed00e76f-8df9-4404-981b-4b35027ec043" alt="Mi imagen" width="900"/>



# 📦 Node MVC CRUD App

# 📦 Node MVC CRUD App

Aplicación desarrollada con arquitectura MVC utilizando **Node.js** y **Express**.  
Actualmente en desarrollo el **CRUD en el frontend**.

## ⚙️ Tecnologías utilizadas

- **Node.js** con Express
- **Zod** para validaciones
- **CORS** para gestión de políticas de acceso
- **Render** como plataforma de hosting
- **PostgreSQL** alojado en **Supabase**

## 🌐 Estado del servidor

> El servidor puede tardar en responder inicialmente debido a que entra en reposo cuando no hay actividad.

## 🔐 Variables de entorno

> Por motivos de seguridad, el archivo `.env` no está incluido en el repositorio.

Asegúrate de crear tu propio `.env` con las variables necesarias para la conexión a la base de datos y otros servicios.

## 🚧 Estado actual

- Backend funcional con validaciones y rutas organizadas por capas
- Conexión a base de datos PostgreSQL lista
- CRUD en frontend en proceso

## 📁 Estructura del proyecto

project-root/ ├── src/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── validators/ │ └── app.js ├── .env (no incluido) └── package.json

bash
Copiar
Editar

## 🛠️ Instalación

```bash
git clone https://github.com/tuusuario/nombre-repo.git
cd nombre-repo
npm install
npm run dev
