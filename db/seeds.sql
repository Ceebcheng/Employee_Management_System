INSERT INTO department (name)
VALUES  ("Sales"),
        ("Developers"),
        ("HR");

INSERT INTO role (title, salary, department_id)
VALUES  ("salesManager", 100000, 1),
        ("salesLead", 75000, 1),
        ("developManager", 100000, 2),
        ("developLead", 75000, 2),
        ("HRManager", 100000, 3),
        ("HRLead", 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bob", "Builder", 1, NULL),
        ("Adam", "Sandler", 2, 1),
        ("Michael", "Jordan", 3, Null),
        ("Kobe", "Bryant", 4, 3),
        ("Tom", "Brady", 5, NULL),
        ("Randy", "Moss", 6, 5);