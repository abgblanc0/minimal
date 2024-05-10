-- Your SQL goes here
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL UNIQUE,
    parent VARCHAR(255) REFERENCES topics(name) ON DELETE CASCADE
);


CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    topic VARCHAR(255) DEFAULT 'misc' REFERENCES topics(name),
    UNIQUE (name, topic)
);

INSERT INTO topics (name)
VALUES ('misc');

-- Insertar un post para cada usuario
INSERT INTO posts (name, content, user_id)
SELECT 
    CONCAT('Post de ', u.username),
    CONCAT('Contenido del post de ', u.username),
    u.id
FROM 
    users u;

INSERT INTO posts (name, content, user_id) 
VALUES ('Hola', 'Este es un post de ejemplo', 1);

INSERT INTO topics (name)
VALUES ('juegos');
