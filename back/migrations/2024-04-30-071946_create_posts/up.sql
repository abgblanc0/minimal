-- Your SQL goes here
-- Crear la tabla
CREATE TABLE directory (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    dirname VARCHAR(255) NOT NULL,
    username VARCHAR(100) DEFAULT 'root',
    parent_id INT REFERENCES directory(id) ON DELETE CASCADE
);

INSERT INTO directory (dirname) 
VALUES ('/');

CREATE TABLE file (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    filename VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    directory_id INT REFERENCES directory(id) ON DELETE CASCADE NOT NULL,
    UNIQUE (filename, directory_id)
);

-- Insertar un post para cada usuario
INSERT INTO file (filename, content, user_id, directory_id)
SELECT 
    CONCAT('Post de ', u.username),
    CONCAT('Contenido del post de ', u.username),
    u.id,
    1
FROM 
    users u;

INSERT INTO file (filename, content, user_id, directory_id) 
VALUES ('Hola', 'Este es un post de ejemplo', 1, 1);
