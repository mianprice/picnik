CREATE TABLE users (
    id int PRIMARY KEY,
    first_name varchar,
    last_name varchar,
    user_name varchar,
    password varchar,
    of_age boolean
);

CREATE TABLE beer (
    id int PRIMARY KEY,
    name varchar,
    style varchar,
    image varchar
);

CREATE TABLE wine (
    id int PRIMARY KEY,
    name varchar,
    style varchar,
    image varchar
);

CREATE TABLE parks (
    id int PRIMARY KEY,
    name varchar,
    address varchar
);

CREATE TABLE recipes (
    id int PRIMARY KEY,
    name varchar,
    address varchar
);

CREATE TABLE saved_items (
    id int PRIMARY KEY,
    item_name varchar,
    image varchar,
    user_id int REFERENCES users (id)
);

CREATE TABLE taste_profile (
    id int PRIMARY KEY,
    user_id int REFERENCES users (id)
);

CREATE TABLE user_picks (
    id int PRIMARY KEY,
    favorites boolean,
    date_of varchar,
    user_id int REFERENCES users (id),
    weather_zip int REFERENCES weather (zip),
    beer_id int REFERENCES beer (id),
    wine_id int REFERENCES wine (id),
    recipe_id int REFERENCES recipes (id),
    park_id int REFERENCES parks (id)
);

CREATE TABLE weather (
    zip int PRIMARY KEY,
    forecast json,
    date_of varchar
);
