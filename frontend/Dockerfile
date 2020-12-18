FROM node:14-alpine

RUN mkdir -p /app/client
WORKDIR /app/client

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
