---------------------
-- Create Database --
---------------------
CREATE DATABASE picnik_db;

-------------------------
-- Connect to Database --
-------------------------
\c picnik_db;

-------------------
-- Create Tables --
-------------------
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar,
    last_name varchar,
    user_name varchar,
    password varchar,
    email varchar,
    of_age boolean
);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    token VARCHAR,
    created VARCHAR,
    expires VARCHAR,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE beer (
    id SERIAL PRIMARY KEY,
    name varchar,
    style varchar,
    image varchar
);

CREATE TABLE wine (
    id SERIAL PRIMARY KEY,
    name varchar,
    style varchar,
    image varchar
);

CREATE TABLE parks (
    id SERIAL PRIMARY KEY,
    name varchar,
    address varchar
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name varchar,
    address varchar
);

CREATE TABLE saved_items (
    id SERIAL PRIMARY KEY,
    item_name varchar,
    image varchar,
    user_id int REFERENCES users (id)
);

CREATE TABLE taste_profile (
    id SERIAL PRIMARY KEY,
    user_id int REFERENCES users (id)
);

CREATE TABLE weather (
    zip SERIAL PRIMARY KEY,
    forecast json,
    date_of varchar
);

CREATE TABLE user_picks (
    id SERIAL PRIMARY KEY,
    favorites boolean,
    date_of varchar,
    user_id int REFERENCES users (id),
    weather_zip int REFERENCES weather (zip),
    beer_id int REFERENCES beer (id),
    wine_id int REFERENCES wine (id),
    recipe_id int REFERENCES recipes (id),
    park_id int REFERENCES parks (id)
);
