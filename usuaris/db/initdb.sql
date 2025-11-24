create database users;

USE users;

-- Exemple opcional
CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

insert into users (name, password, role) values ("Pedro", "Pedro", "admin");

select name, password, role from users;