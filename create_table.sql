CREATE TABLE IF NOT EXISTS Students
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    class VARCHAR(100),
    marks INT
);

CREATE TABLE IF NOT EXISTS Teachers
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
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
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    teacher_id INT,
    student_id INT,
    FOREIGN KEY (teacher_id) REFERENCES Teachers(id),
    FOREIGN KEY (student_id) REFERENCES Students(id)
);

ALTER TABLE Students
DROP COLUMN marks,
ADD COLUMN mark_id INT,
ADD FOREIGN KEY (mark_id) REFERENCES Marks(id);