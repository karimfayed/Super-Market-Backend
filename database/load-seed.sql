#USE supermarketdb;

-- Insert data into items table
INSERT INTO items ( itemName, itemDescription, stockQuantity, price)
VALUES
('Milk', 'Fresh milk from local farms', 50, 2.99),
('Bread', 'Whole wheat bread', 30, 1.99),
('Eggs', 'Farm-fresh eggs', 100, 4.99);

-- Insert data into users table
INSERT INTO users (email, firstName, lastName, is_active)
VALUES
('john.doe@example.com', 'John', 'Doe', 1),
('jane.smith@example.com', 'Jane', 'Smith', 1);

-- Insert data into invoices table
INSERT INTO invoices (creationDate, invoiceStatus, email)
VALUES
('2024-01-19 10:00:00', 'Paid', 'john.doe@example.com'),
('2024-01-20 14:30:00', 'Pending', 'jane.smith@example.com');

-- Insert data into invoiceItems table
INSERT INTO invoiceItems (quantity, totalUnitPrice, itemId, invoiceId)
VALUES
(3, 8.97, 1, 1),
(2, 3.98, 2, 1),
(5, 24.95, 3, 2);
