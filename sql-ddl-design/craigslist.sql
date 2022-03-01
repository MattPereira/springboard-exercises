DROP DATABASE IF EXISTS  craigslist;

CREATE DATABASE craigslist;

\c craigslist


CREATE TABLE regions
(
    id SERIAL PRIMARY KEY,
    region_name TEXT,
    region_pop INTEGER
);

CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
    pref_region_id INTEGER REFERENCES regions,
    user_name TEXT NOT NULL,
    email TEXT
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    cat_name TEXT
);

CREATE TABLE posts
    id SERIAL PRIMARY KEY,
(
    user_id INTEGER REFERENCES users,
    region_id INTEGER REFERENCES regions,
    category_id INTEGER REFERENCES categories,
    title TEXT NOT NULL,
    post_description TEXT,
    post_location TEXT 
);


INSERT INTO regions
    (region_name, region_pop)
VALUES
    ('San Francisco', 14213424),
    ('Atlanta', 1353434),
    ('Seattle', 12431424),
    ('New York', 875854),
    ('Portland', 4554806);


INSERT INTO users
    (pref_region_id, user_name, email)
VALUES 
    (1, 'George Costanza', 'gcostanza@gmail.com'),
    (5, 'Kramer', 'kramer@gmail.com'),
    (3, 'Elaine Benise', 'ebenise@gmail.com'),
    (4, 'Jerry Seinfeld', 'jseinfeld@gmail.com'),
    (2, 'Newman', 'newman@gmail.com');


INSERT INTO categories
    (category)
VALUES
    ('jobs'),
    ('housing'),
    ('services'),
    ('discussion');


INSERT INTO posts
    (user_id, region_id, category_id, title, post_description, post_location)
VALUES
    (1, 1, 1, 'database specialist', 'Company in need of software engineer', 'Daly City'),
    (4, 4, 3, 'Audience', 'In need of audience to laugh at my jokes', 'Manhattan'),
    (2, 5, 4, 'Politics', 'Whats the deal with politics?', 'Southeast Portland');
