#!bin/bash

cd ./frontend

npm install

npm run build

cd ../backend/

npm install

touch ./config/config.json

node generateConfig.js > ./config/config.json

npm sequelize-cli db:create

npm sequelize-cli db:migrate