FROM node:15-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile --prefer-offline

COPY next.config.js knexfile.js  ./
COPY scripts/ ./scripts/
COPY src/lib/ ./src/lib/
COPY src/knex/ ./src/knex/
COPY .next/ ./.next
COPY public/ ./public/
COPY prisma/ ./prisma/

RUN npx prisma generate

USER node

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]
