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
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001 \
  && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
