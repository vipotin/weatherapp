FROM node:14-alpine

RUN mkdir -p /app/server
WORKDIR /app/server

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]