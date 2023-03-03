INSERT INTO department (department_name)
VALUES 
("Sales"),
("Engineering"),
("Marketing");


INSERT INTO role (title, salary, department_id)
VALUES 
("Sales", 100000, 1),
("Creative Director", 150000, 1),
("Engineer", 30000, 2),
("Accountant", 800000, 3),
("Support", 950000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("James", "Rogan", 1, null),
("Sam", "Chi", 2, 1),
("Tommy", "Daly", 3, null),
("Paul", "Jones", 4, 3),
("Tony", "Smith", 5, null);
