-- Your SQL goes here
-- Crear la tabla
CREATE TABLE directory (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dirname VARCHAR(255) NOT NULL,
    username VARCHAR(32) DEFAULT 'guest',
    permissions INT NOT NULL,
    parent_id INT REFERENCES directory(id) ON DELETE CASCADE,
    UNIQUE(dirname, parent_id)
);

INSERT INTO directory (dirname, username, permissions) 
VALUES ('/', 'root', 700);
INSERT INTO directory (dirname, parent_id, username, permissions) 
VALUES ('home', 1, 'root', 755);
INSERT INTO directory (dirname, parent_id, username, permissions) 
VALUES ('Public', 1, 'root', 775);


CREATE TABLE file (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    filename VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    username VARCHAR(32) DEFAULT 'guest',
    permissions INT NOT NULL,
    directory_id INT REFERENCES directory(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (filename, directory_id)
);


-- Crear la función que se ejecutará cuando se inserte un nuevo usuario
CREATE OR REPLACE FUNCTION crear_directorio_usuario()
RETURNS TRIGGER AS $$
DECLARE
    primer_directorio_id INT;
BEGIN
    -- Insertar un nuevo directorio con el nombre del usuario y su ID como parent_id
    INSERT INTO directory (dirname, username, parent_id, permissions)
    VALUES (NEW.username, NEW.username, 2, 700)
    RETURNING id INTO primer_directorio_id;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que ejecutará la función cuando se inserte un nuevo usuario
CREATE TRIGGER trigger_crear_directorio_usuario
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION crear_directorio_usuario();
