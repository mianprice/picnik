-- INDEXES --

create index wines_idx on wines(id);
create index wines_wineries_idx on wines_wineries(wine_id);
create index wines_varietals_idx on wines_varietals(wine_id);
create index wine_links_idx on wine_links(wine_id);

create index recipes_idx on recipes(id);
create index recipes_ingredients_idx on recipes_ingredients(recipe_id);
create index recipes_courses_idx on recipes_courses(recipe_id);
create index recipes_cuisines_idx on recipes_cuisines(recipe_id);
create index recipe_links_idx on recipe_links(recipe_id);

create index beers_idx on beers(id);
create index beers_breweries_idx on beers_breweries(beer_id);
create index beers_styles_idx on beers_styles(beer_id);
create index beer_links_idx on beer_links(beer_id);
create index styles_categories_idx on styles_categories(style_id);

-- SEEDS --

alter table beers add column seed int;
alter table recipes add column seed int;
alter table wines add column seed int;

update beers b1 set (seed) = (select id%104 from beers b2 where b1.id = b2.id);
update wines b1 set (seed) = (select id%1288 from wines b2 where b1.id = b2.id);
update recipes b1 set (seed) = (select id%1769 from recipes b2 where b1.id = b2.id);

create index beer_seed_idx on beers(seed);
create index wine_seed_idx on wines(seed);
create index recipe_seed_idx on recipes(seed);
