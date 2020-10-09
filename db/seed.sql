CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username varchar(20),
    password varchar(20),
    profile_pic text
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES users(user_id)
);

-- Altering users password from VARCHAR(20) to text

ALTER TABLE users
ALTER COLUMN password
SET DATA TYPE text;