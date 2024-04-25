-- Your SQL goes here

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    ctime timestamp with time zone DEFAULT now(),
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
