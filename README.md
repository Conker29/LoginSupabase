# 📱 Ionic App — Guía de Instalación

Aplicación móvil construida con **Ionic + Angular + Capacitor** que incluye autenticación con Supabase, consulta de recetas desde una API externa y galería de fotos con la cámara del dispositivo.

---

## 🧰 Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

| Herramienta | Versión recomendada | Descarga |
|---|---|---|
| Node.js | 18 o superior | https://nodejs.org |
| npm | Incluido con Node.js | — |
| Angular CLI | Última versión | `npm install -g @angular/cli` |
| Ionic CLI | Última versión | `npm install -g @ionic/cli` |
| Git | Cualquier versión reciente | https://git-scm.com |

> **Opcional** — Para compilar la app en dispositivos físicos o emuladores:
> - **Android:** Android Studio + SDK de Android
> - **iOS (solo macOS):** Xcode

---

## 🚀 Instalación paso a paso

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DE_LA_CARPETA>
```

### 2. Instalar dependencias

```bash
npm install
```

Esto descargará todos los paquetes definidos en `package.json`, incluyendo Ionic, Angular, Capacitor y Supabase.

### 3. Configurar las variables de entorno

Las credenciales de Supabase ya están incluidas en los archivos de entorno del proyecto:

- `src/environments/environment.ts` → para desarrollo
- `src/environments/environment.prod.ts` → para producción

Si deseas usar tu propio proyecto de Supabase, edita ambos archivos y reemplaza los valores:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'TU_URL_DE_SUPABASE',
  supabaseKey: 'TU_ANON_KEY_DE_SUPABASE'
};
```

> Puedes obtener estos valores en tu proyecto de Supabase en **Project Settings → API**.

---

## ▶️ Ejecutar la aplicación

### En el navegador (desarrollo)

```bash
ionic serve
```

La app se abrirá automáticamente en `http://localhost:8100`.

> ⚠️ La cámara **no funciona** en el navegador. Para probarla necesitas un dispositivo o emulador.

---

## 📲 Ejecutar en dispositivo / emulador

### Android

#### Requisitos adicionales
- Android Studio instalado
- Al menos un emulador configurado o un dispositivo Android conectado con **depuración USB activada**

#### Pasos

```bash
# 1. Compilar la app web
ionic build

# 2. Agregar la plataforma Android (solo la primera vez)
npx cap add android

# 3. Sincronizar cambios al proyecto nativo
npx cap sync android

# 4. Abrir en Android Studio
npx cap open android
```

Desde Android Studio, haz clic en **Run ▶** para instalar la app en el emulador o dispositivo.

---

### iOS (solo macOS)

#### Requisitos adicionales
- Xcode instalado desde la App Store
- Cuenta de desarrollador de Apple (para dispositivo físico)

#### Pasos

```bash
# 1. Compilar la app web
ionic build

# 2. Agregar la plataforma iOS (solo la primera vez)
npx cap add ios

# 3. Sincronizar cambios al proyecto nativo
npx cap sync ios

# 4. Abrir en Xcode
npx cap open ios
```

Desde Xcode, selecciona tu dispositivo o simulador y haz clic en **Run ▶**.

---

## 🗂️ Estructura del proyecto

```
src/
├── app/
│   ├── pages/
│   │   ├── login/          # Pantalla de inicio de sesión
│   │   └── tabs/
│   │       ├── pages/
│   │       │   ├── tab1/   # Listado de recetas (MealDB API)
│   │       │   ├── tab2/   # Galería de fotos con cámara
│   │       │   └── tab3/   # Perfil y cierre de sesión
│   │       └── tabs.page   # Navegación por pestañas
│   ├── services/
│   │   └── supabase.service.ts  # Autenticación con Supabase
│   └── app.routes.ts       # Definición de rutas
├── environments/           # Credenciales de entorno
└── global.scss             # Estilos globales
```

---

## ✨ Funcionalidades

- **Login / Registro** — Autenticación con email y contraseña mediante Supabase Auth
- **Recetas (Tab 1)** — Búsqueda y filtrado de recetas usando [TheMealDB API](https://www.themealdb.com/api.php), con vista de detalle, ingredientes e instrucciones
- **Cámara (Tab 2)** — Toma fotos con la cámara del dispositivo y visualízalas en una galería
- **Logout (Tab 3)** — Cierre de sesión y redirección al login

---

## 🐛 Problemas comunes

**`npm install` falla con errores de versión**
→ Asegúrate de usar Node.js 18 o superior. Puedes verificarlo con `node -v`.

**La cámara no funciona en el navegador**
→ Es un comportamiento esperado. Capacitor Camera requiere un entorno nativo (Android/iOS).
<img width="1080" height="2460" alt="image" src="https://github.com/user-attachments/assets/7c745869-2648-473f-aaeb-d28a16a38359" />
<img width="702" height="1600" alt="image" src="https://github.com/user-attachments/assets/fc46fdd2-e53d-4c43-a69d-005ac6cea7ca" />
<img width="702" height="1600" alt="image" src="https://github.com/user-attachments/assets/eb9d9096-8dff-4bde-91c8-3a4c2cccb81d" />
<img width="1200" height="1599" alt="image" src="https://github.com/user-attachments/assets/cd5f5f62-8c00-49e1-a3e6-2881b9933a83" />
<img width="1080" height="2460" alt="image" src="https://github.com/user-attachments/assets/f3764993-444a-43a8-a9a8-926daa855cd6" />




**Error de CORS al consumir la API**
→ Ocurre solo en desarrollo web con ciertas APIs. En producción (app nativa) no sucede.

**`npx cap sync` muestra errores**
→ Asegúrate de haber ejecutado `ionic build` primero para generar la carpeta `www/`.


Utilzacion de la IA
<img width="893" height="347" alt="image" src="https://github.com/user-attachments/assets/38ecb957-b3a7-4887-a456-a51de11a5aa3" />
Escritura de README
