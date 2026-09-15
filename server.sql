
CREATE TABLE suppliers(
    id   SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    contact_number TEXT
);

CREATE TABLE products(
    id   SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    price NUMERIC (10,2)  CHECK(price>0),
    stock_Quantity  INT NOT NULL DEFAULT 0  CHECK(stock_Quantity>=0),
    supplier_id INT NOT NULL  REFERENCES suppliers(id) ON DELETE RESTRICT
);

CREATE TABLE sales(
    id   SERIAL PRIMARY KEY ,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity_sold INT NOT NULL,
    sale_date DATE

);
//5
ALTER TABLE products ADD COLUMN category VARCHAR(250)
ALTER TABLE products DROP COLUMN category
ALTER TABLE suppliers ALTER COLUMN contact_number TYPE VARCHAR(15)
ALTER TABLE products ALTER COLUMN name SET NOT NULL;


//6
INSERT INTO suppliers(name,contact_number)
VALUES('FreshFoods','01001234567')
RETURNING id;
INSERT INTO products(name,price,stock_quantity,supplier_id) VALUES('Milk',15.00,50,4),('Bread',10.00,30,4),('Eggs',20,40,4)
RETURNING id
INSERT INTO sales(quantity_sold,sale_date,product_id)
VALUES(2,'2025-05-20',3)
RETURNING id;


//7
UPDATE products SET price= 25.00 WHERE id =4;
//8
DELETE FROM products  WHERE id =5;
//9
SELECT SUM(quantity_sold) FROM sales;
//10
SELECT * FROM products
ORDER BY stock_quantity DESC
LIMIT=1;
//11
SELECT * FROM suppliers   WHERE name LIKE 'F%'
//12
SELECT * FROM products
LEFT JOIN sales ON products.id= sales.product_id
WHERE sales.product_id IS NULL

//13
SELECT products.name,sales.quantity_sold,sales.sale_date
 FROM sales
JOIN products  ON sales.product_id = products.id;

 //14 CREATE USER store_manager  WITH PASSWORD='147852';
//14 GRANT SELECT,INSERT,UPDATE ON ALL TABLES IN SCHEMA PUBLIC TO store_manager;
//15 REVOKE UPDATE ON ALL TABLES IN SCHEMA PUBLIC FROM store_manager;
 //16 GRANT DELETE ON ALL TABLES IN SCHEMA PUBLIC TO store_manaager;