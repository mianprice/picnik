-- YUMMLY API MIRROR DB SCHEMA

CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    total_time INTEGER,
    f_piquant DECIMAL, -- could make it base 6 and cut out the decimal
    f_meaty DECIMAL,
    f_bitter DECIMAL,
    f_sweet DECIMAL,
    f_sour DECIMAL,
    f_salty DECIMAL,
    rating NUMERIC
);

CREATE TABLE cuisines(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE recipes_cuisines(
    recipe_id INTEGER REFERENCES recipes(id),
    cuisine_id INTEGER REFERENCES cuisines(id)
);

CREATE TABLE courses(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE recipes_courses(
    recipe_id INTEGER REFERENCES recipes(id),
    course_id INTEGER REFERENCES courses(id)
);

CREATE TABLE recipe_links(
    recipe_id INTEGER REFERENCES recipes(id),
    yummly_id VARCHAR,
    image_url VARCHAR
);

-- BREWERYDB API MIRROR DB SCHEMA

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

-- SNOOTH API MIRROR DB SCHEMA

CREATE TABLE wines(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE varietals(
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE wines_varietals(
    wine_id INTEGER REFERENCES wines(id),
    varietal_id INTEGER REFERENCES varietals(id)
);

CREATE TABLE wine_links(
    wine_id INTEGER REFERENCES wines(id),
    snooth_code VARCHAR,
    region VARCHAR,
    winery VARCHAR,
    winery_id VARCHAR,
    price VARCHAR,
    vintage VARCHAR,
    type VARCHAR,
    link VARCHAR,
    image_link VARCHAR
);
