<div align="center">

# 🚀 Work In Progress (WIP)
**El gestor de proyectos que va al grano. Sin ruido, sin fricción, solo progreso.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)](https://spring.io/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](#)
[![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](#)

</div>

---

## 📖 Sobre el Proyecto

**Work In Progress (WIP)** es una plataforma SaaS (Software as a Service) orientada a la gestión de proyectos y tareas para equipos pequeños y medianos. Nace con una filosofía clara: **eliminar la parafernalia**. 

A diferencia de otras herramientas del mercado que saturan al usuario con opciones redundantes, WIP ofrece un flujo de trabajo minimalista, de alto contraste visual y directo. Inspirado en los principios de la comunicación audiovisual, cada color, animación y componente en WIP tiene una intención semiótica clara, ayudando al usuario a concentrarse exclusivamente en avanzar.

Además, WIP es un proyecto **Open-Source**. Creemos en el código abierto para que la comunidad audite, mejore y adapte la herramienta a las necesidades de cualquier equipo ágil.

<div align="center">
  <i>"El progreso no se mide por lo que terminas, sino por lo que construyes cada día."</i>
</div>

---

## ✨ Características Principales

* 📱 **Progressive Web App (PWA):** WIP es instalable en dispositivos móviles y de escritorio. Funciona de manera nativa e inmersiva sin consumir espacio de almacenamiento masivo.
* ⚡ **Optimistic UI:** La interfaz responde en 0 milisegundos. Actualizamos el estado local (como cambios de color, marcadores o movimientos de tareas) antes de recibir la confirmación del servidor, logrando una fluidez absoluta.
* 🖱️ **Drag & Drop Avanzado:** Sistema de tableros Kanban interactivos y orgánicos impulsados por `@hello-pangea/dnd`.
* 🎨 **Jerarquía Cromática:** Sistema de diseño basado en fondos pastel para descansar la vista y colores vibrantes en elementos interactivos para guiar la atención del usuario.
* 🛡️ **Validaciones Front-End Estrictas:** Feedback visual en tiempo real y validación por expresiones regulares (Regex) de campos sensibles y contraseñas antes de contactar al servidor, mejorando la seguridad y la UX.

---

## 🛠️ Stack Tecnológico

### Frontend
* **React + TypeScript:** Arquitectura SPA fuertemente tipada.
* **Zustand:** Gestión de estado global ligera y eficiente.
* **Axios:** Cliente HTTP centralizado y configurado.
* **Lucide React:** Iconografía vectorial consistente y dinámica.

### Backend & Base de Datos
* **Java + Spring Boot:** API RESTful robusta y escalable.
* **MySQL:** Base de datos relacional para garantizar la integridad referencial.

---

## 🗄️ Arquitectura de Datos

La base de datos sigue una estructura fuertemente normalizada para asegurar la jerarquía de los espacios de trabajo. 

```mermaid
erDiagram
    APP_USER ||--o{ WORKSPACE : "posee"
    APP_USER ||--o{ USER_WORKSPACE : "colabora en"
    WORKSPACE ||--o{ USER_WORKSPACE : "tiene permisos"
    WORKSPACE ||--o{ TASKBOARD : "contiene"
    TASKBOARD ||--o{ TASKQUEUE : "agrupa"
    TASKQUEUE ||--o{ TASK : "almacena"
    TASK ||--o{ COMMENT : "recibe"
    TASK ||--o{ TASKTAG : "clasificada por"
    TAG ||--o{ TASKTAG : "aplica a"

CREATE TABLE APP_USER(
    ID_USUARIO BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255),
    APELLIDO VARCHAR(255),
    NOMBRE_USUARIO VARCHAR(255),
    CORREO VARCHAR(255),
    CONTRASENA VARCHAR(255)
);

CREATE TABLE WORKSPACE(
    ID_WORKSPACE BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255),
    PROPIETARIO BIGINT NOT NULL,
    COLOR VARCHAR(7) DEFAULT '#EAEAEA',
    CONSTRAINT FK_WORKSPACE_USER FOREIGN KEY (PROPIETARIO) REFERENCES APP_USER(ID_USUARIO)
);

CREATE TABLE USER_WORKSPACE(
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ID_USUARIO BIGINT NOT NULL,
    ID_WORKSPACE BIGINT NOT NULL,
    ROL VARCHAR(50) NOT NULL,
    CONSTRAINT FK_UW_USER FOREIGN KEY (ID_USUARIO) REFERENCES APP_USER(ID_USUARIO),
    CONSTRAINT FK_UW_WORKSPACE FOREIGN KEY (ID_WORKSPACE) REFERENCES WORKSPACE(ID_WORKSPACE)
);

CREATE TABLE TASKBOARD(
    ID_TASKBOARD BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255),
    FECHA_CREACION DATETIME,
    ID_WORKSPACE BIGINT NOT NULL,
    COLOR VARCHAR(7) DEFAULT '#EAEAEA',
    CONSTRAINT FK_TASKBOARD_WORKSPACE FOREIGN KEY (ID_WORKSPACE) REFERENCES WORKSPACE(ID_WORKSPACE)
);

CREATE TABLE TASKQUEUE(
    ID_TASKQUEUE BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255),
    FECHA_CREACION DATETIME,
    POSICION BIGINT,
    ID_TASKBOARD BIGINT NOT NULL,
    COLOR VARCHAR(7) DEFAULT '#EAEAEA',
    CONSTRAINT FK_TASKBQUEUE_TASKBOARD FOREIGN KEY (ID_TASKBOARD) REFERENCES TASKBOARD(ID_TASKBOARD)
);

CREATE TABLE TASK(
    ID_TASK BIGINT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255),
    AUTOR BIGINT,
    DESCRIPCION VARCHAR(255),
    COMPLETADA BOOLEAN,
    FECHA_CREACION DATETIME,
    POSICION BIGINT,
    ID_TASKQUEUE BIGINT NOT NULL,
    COLOR VARCHAR(7) DEFAULT '#FFFFFF',
    CONSTRAINT FK_TASK_TASKQUEUE FOREIGN KEY (ID_TASKQUEUE) REFERENCES TASKQUEUE(ID_TASKQUEUE),
    CONSTRAINT FK_TASK_USER FOREIGN KEY (AUTOR) REFERENCES APP_USER(ID_USUARIO)
);

CREATE TABLE TAG(
    ID_TAG BIGINT AUTO_INCREMENT PRIMARY KEY,
    ETIQUETA VARCHAR(255) 
);

CREATE TABLE TASKTAG(
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ID_TASK BIGINT NOT NULL,
    ID_TAG BIGINT NOT NULL,
    CONSTRAINT FK_TT_TASK FOREIGN KEY (ID_TASK) REFERENCES TASK (ID_TASK),
    CONSTRAINT FK_TT_TAG FOREIGN KEY (ID_TAG) REFERENCES TAG (ID_TAG) 
);

CREATE TABLE COMMENT(
    ID_COMMENT BIGINT AUTO_INCREMENT PRIMARY KEY,
    AUTOR BIGINT NOT NULL,
    CONTENIDO VARCHAR(255),
    FECHA DATETIME,
    ID_TASK BIGINT NOT NULL,
    CONSTRAINT FK_COMMENT_TASK FOREIGN KEY (ID_TASK) REFERENCES TASK(ID_TASK),
    CONSTRAINT FK_COMMENT_USER FOREIGN KEY (AUTOR) REFERENCES APP_USER(ID_USUARIO)
);

```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos
Asegúrate de tener instalado en tu sistema:
* **Node.js** (v18 o superior).
* **pnpm** (Gestor de paquetes recomendado).
* **Java 17** (o superior) & **Maven**.
* **MySQL** (v8 o superior).

> 💡 **¿Por qué `pnpm`?** Utilizamos `pnpm` en lugar de `npm` o `yarn` debido a su enfoque estricto en la resolución de dependencias mediante *symlinks*. Esto evita el problema de las "dependencias fantasma" (*phantom dependencies*), dándole al proyecto una capa vital de seguridad adicional, mayor estabilidad en entornos de producción y una velocidad de instalación drásticamente superior.

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/work-in-progress.git](https://github.com/tu-usuario/work-in-progress.git)
cd work-in-progress
```

### 2. Configurar la Base de Datos
1. Inicia sesión en tu servidor local de MySQL.
2. Copia y ejecuta el script de inicialización detallado arriba para estructurar el esquema `Work_In_Progress`.
3. Dirígete al directorio del backend y configura las credenciales de tu base de datos (`spring.datasource.username` y `spring.datasource.password`) en el archivo `src/main/resources/application.properties`.

### 3. Ejecutar el Servidor Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
````

*El núcleo de la API REST se levantará de forma predeterminada en http://localhost:8080.*

### 4. Desplegar el Entorno Frontend
Abre una terminal independiente en la raíz del proyecto y ejecuta:

```bash
cd frontend
pnpm install
pnpm dev
```

*Vite compilará el entorno de desarrollo y lo servirá de manera inmediata en http://localhost:5173.*

---

## 🛡️ Capa de Validaciones en el Front-End

Para no saturar innecesariamente al servidor y brindar una UX fluida, la capa de cliente de WIP procesa de forma rigurosa las entradas antes de realizar operaciones de red:

* **Validación de Formularios mediante Expresiones Regulares (Regex):** El registro y login auditan cadenas complejas para verificar la estructura del correo electrónico, la longitud y robustez de contraseñas, y la ausencia de caracteres especiales peligrosos.
* **Bloqueo Pragmático de Peticiones:** Los botones de acción se deshabilitan o interceptan inmediatamente si los campos requeridos no cumplen las políticas mínimas de longitud o sanitización, ahorrando ancho de banda y reduciendo la carga computacional en el backend.
* **Control de Nulidad Dinámico:** Tareas, listas y nombres de workspaces se limpian de espacios en blanco mediante métodos de truncado (`.trim()`) antes de enviarse, evitando el almacenamiento de registros vacíos u orfanatos de datos.

---

## 👨‍💻 Autor

**Francisco Jesús del Olmo**
*Desarrollador Web & Realizador Audiovisual*

Fusionando la estructura rigurosa y matemática de la ingeniería de software con la semiótica y sensibilidad estética de la narrativa audiovisual, con el fin de concebir herramientas de software que no solo operen de forma impecable, sino que comuniquen, inspiren y fluyan de manera orgánica con las personas.