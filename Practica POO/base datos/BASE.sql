create database bibliotecagen;

use bibliotecagen;

create table biblioteca(
    nom VARCHAR(30) not null,
    poble VARCHAR(32),
    primary key (nom)    
);

drop table material;

create table material(
    biblioteca varchar(30),
    titol varchar(50),
    disponibles int,
    primary key(titol, disponibles, biblioteca),
    Foreign Key (biblioteca) REFERENCES biblioteca(nom)
);

create table persones(
    biblioteca varchar(30),
    nom varchar(30),
    dni int,
    primary key(nom, dni, biblioteca),
    Foreign Key (biblioteca) REFERENCES biblioteca(nom)
);

create table llibre(
    autor varchar(40),
    titol varchar(50),
    disponibles int,
    Foreign Key (titol, disponibles) REFERENCES material(titol, disponibles)
);

create table revista(
    titol varchar(50),
    autor varchar(40),
    fecha date,
    disponibles int,
    Foreign Key (titol, disponibles) REFERENCES material(titol, disponibles)
);

create table peli(
   titol varchar(40),
   director varchar(40),
   genere varchar(20),
   disponibles int,
   Foreign Key (titol, disponibles) REFERENCES material(titol, disponibles) 
);

create table soci(
    nom varchar(30),
    dni int,
    recursos JSON,
    Foreign Key (nom, dni) REFERENCES persones(nom, dni)
);

create table admins(
    nom varchar(30),
    dni int,
    carrec varchar(30),
    Foreign Key (nom, dni) REFERENCES persones(nom, dni)
);
