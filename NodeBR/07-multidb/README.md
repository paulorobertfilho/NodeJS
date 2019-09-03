docker run \
  --name postgres \
  -e POSTGRES_USER=paulo.roberto \
  -e POSTGRES_PASSWORD=batsheet32 \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker ps
decker exec -it postgres /bin/bash

docker run \
  --name adminer \
  -p 8081:8081 \
  --link postgres:postgres \
  -d \
  adminer
