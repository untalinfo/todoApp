CREATE DATABASE todo_tutorial;

USE  todo_tutorial;

CREATE TABLE users (
  id  INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);

SHOW TABLES;

CREATE TABLE todos (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  complete BOOLEAN DEFAULT false,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE shared_todos (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  todo_id INT,
  user_id INT,
  shared_with_id INT,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert tow user into the users table
INSERT INTO users (name, email, password)  VALUES ('John Doe', 'john@example.com', 'password1');
INSERT INTO users (name, email, password)  VALUES ('Jane Smith', 'jane@example.com', 'password2');

SELECT * FROM users;

-- Insert todos into the todos table, associated with the first user
INSERT INTO todos (title, user_id)
VALUES
('Buy groceries', 1),
('Clean the house', 1),
('Take out the trash',1),
('Get a haircut', 1),
('Go for a run', 1),
('got to the gym', 1);

-- Share todo 1 of user 1 with user 2
INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (1, 1, 2);

-- Get todos including shared todos by id
SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN  shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = 2 OR shared_todos.shared_with_id = 2;