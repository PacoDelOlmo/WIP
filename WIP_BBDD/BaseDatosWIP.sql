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

-- ==========================================
-- INSERTS DE USUARIOS
-- ==========================================
INSERT INTO APP_USER (NOMBRE, APELLIDO, NOMBRE_USUARIO, CORREO, CONTRASENA) 
VALUES ('Laura', 'García', 'lgarcia', 'laura.garcia@email.com', 'clave123');

INSERT INTO APP_USER (NOMBRE, APELLIDO, NOMBRE_USUARIO, CORREO, CONTRASENA) 
VALUES ('Carlos', 'Ruiz', 'cruizdev', 'carlos.ruiz@wip.com', 'segura2024');

INSERT INTO APP_USER (NOMBRE, APELLIDO, NOMBRE_USUARIO, CORREO, CONTRASENA) 
VALUES ('Ana', 'Martínez', 'anam', 'ana.martinez@test.com', 'admin_pass');

-- ==========================================
-- 1. CREACIÓN DE WORKSPACE 
-- ==========================================
-- Le damos el color Verde Agua (#A8D1D5) al workspace principal
INSERT INTO WORKSPACE (NOMBRE, PROPIETARIO, COLOR) 
VALUES ('Desarrollo TFG WIP', 1, '#A8D1D5');

-- ==========================================
-- 2. ASIGNACIÓN DE ROLES (USER_WORKSPACE)
-- ==========================================
INSERT INTO USER_WORKSPACE (ID_USUARIO, ID_WORKSPACE, ROL) VALUES 
(1, 1, 'Propietario'),  
(2, 1, 'Colaborador');  

-- ==========================================
-- 3. CREACIÓN DE TABLEROS (TASKBOARD)
-- ==========================================
INSERT INTO TASKBOARD (NOMBRE, FECHA_CREACION, ID_WORKSPACE, COLOR) VALUES 
('Frontend - React', NOW(), 1, '#B3E5FC'),      
('Backend - Spring Boot', NOW(), 1, '#E1BEE7'); 

-- ==========================================
-- 4. CREACIÓN DE PILAS DE TAREAS (TASKQUEUE) CON POSICIÓN
-- ==========================================
INSERT INTO TASKQUEUE (NOMBRE, FECHA_CREACION, POSICION, ID_TASKBOARD, COLOR) VALUES 
('Por hacer', NOW(), 0, 1, '#EAEAEA'),       
('En Progreso', NOW(), 1, 1, '#FBD5B9'), 
('Terminado', NOW(), 2, 1, '#C8E6C9'),   
('Backlog', NOW(), 0, 2, '#EAEAEA'),         
('En Revisión', NOW(), 1, 2, '#FFF9C4');

-- ==========================================
-- 5. CREACIÓN DE TAREAS (TASK) CON POSICIÓN
-- ==========================================
-- Dejamos casi todas en blanco (#FFFFFF) excepto una urgente en Rosa Pálido
INSERT INTO TASK (TITULO, AUTOR, DESCRIPCION, COMPLETADA, FECHA_CREACION, POSICION, ID_TASKQUEUE, COLOR) VALUES 
('Maquetar Header', 1, 'Usar CSS Modules y el logo nuevo', FALSE, NOW(), 0, 1, '#FFFFFF'),  
('Componente Card', 2, 'Debe recibir props dinámicas', FALSE, NOW(), 0, 2, '#FFFFFF'),      
('Configurar Vite', 3, 'Instalación inicial y limpieza', TRUE, NOW(), 0, 3, '#FFFFFF'),     
('Diseñar Entidad User', 2, 'Definir campos y relaciones JPA', FALSE, NOW(), 0, 4, '#FFFFFF'),
('Endpoint Login', 1, 'Solucionar problema de CORS', FALSE, NOW(), 0, 5, '#F8BBD0'); -- Tarea destacada      

-- ==========================================
-- 6. NUEVAS ETIQUETAS (CATÁLOGO ÚNICO)
-- ==========================================
INSERT INTO TAG (ETIQUETA) VALUES 
('CSS'),        
('Frontend'),   
('React'),      
('Urgente'),    
('Bug');        

-- ==========================================
-- 7. RELACIÓN TAREAS - ETIQUETAS (TASKTAG)
-- ==========================================
INSERT INTO TASKTAG (ID_TASK, ID_TAG) VALUES 
(1, 1), 
(1, 2), 
(2, 3), 
(5, 4), 
(5, 5); 

-- ==========================================
-- 8. COMENTARIOS (COMMENT)
-- ==========================================
INSERT INTO COMMENT (AUTOR, CONTENIDO, FECHA, ID_TASK) VALUES 
(2, 'Recuerda hacerlo responsive para móvil', NOW(), 1), 
(1, 'Sí, usaré media queries', NOW(), 1),               
(3, 'Creo que el fallo está en el SecurityConfig', NOW(), 5);