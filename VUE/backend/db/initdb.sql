-- Active: 1758616368817@@localhost@3306@users

use productos;

create table products(
  id int AUTO_INCREMENT PRIMARY KEY,
  color varchar(40),
  image varchar(80),
  quantity int,
  brand varchar(40)
);

create table product_details(
  id int AUTO_INCREMENT PRIMARY KEY,
  id_product int,
  detail VARCHAR(256),
  Foreign Key (id_product) REFERENCES products(id)
);


INSERT INTO products (id, color, image, quantity, brand) VALUES
(2234, 'green', 'socks_green.jpeg', 50, 'Vue Mastery');

INSERT INTO products (id, color, image, quantity, brand) VALUES
(2235, 'blue', 'socks_blue.jpeg', 0, 'Vue Mastery');

INSERT INTO product_details (id_product, detail) VALUES
(2234, '50% cotton'),
(2234, '30% wool'),
(2234, '20% polyester');