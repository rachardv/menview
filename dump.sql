COPY restaurants(name, description, address, lat, long)
FROM './data/restaurants.csv' DELIMITER ',' CSV HEADER;

COPY dishes(dish_id, dish_name, dish_description, dish_rating, restaurant_name)
FROM './data/dishess.csv' DELIMITER ',' CSV HEADER;