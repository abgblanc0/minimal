-- Your SQL goes here

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    ctime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    root BOOLEAN NOT NULL DEFAULT FALSE
);


INSERT INTO users (username, password) VALUES ('user1', '5dc61e5f83b08499d8d19c1078a437d4133a93b84d71b7baf9f4ea2c9343546d');
INSERT INTO users (username, password) VALUES ('user2', 'd33bbd0c5c0c4ed1c62d02c18b7401bf35860203b82636f6f98b70ac18684b70');
INSERT INTO users (username, password) VALUES ('user3', 'd4916d41a1c22f501d724d5c160b36a3493a04022d9f6d871e6207f6fbcd3989');
INSERT INTO users (username, password) VALUES ('user4', 'f88d221acae20fa0b2204cb834208a5255ae630303e7e1ac1c6a1e1c2adbb638');
INSERT INTO users (username, password) VALUES ('user5', 'ed0b4a9256f383aeac45b008230f92f2d517d8c04db49d22e14e6fe17d8f03b5');
INSERT INTO users (username, password) VALUES ('user6', '8e32ecbc167e43b7a90e0c4bf11c69b5123056d56bfdeff44362d8a1f8bb5e0a');
INSERT INTO users (username, password) VALUES ('user7', 'e75e47d882a62b80a9d9c26cd05ef530846e0835e3d95fd25f32cb801d2259b9');
INSERT INTO users (username, password) VALUES ('user8', '7fbb4ab3b12c47c3f3d04cfcf0a29843dc8a3aa1e415f1ed66f4cbb1ac2a243f');
INSERT INTO users (username, password) VALUES ('user9', '3f2796a16f2b76a1aefeb9a6811a228f07c8b61da5844a30a9f567c9d8193c9b');
INSERT INTO users (username, password) VALUES ('user10', '91b2f7437009ef1b24a62a82c2e2e632f152b6b53966d8e70e31835f4ec9c5bb');
INSERT INTO users (username, password) VALUES ('asd', 'a4d3ff6ab1920863f4cc3a778eedac3493ae2f9360a67f2d2212c02a3b18a78a');
