DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
    id INTEGER NOT NULL AUTO_INCREMENT,
    username TEXT(16) NOT NULL,
    text TEXT(141) NOT NULL,
    upvotes INTEGER DEFAULT 0,
    time_posted DATE NOT NULL
)