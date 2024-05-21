-- Your SQL goes here

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    umask INT DEFAULT 022 NOT NULL,
    root BOOLEAN NOT NULL DEFAULT FALSE
);
-- username: root password: root 
INSERT INTO users (username, password, root) VALUES ('root', '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2', true);