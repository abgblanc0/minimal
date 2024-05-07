-- Your SQL goes here

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    ctime timestamp with time zone DEFAULT now(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL
);

INSERT INTO users (username, email, password) VALUES ('user1', 'user1@example.com', 'password1');
INSERT INTO users (username, email, password) VALUES ('user2', 'user2@example.com', 'password2');
INSERT INTO users (username, email, password) VALUES ('user3', 'user3@example.com', 'password3');
INSERT INTO users (username, email, password) VALUES ('user4', 'user4@example.com', 'password4');
INSERT INTO users (username, email, password) VALUES ('user5', 'user5@example.com', 'password5');
INSERT INTO users (username, email, password) VALUES ('user6', 'user6@example.com', 'password6');
INSERT INTO users (username, email, password) VALUES ('user7', 'user7@example.com', 'password7');
INSERT INTO users (username, email, password) VALUES ('user8', 'user8@example.com', 'password8');
INSERT INTO users (username, email, password) VALUES ('user9', 'user9@example.com', 'password9');
INSERT INTO users (username, email, password) VALUES ('user10', 'user10@example.com', 'password10');
INSERT INTO users (username, email, password) VALUES ('asd', 'asd', 'asd');
