---------------------
-- Create Database --
---------------------
CREATE DATABASE picnik_db;

-------------------------
-- Connect to Database --
-------------------------
\c picnik_db;

-----------------------
-- Create API Tables --
-----------------------
-- YUMMLY API MIRROR DB SCHEMA --

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    f_piquant VARCHAR,
    f_meaty VARCHAR,
    f_bitter VARCHAR,
    f_sweet VARCHAR,
    f_sour VARCHAR,
    f_salty VARCHAR
);

CREATE TABLE cuisines(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE courses(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE ingredients(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE recipes_cuisines(
    recipe_id INTEGER REFERENCES recipes(id),
    cuisine_id INTEGER REFERENCES cuisines(id)
);

CREATE TABLE recipes_courses(
    recipe_id INTEGER REFERENCES recipes(id),
    course_id INTEGER REFERENCES courses(id)
);

CREATE TABLE recipes_ingredients(
    recipe_id INTEGER REFERENCES recipes(id),
    ingredient_id INTEGER REFERENCES ingredients(id)
);

CREATE TABLE recipe_links(
    recipe_id INTEGER REFERENCES recipes(id),
    yummly_id VARCHAR,
    image_url VARCHAR,
    source VARCHAR,
    total_time_seconds INTEGER,
    rating NUMERIC
);

-- BREWERYDB API MIRROR DB SCHEMA --

CREATE TABLE beers(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE breweries(
    id SERIAL PRIMARY KEY,
    brewery_db_breweryID VARCHAR,
    name VARCHAR,
    link VARCHAR,
    icon_image_link VARCHAR,
    medium_image_link VARCHAR,
    description VARCHAR,
    zip VARCHAR
);

CREATE TABLE styles(
    id SERIAL PRIMARY KEY,
    brewery_db_styleID VARCHAR,
    name VARCHAR
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    brewery_db_categoryID VARCHAR,
    name VARCHAR
);

CREATE TABLE breweries_beers(
    brewery_id INTEGER REFERENCES breweries(id),
    beer_id INTEGER REFERENCES beers(id)
);

CREATE TABLE categories_styles(
    category_id INTEGER REFERENCES categories(id),
    style_id INTEGER REFERENCES styles(id)
);

CREATE TABLE beers_styles(
    beer_id INTEGER REFERENCES beers(id),
    style_id INTEGER REFERENCES styles(id)
);

CREATE TABLE beer_links(
    beer_id INTEGER REFERENCES beers(id),
    brewery_db_id VARCHAR,
    abv VARCHAR,
    ibu VARCHAR,
    isOrganic BOOLEAN,
    label_image_link_medium VARCHAR,
    label_image_link_icon VARCHAR
);

-- SNOOTH API MIRROR DB SCHEMA --

CREATE TABLE wines(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE varietals(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE wineries(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    winery_snooth_id VARCHAR
);

CREATE TABLE wines_varietals(
    wine_id INTEGER REFERENCES wines(id),
    varietal_id INTEGER REFERENCES varietals(id)
);

CREATE TABLE wines_wineries(
    wine_id INTEGER REFERENCES wines(id),
    winery_id INTEGER REFERENCES wineries(id)
);

CREATE TABLE wine_links(
    wine_id INTEGER REFERENCES wines(id),
    snooth_code VARCHAR,
    region VARCHAR,
    price VARCHAR,
    vintage VARCHAR,
    type VARCHAR,
    link VARCHAR,
    image_link VARCHAR
);

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
    beer_id INTEGER REFERENCES beers(id),
    user_id int references users(id)
);

CREATE TABLE wine_saves (
    wine_id INTEGER REFERENCES wines(id),
    user_id int references users(id)
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
    recipe_id INTEGER REFERENCES recipes(id),
    user_id int references users(id)
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
    beer_id int REFERENCES beers (id),
    wine_id int REFERENCES wines (id),
    recipe_id int REFERENCES recipes (id),
    park_id int REFERENCES parks (id)
);
