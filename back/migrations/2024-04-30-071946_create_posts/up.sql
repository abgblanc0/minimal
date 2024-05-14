-- Your SQL goes here
-- Crear la tabla
CREATE TABLE directory (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dirname VARCHAR(255) NOT NULL,
    username VARCHAR(32) DEFAULT 'root',
    parent_id INT REFERENCES directory(id) ON DELETE CASCADE
);

INSERT INTO directory (dirname) 
VALUES ('/');

INSERT INTO directory (dirname, parent_id) 
VALUES ('public', 1);


INSERT INTO directory (dirname, parent_id) 
VALUES ('Misc', 2);

CREATE TABLE file (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    filename VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    username VARCHAR(32) DEFAULT 'guest',
    directory_id INT REFERENCES directory(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (filename, directory_id)
);

-- Insertar un post para cada usuario
INSERT INTO file (filename, content, username, directory_id)
SELECT 
    CONCAT('Post de ', u.username),
    CONCAT('Contenido del post de ', u.username),
    u.username,
    3
FROM 
    users u;

INSERT INTO file (filename, content, username, directory_id) 
VALUES ('Hola', 'Este es un post de ejemplo', 'asd', 2);
