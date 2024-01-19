-- USE supermarketdb;

-- Insert data into items table
INSERT INTO items (itemId, itemName, itemDescription, stockQuantity, price)
VALUES
('1001', 'Milk', 'Fresh milk from local farms', 50, 2.99),
('1002', 'Bread', 'Whole wheat bread', 30, 1.99),
('1003', 'Eggs', 'Farm-fresh eggs', 100, 4.99);

-- Insert data into users table
INSERT INTO users (email, firstName, lastName)
VALUES
('john.doe@example.com', 'John', 'Doe'),
('jane.smith@example.com', 'Jane', 'Smith');

-- Insert data into invoices table
INSERT INTO invoices (creationDate, invoiceStatus, email)
VALUES
('2024-01-19 10:00:00', 'Paid', 'john.doe@example.com'),
('2024-01-20 14:30:00', 'Pending', 'jane.smith@example.com');

-- Insert data into invoiceItems table
INSERT INTO invoiceItems (quantity, totalUnitPrice, itemId, invoiceId)
VALUES
(3, 8.97, '1001', 1),
(2, 3.98, '1002', 1),
(5, 24.95, '1003', 2);
