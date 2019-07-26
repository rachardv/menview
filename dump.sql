COPY restaurants(name, description, address, lat, lon, rating)
FROM '/data/restaurants.csv' DELIMITER ',' CSV;

COPY dishes(dish_id, dish_name, dish_description, dish_rating, restaurant_name, dish_price)
FROM '/data/dishes.csv' DELIMITER ',' CSV;