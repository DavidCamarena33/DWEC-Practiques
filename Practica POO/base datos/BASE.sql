DROP DATABASE IF EXISTS bibliotecagen;
CREATE DATABASE IF NOT EXISTS bibliotecagen;
USE bibliotecagen;

CREATE TABLE biblioteca (
    id_biblioteca INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    poble VARCHAR(50)
);

CREATE TABLE tiporecursos (
    id_recurs INT AUTO_INCREMENT PRIMARY KEY,
    tipus VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE recursos (
    id_recurso INT AUTO_INCREMENT PRIMARY KEY,
    id_biblioteca INT NOT NULL,
    titol VARCHAR(100) NOT NULL,
    disponibles INT DEFAULT 0,
    id_tipus INT NOT NULL,
    FOREIGN KEY (id_biblioteca) REFERENCES biblioteca(id_biblioteca),
    FOREIGN KEY (id_tipus) REFERENCES tiporecursos(id_recurs)
);

CREATE TABLE persones (
    id_persona INT AUTO_INCREMENT PRIMARY KEY,
    id_biblioteca INT NOT NULL,
    nom VARCHAR(50) NOT NULL,
    dni VARCHAR(15) UNIQUE NOT NULL,
    tipus ENUM("soci","administrador") NOT NULL,
    FOREIGN KEY (id_biblioteca) REFERENCES biblioteca(id_biblioteca)
);

CREATE TABLE llibre (
    id_llibre INT PRIMARY KEY,
    autor VARCHAR(100),
    FOREIGN KEY (id_llibre) REFERENCES recursos(id_recurso)
);

CREATE TABLE revista (
    id_revista INT PRIMARY KEY,
    autor VARCHAR(100),
    fecha DATE,
    FOREIGN KEY (id_revista) REFERENCES recursos(id_recurso)
);

CREATE TABLE peli (
    id_peli INT PRIMARY KEY,
    director VARCHAR(100),
    genere VARCHAR(50),
    FOREIGN KEY (id_peli) REFERENCES recursos(id_recurso)
);

CREATE TABLE soci (
    id_persona INT PRIMARY KEY,
    FOREIGN KEY (id_persona) REFERENCES persones(id_persona)
);

CREATE TABLE admins (
    id_persona INT PRIMARY KEY,
    carrec VARCHAR(50),
    FOREIGN KEY (id_persona) REFERENCES persones(id_persona)
);

create table soci (
    nom varchar(30),
    dni int,
    recursos JSON,
    Foreign Key (nom, dni) REFERENCES persones (nom, dni),
    primary key (nom, dni)
);

create table admins (
    nom varchar(30),
    dni int,
    carrec varchar(30),
    Foreign Key (nom, dni) REFERENCES persones (nom, dni),
    primary key (nom, dni)
);

