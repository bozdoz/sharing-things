FROM node:14.17.0-alpine3.13

WORKDIR /app

COPY /app/package*.json ./

RUN npm ci

COPY /app/ .

# `npm run build` needs this environment variable
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

RUN npm run build

# add user so we don't run as root
RUN chown -R node:node /app

USER node

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
