-- Your SQL goes here

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    ctime timestamp with time zone DEFAULT now(),
    username VARCHAR(100) NOT NULL UNIQUE,
    password CHAR(64) NOT NULL
);

INSERT INTO users (username, password) VALUES ('user1', 'password1');
INSERT INTO users (username, password) VALUES ('user2', 'password2');
INSERT INTO users (username, password) VALUES ('user3', 'password3');
INSERT INTO users (username, password) VALUES ('user4', 'password4');
INSERT INTO users (username, password) VALUES ('user5', 'password5');
INSERT INTO users (username, password) VALUES ('user6', 'password6');
INSERT INTO users (username, password) VALUES ('user7', 'password7');
INSERT INTO users (username, password) VALUES ('user8', 'password8');
INSERT INTO users (username, password) VALUES ('user9', 'password9');
INSERT INTO users (username, password) VALUES ('user10', 'password10');
INSERT INTO users (username, password) VALUES ('asd', 'asd');
