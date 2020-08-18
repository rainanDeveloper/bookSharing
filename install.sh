#!/bin/bash

cd ./frontend

touch ./src/services/config.json

echo '{"backendUrl":"http://localhost:3333"}' > ./src/services/config.json

npm install

npm run build

cd ../backend/

npm install

mkdir ./config/

touch ./config/config.json

node generateConfig.js > ./config/config.json

npm sequelize-cli db:create

npm sequelize-cli db:migrate