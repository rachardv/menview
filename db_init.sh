#!/bin/bash

docker cp data menview_db_1:data
docker exec -it menview_db_1 chmod +x data
docker cp dump.sql menview_db_1:dump.sql
docker exec -it menview_db_1 psql -U admin -W menviewdb -f dump.sql
