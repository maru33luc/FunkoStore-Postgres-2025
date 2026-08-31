
<div align="center">

# 🎭 Funko Store Online

### *Tu tienda de Funkos favorita — moderna, rápida y elegante*

<br/>

![Angular](https://img.shields.io/badge/Angular-16-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<br/>

> **Funko Store Online** es una aplicación web full-stack de e-commerce especializada en figuras Funko Pop. Cuenta con catálogo de productos, carrito de compras, autenticación JWT, panel de administración y datos enriquecidos desde APIs externas de universos como Pokémon, Harry Potter, Star Wars y El Señor de los Anillos.

<br/>

</div>

---

## 📋 Tabla de Contenidos

- [✨ Características](#-características)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🗄️ Base de Datos](#️-base-de-datos)
- [🔌 API REST — Endpoints](#-api-rest--endpoints)
- [🖥️ Frontend — Módulos y Componentes](#️-frontend--módulos-y-componentes)
- [🔐 Autenticación y Seguridad](#-autenticación-y-seguridad)
- [🌐 Integraciones con APIs Externas](#-integraciones-con-apis-externas)
- [⚙️ Instalación y Configuración](#️-instalación-y-configuración)
- [🚀 Despliegue](#-despliegue)
- [📁 Estructura de Carpetas](#-estructura-de-carpetas)

---

## ✨ Características

| Funcionalidad | Descripción |
|---|---|
| 🛍️ **Catálogo de Funkos** | Listado completo con imágenes, precio, stock, serie y licencia |
| 🔍 **Filtros y Orden** | Filtrado por categoría/licencia y ordenamiento de productos |
| 🛒 **Carrito de Compras** | Carrito persistente en base de datos para usuarios logueados |
| 💾 **Carrito Local** | Carrito offline con **IndexedDB** para usuarios no registrados |
| 👤 **Registro y Login** | Autenticación completa con JWT y hash de contraseñas con Bcrypt |
| 🔒 **Rutas Protegidas** | Guards de Angular para rutas de usuario y administrador |
| 🛠️ **Panel de Administración** | CRUD completo de productos (crear, editar, eliminar Funkos) |
| 🌌 **Info de Personajes** | Datos enriquecidos desde APIs de Pokémon, HP, Star Wars y Tolkien |
| 📱 **Diseño Responsivo** | Interfaz adaptable a todos los dispositivos |
| ✨ **Animaciones AOS** | Animaciones de scroll fluidas con la librería AOS |
| 🔔 **Alertas SweetAlert2** | Notificaciones elegantes para todas las acciones del usuario |
| ⏳ **Spinners ngx-spinner** | Indicadores de carga durante peticiones asíncronas |
| 📩 **Formulario de Contacto** | Integración con Formspree para envío de mensajes |
| 🎠 **Slider de Colecciones** | Carrusel de colecciones con GlideJS |

---

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENTE (Browser)                    │
│              Angular 16 — SPA — Puerto 4200              │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / REST
┌──────────────────────────▼──────────────────────────────┐
│                  SERVIDOR (Node.js + Express)            │
│                       Puerto 3000                        │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ /fk (Funkos)│  │/users (Auth) │  │/carts (Carrito)│  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬────────┘  │
│         │                │                   │           │
│  ┌──────▼────────────────▼───────────────────▼────────┐  │
│  │              Sequelize ORM (Modelos)                │  │
│  └──────────────────────┬──────────────────────────────┘  │
└─────────────────────────┼───────────────────────────────┘
                          │ SSL / TCP
┌─────────────────────────▼───────────────────────────────┐
│                  PostgreSQL — Schema: public              │
│         users │ funkos │ carts │ cart_items              │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### 🎨 Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| **Angular** | 16 | Framework principal SPA |
| **TypeScript** | 5.1 | Lenguaje tipado |
| **RxJS** | 7.8 | Programación reactiva y observables |
| **Axios** | 1.6 | Cliente HTTP para peticiones a la API |
| **SweetAlert2** | 11 | Alertas y modales elegantes |
| **ngx-spinner** | 16 | Spinners de carga |
| **AOS** | 2.3 | Animaciones al hacer scroll |
| **GlideJS** | 3.6 | Slider/carrusel de colecciones |
| **Angular Fire** | 16 | Integración con Firebase |

### ⚙️ Backend

| Tecnología | Versión | Uso |
|---|---|---|
| **Node.js** | 18+ | Runtime del servidor |
| **Express** | 4.18 | Framework web y manejo de rutas |
| **Sequelize** | 6.35 | ORM para PostgreSQL |
| **PostgreSQL** | — | Base de datos relacional |
| **pg** | 8.11 | Driver de PostgreSQL para Node |
| **JSON Web Token** | 9.0 | Autenticación stateless |
| **Bcrypt** | 5.1 | Hash seguro de contraseñas |
| **CORS** | 2.8 | Control de acceso entre dominios |
| **Nodemon** | 3.0 | Recarga automática en desarrollo |

---

## 🗄️ Base de Datos

La base de datos usa **PostgreSQL** con el schema `public` y 4 tablas relacionadas:

```
┌──────────────────┐       ┌──────────────────────┐
│      users       │       │        funkos         │
├──────────────────┤       ├──────────────────────┤
│ id (PK)          │       │ id (PK)               │
│ name             │       │ name                  │
│ last_name        │       │ serie                 │
│ email (unique)   │       │ category              │
│ password (hash)  │       │ licence               │
│ isAdmin (bool)   │       │ price (decimal)       │
│ createdAt        │       │ stock                 │
│ updatedAt        │       │ front_image (url)     │
└────────┬─────────┘       │ back_image (url)      │
         │                 │ description           │
         │ 1:1             │ createdAt / updatedAt │
┌────────▼─────────┐       └──────────┬────────────┘
│      carts       │                  │
├──────────────────┤                  │ N:M
│ id (PK)          │       ┌──────────▼────────────┐
│ id_user (FK)     │◄──────│      cart_items        │
│ createdAt        │  1:N  ├──────────────────────┤
│ updatedAt        │       │ id (PK)               │
└──────────────────┘       │ id_cart (FK)          │
                           │ id_funko (FK)         │
                           │ cantidad (smallint)   │
                           │ createdAt / updatedAt │
                           └──────────────────────┘
```

### Migraciones con Sequelize CLI

Las tablas se crean automáticamente con:

```bash
npx sequelize-cli db:migrate
```

Para revertir:

```bash
npx sequelize-cli db:migrate:undo
```

---

## 🔌 API REST — Endpoints

### 🎭 Funkos — `/fk`

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/fk` | ❌ | Obtener todos los Funkos |
| `GET` | `/fk/:id` | ❌ | Obtener un Funko por ID |
| `POST` | `/fk` | ✅ JWT | Crear un nuevo Funko |
| `PUT` | `/fk/:id` | ✅ JWT | Actualizar un Funko |
| `DELETE` | `/fk/:id` | ✅ JWT | Eliminar un Funko |

### 👤 Usuarios — `/users`

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/users` | ❌ | Obtener todos los usuarios |
| `POST` | `/users` | ❌ | Registrar nuevo usuario |
| `POST` | `/users/auth` | ❌ | Login — devuelve JWT token |
| `GET` | `/users/auth` | ✅ JWT | Verificar sesión activa |
| `POST` | `/users/logout` | ✅ JWT | Cerrar sesión |
| `GET` | `/users/:id` | ✅ JWT | Obtener usuario por ID |
| `PUT` | `/users/:id` | ✅ JWT | Actualizar usuario |
| `DELETE` | `/users/:id` | ❌ | Eliminar usuario |

### 🛒 Carrito — `/carts`

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/carts` | ❌ | Obtener todos los carritos |
| `GET` | `/carts/:id` | ❌ | Obtener carrito por ID de usuario |
| `GET` | `/carts/items/:id` | ❌ | Obtener items del carrito |
| `POST` | `/carts/items/:id` | ❌ | Agregar item al carrito |
| `PUT` | `/carts/items/:id` | ❌ | Actualizar cantidad de un item |
| `DELETE` | `/carts/items/:id` | ❌ | Eliminar item del carrito |

---

## 🖥️ Frontend — Módulos y Componentes

La app Angular está organizada en módulos con **lazy loading**:

### 🏠 `LandingPageModule` — `/home`

| Componente | Descripción |
|---|---|
| `HeroComponent` | Sección principal con imagen destacada y CTA |
| `CollectionComponent` | Slider de colecciones (HP, Pokémon, Star Wars, LOTR) |
| `AboutUsComponent` | Sección "Quiénes somos" |
| `ContactComponent` | Formulario de contacto integrado con Formspree |
| `TermsComponent` | Términos y condiciones |

### 🛍️ `ShopModule` — `/shop`

| Componente | Descripción |
|---|---|
| `ShopMainComponent` | Grid principal de productos con filtros |
| `ShopAsideComponent` | Sidebar con filtros por categoría y licencia |
| `ItemComponent` | Tarjeta individual de producto |
| `ItemPageComponent` | Detalle de producto + info del personaje desde API externa |
| `SliderComponent` | Carrusel de imágenes del producto |
| `CartComponent` | Vista del carrito de compras |
| `CartPageComponent` | Página completa del carrito con resumen de compra |

### 🔐 `AuthModule` — `/login`, `/register`

| Componente | Descripción |
|---|---|
| `LoginFormComponent` | Formulario de inicio de sesión con JWT |
| `RegisterFormComponent` | Formulario de registro de nuevo usuario |

### 🛠️ `AdminModule` — `/admin`

| Componente | Descripción |
|---|---|
| `AdminMainComponent` | Tabla de todos los Funkos con acciones |
| `AdminFormComponent` | Formulario base reutilizable para Funkos |
| `AdminNewFunkoComponent` | Formulario para crear un nuevo Funko |
| `AdminEditFunkoComponent` | Formulario para editar un Funko existente |

### 🔗 `SharedModule`

| Elemento | Descripción |
|---|---|
| `HeaderComponent` | Barra de navegación con estado de sesión |
| `FooterComponent` | Pie de página con links e isotipo |
| `AdminGuard` | Protege rutas del panel admin (requiere `isAdmin: true`) |
| `AuthLoginGuard` | Redirige usuarios ya logueados fuera del login |
| `IfAuthenticatedDirective` | Directiva para mostrar/ocultar elementos según autenticación |

---

## 🔐 Autenticación y Seguridad

El sistema usa **JWT (JSON Web Tokens)** stateless:

```
1. Usuario envía email + password  →  POST /users/auth
2. Backend verifica con Bcrypt     →  Genera token JWT (1h de expiración)
3. Frontend almacena token         →  localStorage
4. Peticiones protegidas           →  Header: Authorization: Bearer <token>
5. Middleware verifyToken          →  Valida y decodifica el token
6. Logout                          →  Elimina token del localStorage
```

- Las contraseñas se almacenan con **hash Bcrypt** (nunca en texto plano)
- El middleware `verifyToken` protege todos los endpoints de escritura
- El `AdminGuard` de Angular verifica `isAdmin: true` antes de acceder al panel
- El `AuthLoginGuard` redirige usuarios autenticados fuera de `/login`

---

## 🌐 Integraciones con APIs Externas

Cada Funko puede mostrar información del personaje que representa, consumiendo APIs públicas:

| Universo | API | Endpoint |
|---|---|---|
| ⚡ **Pokémon** | PokéAPI (JSON local) | `/pokemon/:id` |
| 🧙 **Harry Potter** | Potterhead API | `https://potterhead-api.vercel.app/api/characters` |
| 🚀 **Star Wars** | Star Wars Databank | `https://starwars-databank-server.vercel.app/api/v1/characters/name/:name` |
| 💍 **El Señor de los Anillos** | The One API | `https://the-one-api.dev/v2/character` (requiere Bearer token) |

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- PostgreSQL 14+
- Angular CLI 16

---

### 1️⃣ Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd FunkoStore-Postgres-2025
```

---

### 2️⃣ Configurar el Backend

```bash
cd server
npm install
```

Crear el archivo `.env` en la carpeta `server/`:

```env
DB_NAME=nombre_de_la_base_de_datos
DB_USER=usuario_de_la_base_de_datos
DB_PASSWORD=contraseña_de_la_base_de_datos
DB_HOST=host_de_la_base_de_datos
DB_PORT=5432
JWT_SECRET=tu_clave_secreta_jwt
```

Ejecutar las migraciones para crear las tablas:

```bash
npx sequelize-cli db:migrate
```

Importar los datos de Funkos desde el JSON:

```bash
node ./scripts/importFunkos.js
```

Iniciar el servidor backend:

```bash
npm run dev        # Desarrollo con Nodemon
npm start          # Producción
```

> El servidor estará disponible en `http://localhost:3000`

---

### 3️⃣ Configurar el Frontend

```bash
# Desde la raíz del proyecto
npm install
```

Verificar las URLs en `src/environments/environments.ts`:

```typescript
export const environments = {
    urlFunkosData: 'http://localhost:3000/fk',
    urlUsersData:  'http://localhost:3000/users',
    urlCartData:   'http://localhost:3000/carts',
    // ... APIs externas
};
```

Iniciar el servidor de desarrollo:

```bash
npm start          # ng serve en http://localhost:4200
npm run start-dev  # ng serve -o (abre el navegador automáticamente)
```

---

### 4️⃣ Crear un usuario Administrador

1. Registrarse desde la interfaz en `/register`
2. Acceder a la base de datos y cambiar el campo `isAdmin` a `true`:

```sql
UPDATE users SET "isAdmin" = true WHERE email = 'tu@email.com';
```

3. Iniciar sesión — serás redirigido automáticamente al panel `/admin`

---

## 🚀 Despliegue

El proyecto está configurado para desplegarse en **Railway** (backend) y puede servir el build de Angular como archivos estáticos desde Express:

```bash
# Build de producción del frontend
npm run build

# El backend sirve los archivos desde:
# server/dist/funko-store/
```

El archivo `railway.yaml` contiene la configuración del servicio web con las variables de entorno necesarias para la base de datos PostgreSQL en la nube.

---

## 📁 Estructura de Carpetas

```
FunkoStore-Postgres-2025/
│
├── 📁 server/                      # Backend Node.js + Express
│   ├── 📁 config/
│   │   └── config.js               # Configuración Sequelize CLI
│   ├── 📁 data/
│   │   └── db.js                   # Conexión a PostgreSQL con Sequelize
│   ├── 📁 migrations/
│   │   └── create_all_tables.js    # Migración: crea las 4 tablas
│   ├── 📁 scripts/
│   │   ├── importFunkos.js         # Importa funkos.json a la BD
│   │   └── restructureFunkos.js    # Utilidad para restructurar datos
│   ├── 📁 src/
│   │   ├── 📁 controllers/         # Lógica de cada endpoint
│   │   │   ├── funkoControllers.js
│   │   │   ├── usersControllers.js
│   │   │   └── cartControllers.js
│   │   ├── 📁 middleware/
│   │   │   ├── authMiddleware.js   # Verificación JWT
│   │   │   └── optionsMiddle.js
│   │   ├── 📁 models/              # Modelos Sequelize
│   │   │   ├── funkoModel.js
│   │   │   ├── userModel.js
│   │   │   ├── cartModel.js
│   │   │   └── cartItemsModel.js
│   │   ├── 📁 routes/              # Definición de rutas
│   │   │   ├── funkoRoutes.js
│   │   │   ├── usersRoutes.js
│   │   │   └── cartRoutes.js
│   │   └── 📁 services/            # Lógica de negocio / acceso a BD
│   │       ├── funkoServices.js
│   │       ├── userServices.js
│   │       └── cartServices.js
│   └── app.js                      # Entry point del servidor
│
├── 📁 src/                         # Frontend Angular
│   ├── 📁 app/
│   │   ├── 📁 admin/               # Módulo panel de administración
│   │   ├── 📁 auth/                # Módulo login y registro
│   │   ├── 📁 landing-page/        # Módulo home / landing
│   │   ├── 📁 shop/                # Módulo tienda y carrito
│   │   ├── 📁 shared/              # Header, Footer, Guards, Directivas
│   │   ├── 📁 services/            # Servicios Angular (HTTP, Auth, Cart)
│   │   └── 📁 interfaces/          # Tipos TypeScript (User, Funko, Cart)
│   ├── 📁 assets/img/              # Imágenes y SVGs
│   └── 📁 environments/            # Variables de entorno Angular
│
├── 📁 db/
│   └── funkos.json                 # Dataset inicial de Funkos
│
├── railway.yaml                    # Config de despliegue Railway
├── .sequelizerc                    # Config paths Sequelize CLI
├── angular.json                    # Config Angular CLI
└── package.json                    # Dependencias del frontend
```

---

<div align="center">

### 🎭 Funko Store Online

*Desarrollado con ❤️ usando Angular + Node.js + PostgreSQL*

![Made with Angular](https://img.shields.io/badge/Made%20with-Angular-DD0031?style=flat-square&logo=angular)
![Made with Node](https://img.shields.io/badge/Made%20with-Node.js-339933?style=flat-square&logo=nodedotjs)
![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql)

</div>
