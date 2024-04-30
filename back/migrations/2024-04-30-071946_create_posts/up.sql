-- Your SQL goes here

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    ctime timestamp with time zone DEFAULT now(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL
);


-- Insertar un post para cada usuario
INSERT INTO posts (title, body, user_id)
SELECT 
    CONCAT('Post de ', u.username),
    CONCAT('Contenido del post de ', u.username),
    u.id
FROM 
    users u;

INSERT INTO posts (title, body, user_id) 
VALUES ('Hola', 'Este es un post de ejemplo', 1);
