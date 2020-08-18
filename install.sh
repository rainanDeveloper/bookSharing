#!/bin/bash

cd ./frontend

touch ./src/services/config.json

echo '{"backendUrl":"http://localhost:3333"}' > ./src/services/config.json

npm install

yarn build

cd ../backend/

npm install

mkdir ./config/

touch ./config/config.json

node generateConfig.js > ./config/config.json

yarn sequelize-cli db:create

yarn sequelize-cli db:migrate