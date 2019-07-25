COPY restaurants(name, description, address, lat, lon)
FROM '/data/restaurants.tsv' DELIMITER E'\t' CSV HEADER;

COPY dishes(dish_id, dish_name, dish_description, dish_rating, restaurant_name)
FROM '/data/dishes.tsv' DELIMITER E'\t' CSV HEADER;