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
    id_biblioteca INT,
    nom VARCHAR(50) NOT NULL,
    dni VARCHAR(15) UNIQUE NOT NULL,
    tipus ENUM("soci","administrador") NOT NULL,
    FOREIGN KEY (id_biblioteca) REFERENCES biblioteca(id_biblioteca)
);

CREATE TABLE llibre (
    id_llibre INT PRIMARY KEY ,
    autor VARCHAR(100),
    FOREIGN KEY (id_llibre) REFERENCES recursos(id_recurso)
);

CREATE TABLE revista (
    id_revista INT PRIMARY KEY ,
    autor VARCHAR(100),
    fecha DATE,
    FOREIGN KEY (id_revista) REFERENCES recursos(id_recurso)
);

CREATE TABLE peli (
    id_peli INT PRIMARY KEY ,
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


CREATE TABLE prestec(
    id_prestec INT AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    id_recurso INT NOT NULL,
    data_prestec DATE NOT NULL,
    data_devolver DATE,
    devuelto BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_persona) REFERENCES persones(id_persona),
    FOREIGN KEY (id_recurso) REFERENCES recursos(id_recurso)
);

create view prestecssoci as
select s.id_persona, r.titol, p.data_prestec
from prestec p
join recursos r on p.id_recurso = r.id_recurso
join persones s on p.id_persona = s.id_persona
where p.data_devolver is null;

create view recursos_agotados as
select id_recurso, id_tipus, disponibles
from recursos
where disponibles = 0;


DELIMITER &&

-- comprobe antes de insertar un prestec si el recurs
-- esta disponible i si no ho esta el error para la insercio

CREATE TRIGGER validar_prestec
BEFORE INSERT ON prestec -- antes de fer el update i la insercio de prestec
FOR EACH ROW             -- comproba si es posible
BEGIN
    DECLARE ejemplares INT;

    SELECT disponibles INTO ejemplares
    FROM recursos
    WHERE id_recurso = NEW.id_recurso;

    IF ejemplares <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No hay ejemplares disponibles para este recurso';
    END IF;
END &&

DELIMITER ;


-- Açi fem que si el trigger anterior no ha donat error que 
-- la insercio es puga fer i es reste el disponible

DELIMITER &&

CREATE TRIGGER fer_prestec
AFTER INSERT ON prestec -- despues de insertar en la tabla fa el update
FOR EACH ROW
BEGIN
    UPDATE recursos
    SET disponibles = disponibles - 1
    WHERE id_recurso = NEW.id_recurso;
END &&

DELIMITER ;

DELIMITER &&

-- este trigger es per a caun tornes un recurs que els disponibles
-- se li sume uno

CREATE TRIGGER tornar_recurs
AFTER UPDATE ON prestec -- despues del update comproba les feches          
FOR EACH ROW            -- i li suma uno al tornar
BEGIN
    IF OLD.data_devolver IS NULL AND NEW.data_devolver IS NOT NULL THEN
    -- Açi comprobem que la fecha de tornar antigua estaba a null y que la nova
    -- no esta a null per a poder confirmar la devolucio
        UPDATE recursos
        SET disponibles = disponibles + 1
        WHERE id_recurso = NEW.id_recurso;
    END IF;
END &&

DELIMITER ;



INSERT INTO biblioteca (nom, poble) VALUES
('Biblioteca Central', 'València'),
('Biblioteca del Mar', 'Alicante');

INSERT INTO tiporecursos (tipus) VALUES
('Llibre'),
('Revista'),
('Peli');

INSERT INTO recursos (id_biblioteca, titol, disponibles, id_tipus) VALUES
(1, 'El senyor dels anells', 3, 1),    
(1, 'Cien años de soledad', 2, 1),     
(1, 'National Geographic - Octubre', 2, 2),
(2, 'Ciencia Hoy - Septiembre', 1, 2),  
(2, 'Inception', 1, 3),                 
(2, 'Gladiator', 2, 3);                 

INSERT INTO persones (id_biblioteca, nom, dni, tipus) VALUES
(1, 'Laura Gómez', '12345678A', 'soci'),
(1, 'Pere Martí', '87654321B', 'administrador'),
(2, 'Marta Ferrer', '45678912C', 'soci'),
(2, 'Joan Serra', '78912345D', 'administrador');

INSERT INTO llibre (id_llibre, autor) VALUES
(1, 'J.R.R. Tolkien'),
(2, 'Gabriel García Márquez');

INSERT INTO revista (id_revista, autor, fecha) VALUES
(3, 'Redacción NG', '2025-10-01'),
(4, 'Equipo Ciencia Hoy', '2025-09-15');

INSERT INTO peli (id_peli, director, genere) VALUES
(5, 'Christopher Nolan', 'Ciencia ficción'),
(6, 'Ridley Scott', 'Acción');

INSERT INTO soci (id_persona) VALUES
(1),
(3);

INSERT INTO admins (id_persona, carrec) VALUES
(2, 'Director General'),
(4, 'Subdirector');

INSERT INTO prestec (id_persona, id_recurso, data_prestec)
VALUES (1, 1, '2025-10-19');

INSERT INTO prestec (id_persona, id_recurso, data_prestec)
VALUES (3, 5, '2025-10-19');


