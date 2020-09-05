FROM node:14

WORKDIR /usr/src/api

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
