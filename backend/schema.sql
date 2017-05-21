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
    of_age boolean,
    taste_profile varchar,
    cuisine_profile varchar,
    wine_profile varchar,
    beer_profile varchar
);

CREATE TABLE sessions(
    id SERIAL PRIMARY KEY,
    token VARCHAR,
    created VARCHAR,
    expires VARCHAR,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE beer_saves (
    api_id varchar,
    user_id int references users(id)
);

CREATE TABLE beer (
    id SERIAL PRIMARY KEY,
    name varchar,
    style varchar,
    image varchar
);

CREATE TABLE wine_saves (
    api_id varchar,
    user_id int references users(id)
);

CREATE TABLE wine (
    id SERIAL PRIMARY KEY,
    name varchar,
    style varchar,
    image varchar
);

CREATE TABLE parks_saves (
    api_id varchar,
    user_id int references users(id)
);

CREATE TABLE parks (
    id SERIAL PRIMARY KEY,
    name varchar,
    address varchar
);

CREATE TABLE recipes_saves (
    api_id varchar,
    user_id int references users(id)
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
