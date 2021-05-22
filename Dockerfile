FROM node:14.17.0-alpine3.13

WORKDIR /app

COPY /app/package*.json ./

RUN npm ci

COPY /app/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
