CREATE SCHEMA IF NOT EXISTS `db`;
CREATE DATABASE IF NOT EXISTS `db`;
SHOW DATABASES;

-- Optional
CREATE TABLE `db`.`user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL, 
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `db`.`movie` (
  `id` int NOT NULL AUTO_INCREMENT,  
  `title` varchar(100) NOT NULL,
  `director` varchar(100) NOT NULL,
  `status` enum('AVAILABLE','RENTED','UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
  PRIMARY KEY (`id`));

INSERT INTO `db`.`movie` (title, director)
VALUES
    ('Perdido em marte', 'diretor1'),
    ('Passageiros', 'diretor2'),
    ('Endgame', 'diretor3'),
    ('Blade Runner, O Caçador de Androides', 'Ridley Scott'),
    ('Gone with the Wind', 'diretor5'),
    ('O Mágico de Oz', 'diretor6'),
    ('Casablanca', 'diretor7'),
    ('De volta pro futuro', 'diretor8');