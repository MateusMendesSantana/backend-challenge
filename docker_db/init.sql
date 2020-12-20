CREATE SCHEMA IF NOT EXISTS `db`;

-- Optional
CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  email varchar (100) NOT NULL, 
  password varchar (100) NOT NULL,
  PRIMARY KEY(email)
);

CREATE TABLE movie (
  id int  NOT NULL AUTO_INCREMENT,  
  title varchar(100) NOT NULL,
  director varchar(100) NOT NULL,
  rented boolean NOT NULL,
  PRIMARY KEY(id)
);