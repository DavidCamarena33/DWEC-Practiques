use bibliotecagen;

SELECT re.id_recurso, re.titol, l.autor , re.disponibles 
FROM recursos re 
JOIN llibre l ON re.id_recurso = l.id_llibre 
where re.id_tipus = 1;

SELECT re.id_recurso, re.titol, l.autor, re.disponibles 
FROM recursos re 
LEFT JOIN llibre l ON re.id_recurso = l.id_llibre 
WHERE re.id_tipus = 1;

select r.id_recurso, r.titol, re.autor, re.fecha, r.disponibles 
from recursos r 
join revista re on r.id_recurso = re.id_revista 
where r.id_tipus = 2;