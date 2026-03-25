CREATE TABLE IF NOT EXISTS Students
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    class VARCHAR(100),
    mark_id INT
);

CREATE TABLE IF NOT EXISTS Teachers
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    subject VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    class VARCHAR(100),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES Students(id)
);

CREATE TABLE IF NOT EXISTS Marks
(
    id SERIAL PRIMARY KEY,
    teacher_id INT,
    student_id INT,
    value FLOAT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(id),
    FOREIGN KEY (student_id) REFERENCES Students(id)
);

ALTER TABLE Students
ADD FOREIGN KEY (mark_id) REFERENCES Marks(id);