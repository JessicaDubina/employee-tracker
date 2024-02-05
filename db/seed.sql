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
    ('John', 'Crew', 1, 'Jose'),
    ('Layannah', 'Feller', 2, 'Jose'),
    ('Blaine', 'Johnson', 3, 'Jose'),
    ('Johnny', 'Sachue', 4, 'Michael'),
    ('John', 'True', 4, 'Michael'),
    ('Desiree', 'Pom', 4, 'Michael'),
    ('Norina', 'Abey', 5, 'Michael'),
    ('Michael', 'Brax', 6, ''),
    ('Sue', 'Zette', 7, 'Tristan'),
    ('Lisa', 'Laing', 8, 'Tristan'),
    ('Tristan', 'Thompson', 9, ''),
    ('Edna', 'Merin', 10, 'Blue'),
    ('JC', 'Hernandez', 10, 'Blue'),
    ('Blue', 'Heeler', 11, 'Tristan'),
    ('Tyker', 'Noname', 12, 'Josie'),
    ('Nicole', 'Rerf', 12, 'Josie'),
    ('Josie', 'Feller', 13, 'Tristan'),
    ('Erica', 'Del', 14, 'Josie');

