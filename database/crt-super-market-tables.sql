drop database supermarketdb;
-- -----------------------------------------------------
-- Create database and tables
-- -----------------------------------------------------

CREATE DATABASE supermarketdb;

-- -----------------------------------------------------
-- schema librarydb
-- -----------------------------------------------------

USE supermarketdb;

-- -----------------------------------------------------
-- table items
-- -----------------------------------------------------

CREATE TABLE items (
  itemId INT PRIMARY KEY AUTO_INCREMENT,
  itemName VARCHAR(255) NOT NULL,
  itemDescription VARCHAR(255),
  stockQuantity INT NOT NULL,
  price DECIMAL(10, 2)
);

-- -----------------------------------------------------
-- table users
-- -----------------------------------------------------

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------
-- table invoices
-- -----------------------------------------------------

CREATE TABLE invoices (
  invoiceId INT PRIMARY KEY AUTO_INCREMENT,
  creationDate DATETIME NOT NULL,
  invoiceStatus VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  FOREIGN KEY (email) REFERENCES users(email)
);

-- -----------------------------------------------------
-- table invoiceItems
-- -----------------------------------------------------

CREATE TABLE invoiceItems (
  invoiceItemId INT PRIMARY KEY AUTO_INCREMENT,
  quantity INT NOT NULL,
  totalUnitPrice DECIMAL(10, 2),
  itemId INT,
  invoiceId INT,
  FOREIGN KEY (itemId) REFERENCES items(itemId),
  FOREIGN KEY (invoiceId) REFERENCES invoices(invoiceId)
);