---
title: 'Oracle DML Explained: Advanced SQL from INSERT to MERGE'
description: "Master Oracle SQL DML commands including INSERT, UPDATE, DELETE, and MERGE with practical examples and advanced techniques for efficient data manipulation."
date: '2025-06-25'
categories:
  - software
published: true
author: 'Jonas Fröller'
readingTime: '15 min'
tags: ['Oracle SQL', 'Database', 'DML', 'Data Manipulation']
---

# Oracle SQL DML: Complete Guide to Data Manipulation Language

Whether you're building enterprise systems or tuning existing apps, mastering Oracle's DML commands can dramatically improve your database efficiency. This guide takes you from beginner-friendly basics to expert-level techniques with real-life use cases.

Data Manipulation Language (DML) is the cornerstone of database operations, allowing developers to insert, update, and delete data in existing database tables. In Oracle SQL, DML commands are essential tools that every database professional must master. This comprehensive guide explores Oracle's DML capabilities with practical examples and advanced techniques.

## Understanding DML: The Foundation of Data Operations

DML commands are designed specifically for manipulating data within already existing database tables. Unlike DDL (Data Definition Language) which structures the database, DML focuses on the actual data content. The three primary DML operations are:

- **INSERT**: Adding new records to tables
- **UPDATE**: Modifying existing records
- **DELETE**: Removing records from tables

An important characteristic of DML operations is that they can all trigger database triggers and support the `RETURNING` clause to capture modified data into variables.

## INSERT: Adding Data to Your Database

The INSERT statement is your gateway to adding new data. Oracle provides several powerful variations of INSERT that go far beyond simple single-row insertions.

### Basic Single Row Insertion

```sql
-- Adding a new author
INSERT INTO Authors (Name) VALUES ('J.K. Rowling');

-- Adding a new book with a subquery
INSERT INTO Books (AuthorId, Title, Price, PublicationYear)
VALUES ((SELECT AuthorId FROM Authors WHERE Name = 'J.K. Rowling'), 
        'Harry Potter and the Philosopher''s Stone', 20.99, 1997);
```

### Multiple Row Insertion

For inserting multiple records efficiently, Oracle offers several approaches:

```sql
-- Using UNION ALL for multiple authors
INSERT INTO Authors (Name)
SELECT 'Friedrich Nietzsche' FROM DUAL UNION ALL
SELECT 'Plato' FROM DUAL UNION ALL
SELECT 'Aristotle' FROM DUAL UNION ALL
SELECT 'Immanuel Kant' FROM DUAL UNION ALL
SELECT 'Søren Kierkegaard' FROM DUAL;
```

### Advanced INSERT Techniques

#### INSERT ALL: Conditional Multi-Table Insertions

One of Oracle's most powerful features is `INSERT ALL`, which allows you to insert data into multiple tables from a single query:

```sql
INSERT ALL
WHEN order_total <= 100000 THEN
    INTO small_orders
WHEN order_total > 100000 AND order_total <= 200000 THEN
    INTO medium_orders
ELSE
    INTO large_orders
SELECT order_id, order_total, sales_rep_id, customer_id
FROM orders;
```

#### INSERT FIRST: First-Match Logic

Unlike `INSERT ALL` which evaluates all conditions, `INSERT FIRST` stops at the first matching condition:

```sql
INSERT FIRST
WHEN ottl <= 100000 THEN
    INTO small_orders VALUES(oid, ottl, sid, cid)
WHEN ottl > 100000 AND ottl <= 200000 THEN
    INTO medium_orders VALUES(oid, ottl, sid, cid)
WHEN ottl > 200000 THEN
    INTO large_orders VALUES(oid, ottl, sid, cid)
SELECT o.order_id oid, o.customer_id cid, o.order_total ottl,
       o.sales_rep_id sid
FROM orders o, customers c
WHERE o.customer_id = c.customer_id;
```

#### BULK INSERT with WITH Clause

For complex data preparation before insertion:

```sql
INSERT INTO people (person_id, given_name, family_name, title)
WITH names AS (
    SELECT 4, 'Ruth', 'Fox', 'Mrs' FROM dual UNION ALL
    SELECT 5, 'Isabelle', 'Squirrel', 'Miss' FROM dual UNION ALL
    SELECT 6, 'Justin', 'Frog', 'Master' FROM dual
)
SELECT * FROM names
WHERE family_name LIKE 'F%';
```

### INSERT Limitations and Best Practices

When using `INSERT ALL`, be aware of these limitations:
- Maximum 15 rows for tables with 4096 columns
- Maximum 65 rows for tables with 1000 columns
- Only works with physical tables (no views or materialized views)
- No parallel processing with index-organized tables
- Cannot use sequences in subqueries
- Not applicable to remote tables

## UPDATE: Modifying Existing Data

The UPDATE statement allows you to modify one or more rows in a table, with the WHERE clause determining which rows are affected.

### Basic UPDATE Operations

```sql
-- Update book price
UPDATE Books
SET Price = 22.99
WHERE Title = 'Harry Potter and the Philosopher''s Stone';

-- Update multiple columns
UPDATE employees
SET job_id = 'SA_MAN', 
    salary = salary + 1000, 
    department_id = 140
WHERE last_name = 'Jones';
```

### UPDATE with RETURNING

Capture the updated values for further processing:

```sql
UPDATE employees
SET job_id = 'SA_MAN', salary = salary + 1000, department_id = 140
WHERE last_name = 'Jones'
RETURNING salary*0.25, last_name, department_id
INTO :bnd1, :bnd2, :bnd3;
```

### Setting Default Values

```sql
UPDATE table_name SET column_name = DEFAULT WHERE condition;
```

## DELETE: Removing Data Safely

DELETE operations remove rows from tables based on specified conditions. Understanding the difference between DELETE and TRUNCATE is crucial for database management.

### Basic DELETE Operations

```sql
-- Delete a specific author
DELETE FROM Authors
WHERE Name = 'J.K. Rowling';

-- Clean up orphaned records
DELETE FROM Books
WHERE AuthorId NOT IN (SELECT AuthorId FROM Authors);
```

### DELETE vs TRUNCATE

Key differences between DELETE and TRUNCATE:

**DELETE:** (DML)
- Selective deletion with WHERE clause
- Triggers can be fired
- Operations logged in transaction log
- Can be rolled back

**TRUNCATE:** (DDL)
- Removes all rows at once
- Faster performance
- Cannot fire triggers
- Minimal logging
- Cannot be rolled back easily

## MERGE: The Swiss Army Knife of DML

MERGE is Oracle's "upsert" operation, combining INSERT and UPDATE functionality in a single statement. It's particularly useful for data synchronization scenarios.

```sql
MERGE INTO Books b
USING (
    SELECT AuthorId, 'New Book Title' AS Title, 19.99 AS Price, 2025 AS PublicationYear
    FROM Authors
    WHERE Name = 'J.K. Rowling'
) src
ON (b.Title = src.Title)
WHEN MATCHED THEN
    UPDATE SET b.Price = src.Price
WHEN NOT MATCHED THEN
    INSERT (AuthorId, Title, Price, PublicationYear)
    VALUES (src.AuthorId, src.Title, src.Price, src.PublicationYear);
```

## Advanced DML Features

### Error Logging

Oracle provides robust error handling for DML operations:

```sql
INSERT INTO raises
SELECT employee_id, salary*1.1 FROM employees
WHERE commission_pct > .2
LOG ERRORS INTO errlog ('my_bad') REJECT LIMIT 10;
```

### Remote Operations

Execute DML operations on remote databases:

```sql
INSERT INTO employees@remote
VALUES (8002, 'Juan', 'Fernandez', 'juanf@example.com', NULL,
        TO_DATE('04-OCT-1992', 'DD-MON-YYYY'), 'SH_CLERK', 3000,
        NULL, 121, 20);
```

## Understanding DQL: The Query Component

While SELECT is technically part of DQL (Data Query Language), it's often considered alongside DML when it involves data manipulation through subqueries or when used with INSERT statements. 

> According to Wikipedia: "Although often considered part of DML, the SQL SELECT statement is strictly speaking part of the DQL SQL subcategory."

### JOIN Operations

Oracle supports various JOIN types for combining data from multiple tables:

**Basic JOIN Types:**
```sql
-- INNER JOIN with ON clause
SELECT * FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- JOIN with USING clause
SELECT * FROM employees
JOIN departments USING (dept_id);

-- NATURAL JOIN (implicit join on columns with same names)
SELECT * FROM employees
NATURAL JOIN departments;

-- Implicit JOIN (deprecated style)
SELECT * FROM employees e, departments d
WHERE e.dept_id = d.dept_id;

-- CROSS JOIN (Cartesian product)
SELECT * FROM table1 CROSS JOIN table2;
-- or
SELECT * FROM table1, table2;
```

### Subquery Types and Applications

Oracle supports various subquery types:

**Scalar Subqueries:**
```sql
SELECT BookId, Title, Price, PublicationYear
FROM Books
WHERE AuthorId = (SELECT AuthorId FROM Authors WHERE Name = 'Alice Smith');
```

**EXISTS Subqueries:**
```sql
-- Find departments with at least one employee
SELECT department_name
FROM departments d
WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.department_id);

-- Find products that were never ordered
SELECT product_name
FROM products p
WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.product_id);
```

**IN/ANY/ALL Subqueries:**
```sql
-- Find employees in departments located at location 1700
SELECT employee_id, first_name, last_name
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);

-- ANY: Higher than at least one product in category 1
SELECT product_name, price
FROM products
WHERE price > ANY (SELECT price FROM products WHERE category_id = 1);

-- ALL: Higher than all products in category 2
SELECT product_name, price
FROM products
WHERE price > ALL (SELECT price FROM products WHERE category_id = 2);
```

**Subquery in FROM Clause:**
```sql
-- Top 10 orders with highest value
SELECT *
FROM (SELECT order_id, SUM(quantity * unit_price) AS order_value
      FROM order_items
      GROUP BY order_id
      ORDER BY order_value DESC) top_orders
WHERE ROWNUM <= 10;
```

### GROUP BY and Aggregation Functions

**Basic GROUP BY:**
```sql
-- Average selling price per book
SELECT b.Title, AVG(b.Price) AS AvgPrice
FROM Books b
GROUP BY b.Title
ORDER BY AvgPrice DESC;
```

**GROUP BY with HAVING:**
```sql
-- Books with average sale price over 30
SELECT b.Title, AVG(s.Price) AS AvgSalePrice
FROM Books b
JOIN Sales s ON b.BookId = s.BookId
GROUP BY b.Title
HAVING AVG(s.Price) > 30
ORDER BY AvgSalePrice DESC;
```

**The GROUP BY Rule:**
When using GROUP BY, follow this rule: Group by all columns in SELECT that are not part of an aggregate function (SUM, AVG, COUNT, etc.). This ensures correct aggregation calculation.

### Oracle's Comprehensive Aggregation Functions: An Overview

Oracle provides an extensive set of aggregation functions organized into categories:

1. **Basic Statistical Functions:** AVG, COUNT, MAX, MEDIAN, MIN, SUM, VARIANCE, STDDEV
2. **Extended Statistical Functions:** CORR, COVAR_POP, COVAR_SAMP, KURTOSIS_POP, KURTOSIS_SAMP, SKEWNESS_POP, SKEWNESS_SAMP
3. **Ranking Functions:** DENSE_RANK, PERCENT_RANK, RANK, CUME_DIST
4. **Approximation Functions:** APPROX_COUNT, APPROX_COUNT_DISTINCT, APPROX_MEDIAN, APPROX_PERCENTILE, APPROX_RANK, APPROX_SUM
5. **Grouping Functions:** GROUP_ID, GROUPING, GROUPING_ID
6. **First/Last Values:** FIRST, LAST
7. **Logical Aggregations:** EVERY, BOOLEAN_AND_AGG, BOOLEAN_OR_AGG
8. **Bitwise Aggregations:** BIT_AND_AGG, BIT_OR_AGG, BIT_XOR_AGG
9. **JSON Aggregations:** JSON_ARRAYAGG, JSON_OBJECTAGG
10. **Statistical Test Functions:** STATS_BINOMIAL_TEST, STATS_CROSSTAB, STATS_F_TEST, STATS_KS_TEST, STATS_MW_TEST, STATS_ONE_WAY_ANOVA, STATS_T_TEST*, STATS_WSR_TEST
11. **Regression Functions:** REGR_* (Linear regression functions)
12. **Collection Functions:** COLLECT, LISTAGG
13. **XML Aggregations:** SYS_XMLAGG, XMLAGG
14. **Special Functions:** ANY_VALUE, CHECKSUM, SYS_OP_ZONE_ID, TO_APPROX_COUNT_DISTINCT, TO_APPROX_PERCENTILE

### Hierarchical Queries with CONNECT BY

Oracle's hierarchical query capability allows you to work with tree-structured data:

```sql
SELECT LEVEL,
       LPAD('-', 6*(LEVEL-1)) || ename AS hierarchie,
       empno,
       mgr
FROM emp
START WITH mgr IS NULL
CONNECT BY PRIOR empno = mgr
ORDER SIBLINGS BY ename;
```

### Set Operators: Combining Query Results

Set operators combine results from multiple SELECT statements, similar to JOINs but working with rows rather than columns:

```sql
-- Combine customers and employees
SELECT 'Customer' AS record_type, first_name, last_name
FROM customer
UNION
SELECT 'Employee', first_name, last_name
FROM employee;
```

**Set Operator Types:**

| Operator      | Returns                                                                          |
| ------------- | -------------------------------------------------------------------------------- |
| UNION         | All unique rows                                                                  |
| UNION ALL     | All rows, including duplicates                                                   |
| INTERSECT     | All unique rows selected by both queries                                         |
| INTERSECT ALL | All rows selected by both queries, including duplicates                          |
| MINUS         | All unique rows from first query but not second (like EXCEPT in other databases) |
| MINUS ALL     | All rows from first query but not second, including duplicates                   |

**Key Requirements for Set Operators:**
- Number of columns must match between queries
- Data types of corresponding columns must be compatible
- ORDER BY must be placed at the end of the final query

### JOINs vs Set Operators: Understanding the Difference

**JOINs:**
- Work with relationships between tables
- Flexible combination based on conditions
- Connect rows from different tables
- Focus on columns

**Set Operators:**
- No relationships required
- Require compatible table structures
- Combine entire result sets
- Focus on rows

### EXPLAIN PLAN for Performance Analysis

Understanding query execution plans is crucial for DML optimization:

```sql
EXPLAIN PLAN
SET STATEMENT_ID = 'Raise in Tokyo'
INTO plan_table
FOR UPDATE employees
SET salary = salary * 1.10
WHERE department_id = (SELECT department_id FROM departments WHERE location_id = 1700);

-- View the execution plan
SELECT id, LPAD(' ',2*(LEVEL-1))||operation operation, options,
       object_name, object_alias, position
FROM plan_table
START WITH id = 0 AND statement_id = 'Raise in Tokyo'
CONNECT BY PRIOR id = parent_id AND statement_id = 'Raise in Tokyo'
ORDER BY id;
```

## Performance Considerations and Best Practices

### Efficient Data Operations

1. **Use BULK operations** when inserting multiple rows
2. **Leverage MERGE** for upsert scenarios instead of separate INSERT/UPDATE logic
3. **Implement proper indexing** on columns used in WHERE clauses
4. **Use RETURNING clause** to minimize round trips to the database
5. **Consider INSERT ALL** for multi-table operations

### Transaction Management

Always consider transaction boundaries when performing DML operations:
- Use explicit transactions for related operations
- Implement proper error handling
- Consider the impact of triggers on performance
- Plan for rollback scenarios

## Conclusion

Oracle SQL DML provides a comprehensive toolkit for data manipulation, from simple insertions to complex multi-table operations. Understanding these commands and their advanced features is essential for effective database development and maintenance.

The key to mastering DML lies in understanding when to use each command variant and how to leverage Oracle's unique features like INSERT ALL, MERGE, and the RETURNING clause. With proper application of these techniques, you can build efficient, maintainable database applications that handle data manipulation tasks with precision and performance.

Whether you're building new applications or maintaining existing systems, these DML techniques will serve as the foundation for robust data management in Oracle databases.
