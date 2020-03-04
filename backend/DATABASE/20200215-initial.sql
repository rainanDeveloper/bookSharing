DROP DATABASE IF EXISTS booksharing;

CREATE DATABASE booksharing;

USE booksharing;

CREATE TABLE user(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    usr_login VARCHAR(120) NOT NULL,
    usr_pass CHAR(64) NOT NULL,
    usr_name VARCHAR(120) NOT NULL,
    usr_email VARCHAR(120) NOT NULL,
    usr_cpf CHAR(11) NOT NULL,
    usr_avatar VARCHAR(120) NOT NULL,
    usr_data_nasc DATE NOT NULL,
    usr_latitude DECIMAL(18, 14) NOT NULL,
    usr_longitude DECIMAL(18, 14) NOT NULL,
    usr_stars INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE author(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    auth_name VARCHAR(120) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE category(
    cat_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cat_desc VARCHAR(120) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE book(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    bk_title VARCHAR(120) NOT NULL,
    bk_subtitle VARCHAR(120) NOT NULL,
    bk_author INT NOT NULL DEFAULT 1,
    bk_category INT NOT NULL DEFAULT 1,
    bk_synopsis TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_bk_author FOREIGN KEY (bk_author) REFERENCES author(id),
    CONSTRAINT FK_bk_category FOREIGN KEY (bk_category) REFERENCES category(id)
);

CREATE TABLE book_request(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    rq_book INT NOT NULL,
    rq_usr INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE book_share(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sh_book INT NOT NULL,
    sh_usr INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE book_match(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    mt_request INT NOT NULL,
    mt_share INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);