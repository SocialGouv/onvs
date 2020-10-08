FROM node:14.9.0-alpine3.12

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile --prefer-offline --cache-folder /dev/shm/yarn

COPY next.config.js knexfile.js  ./
COPY scripts/ ./scripts/
COPY src/lib/ ./src/lib/
COPY src/knex/ ./src/knex/
COPY .next/ ./.next
COPY public/ ./

USER node

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]
