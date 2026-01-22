/*DROP DATABASE IF EXISTS Work_In_Progress;*/

CREATE DATABASE IF NOT EXISTS Work_In_Progress;
USE Work_In_Progress;

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
    CONSTRAINT FK_WORKSPACE_USER FOREIGN KEY (PROPIETARIO) REFERENCES APP_USER(ID_USUARIO)
);

CREATE TABLE TASKBOARD(
    ID_TASKBOARD BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255),
    FECHA_CREACION DATETIME,
    ID_WORKSPACE BIGINT NOT NULL,
    CONSTRAINT FK_TASKBOARD_WORKSPACE FOREIGN KEY (ID_WORKSPACE) REFERENCES WORKSPACE(ID_WORKSPACE)
);

CREATE TABLE TASKQUEUE(
    ID_TASKQUEUE BIGINT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(255),
    FECHA_CREACION DATETIME,
    ID_TASKBOARD BIGINT NOT NULL,
    CONSTRAINT FK_TASKBQUEUE_TASKBOARD FOREIGN KEY (ID_TASKBOARD) REFERENCES TASKBOARD(ID_TASKBOARD)
);

CREATE TABLE TASK(
    ID_TASK BIGINT AUTO_INCREMENT PRIMARY KEY,
    TITULO VARCHAR(255),
    AUTOR BIGINT,
    DESCRIPCION VARCHAR(255),
    COMPLETADA BOOLEAN,
    FECHA_CREACION DATETIME,
    ID_TASKQUEUE BIGINT NOT NULL,
    CONSTRAINT FK_TASK_TASKQUEUE FOREIGN KEY (ID_TASKQUEUE) REFERENCES TASKQUEUE(ID_TASKQUEUE),
    CONSTRAINT FK_TASK_USER FOREIGN KEY (AUTOR) REFERENCES APP_USER(ID_USUARIO)
);

CREATE TABLE TAG(
    ID_TAG BIGINT AUTO_INCREMENT PRIMARY KEY,
    ETIQUETA VARCHAR(255),
    ID_TASK BIGINT NOT NULL,
    CONSTRAINT FK_TAG_TASK FOREIGN KEY (ID_TASK) REFERENCES TASK(ID_TASK)
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

INSERT INTO APP_USER (NOMBRE, APELLIDO, NOMBRE_USUARIO, CORREO, CONTRASENA) 
VALUES ('Laura', 'García', 'lgarcia', 'laura.garcia@email.com', 'clave123');

INSERT INTO APP_USER (NOMBRE, APELLIDO, NOMBRE_USUARIO, CORREO, CONTRASENA) 
VALUES ('Carlos', 'Ruiz', 'cruizdev', 'carlos.ruiz@wip.com', 'segura2024');

INSERT INTO APP_USER (NOMBRE, APELLIDO, NOMBRE_USUARIO, CORREO, CONTRASENA) 
VALUES ('Ana', 'Martínez', 'anam', 'ana.martinez@test.com', 'admin_pass');


-- ==========================================
-- 1. CREACIÓN DE WORKSPACE (Asignado a Laura, ID: 1)
-- ==========================================
INSERT INTO WORKSPACE (NOMBRE, PROPIETARIO) 
VALUES ('Desarrollo TFG WIP', 1);

-- ==========================================
-- 2. CREACIÓN DE TABLEROS (TASKBOARD)
-- ==========================================
-- Asumimos que el Workspace anterior tiene ID = 1
INSERT INTO TASKBOARD (NOMBRE, FECHA_CREACION, ID_WORKSPACE) VALUES 
('Frontend - React', NOW(), 1),      -- ID será 1
('Backend - Spring Boot', NOW(), 1); -- ID será 2

-- ==========================================
-- 3. CREACIÓN DE PILAS DE TAREAS (TASKQUEUE)
-- ==========================================
INSERT INTO TASKQUEUE (NOMBRE, FECHA_CREACION, ID_TASKBOARD) VALUES 
-- Pilas para el Tablero 1 (Frontend)
('Por hacer', NOW(), 1),       -- ID: 1
('En Progreso', NOW(), 1),     -- ID: 2
('Terminado', NOW(), 1),       -- ID: 3

-- Pilas para el Tablero 2 (Backend)
('Backlog', NOW(), 2),         -- ID: 4
('En Revisión', NOW(), 2);     -- ID: 5

-- ==========================================
-- 4. CREACIÓN DE TAREAS (TASK)
-- ==========================================
INSERT INTO TASK (TITULO, AUTOR, DESCRIPCION, COMPLETADA, FECHA_CREACION, ID_TASKQUEUE) VALUES 
-- Tarea 1 en 'Por hacer' (Front) - Creada por Laura
('Maquetar Header', 1, 'Usar CSS Modules y el logo nuevo', FALSE, NOW(), 1),

-- Tarea 2 en 'En Progreso' (Front) - Creada por Carlos
('Componente Card', 2, 'Debe recibir props dinámicas', FALSE, NOW(), 2),

-- Tarea 3 en 'Terminado' (Front) - Creada por Ana
('Configurar Vite', 3, 'Instalación inicial y limpieza', TRUE, NOW(), 3),

-- Tarea 4 en 'Backlog' (Back) - Creada por Carlos
('Diseñar Entidad User', 2, 'Definir campos y relaciones JPA', FALSE, NOW(), 4),

-- Tarea 5 en 'En Revisión' (Back) - Creada por Laura
('Endpoint Login', 1, 'Solucionar problema de CORS', FALSE, NOW(), 5);

-- ==========================================
-- 5. ETIQUETAS (TAGS)
-- ==========================================
INSERT INTO TAG (ETIQUETA, ID_TASK) VALUES 
('CSS', 1),          -- Para 'Maquetar Header'
('Frontend', 1),
('React', 2),        -- Para 'Componente Card'
('Urgente', 5),      -- Para 'Endpoint Login'
('Bug', 5);

-- ==========================================
-- 6. COMENTARIOS (COMMENT)
-- ==========================================
INSERT INTO COMMENT (AUTOR, CONTENIDO, FECHA, ID_TASK) VALUES 
-- Comentarios en la Tarea 1 (Header)
(2, 'Recuerda hacerlo responsive para móvil', NOW(), 1), -- Carlos comenta
(1, 'Sí, usaré media queries', NOW(), 1),               -- Laura responde

-- Comentario en la Tarea 5 (Endpoint Login)
(3, 'Creo que el fallo está en el SecurityConfig', NOW(), 5); -- Ana ayuda