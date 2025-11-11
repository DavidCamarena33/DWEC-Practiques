create database appdb;
USE appdb;

-- Exemple opcional
CREATE TABLE IF NOT EXISTS example (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

insert into example(name,password ,role) values ("Pedro","viva franco" ,"user");

select * from example;