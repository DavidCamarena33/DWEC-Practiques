-- Active: 1758616368817@@localhost@3306
use pokemons;

create table pokemon(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    tipo VARCHAR(255),
    region ENUM('paldea', 'kalos', 'kanto', 'galar'),
    imagen VARCHAR(255),
    creadeo  datetime DEFAULT CURRENT_TIMESTAMP
);

select * from pokemon