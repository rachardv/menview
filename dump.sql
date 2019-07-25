COPY restaurants(name, description, address, lat, lon, rating)
FROM '/data/restaurants.csv' DELIMITER ',';

COPY dishes(dish_id, dish_name, dish_description, dish_rating, restaurant_name)
FROM '/data/dishes.csv' DELIMITER ',';