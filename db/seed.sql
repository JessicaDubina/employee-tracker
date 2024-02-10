INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Operations'),
    ('Finance'),
    ('HR'),
    ('Sales');

INSERT INTO roles (job_title, department_id, salary) VALUES
    ('Module Engineer', 1, 125000),
    ('Product Engineer', 1, 135000),
    ('Manufacturing Engineer', 1, 120000),
    ('Technician', 2, 55000),
    ('Operations Lead', 2, 65000),
    ('Operations Manager', 2, 75000),
    ('Analyst', 3, 65000),
    ('Payroll', 3, 60000),
    ('CFO', 3, 200000),
    ('HR Associate', 4, 65000),
    ('HR Manager', 4, 80000),
    ('Sales Lead', 5, 80000),
    ('Aquisitions Manager', 5, 150000),
    ('Marketing Analyst', 5, 90000);

INSERT INTO employees (first_name, last_name, role_id, manager) VALUES
    ('Michael', 'Brax', 6, NULL),
    ('Tristan', 'Thompson', 9, NULL),
    ('John', 'True', 4, 1),
    ('Blue', 'Heeler', 11, 2),
    ('Josie', 'Feller', 13, 2),
    ('John', 'Crew', 1, 3),
    ('Layannah', 'Feller', 2, 3),
    ('Blaine', 'Johnson', 3, 3),
    ('Johnny', 'Sachue', 4, 1),
    ('Desiree', 'Pom', 4, 1),
    ('Norina', 'Abey', 5, 1),
    ('Sue', 'Zette', 7, 2),
    ('Lisa', 'Laing', 8, 2),
    ('Edna', 'Merin', 10, 4),
    ('JC', 'Hernandez', 10, 4),
    ('Tyker', 'Noname', 12, 4),
    ('Nicole', 'Rerf', 12, 5),
    ('Erica', 'Del', 14, 5);