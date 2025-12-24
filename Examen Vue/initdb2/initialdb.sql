-- Active: 1758616368817@@localhost@3306@mysql
use inventari_db;

create table productes(
    id int AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(128),
    quantitat int,
    preu int,
    descripcio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

