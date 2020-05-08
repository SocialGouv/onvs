# Do the npm install or yarn install in the full image
FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build && yarn --production --frozen-lockfile

# And then copy over node_modules, etc from that stage to the smaller base image
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/scripts/server.js ./scripts/server.js
COPY --from=builder /app/src/lib/sentry.js ./src/lib/sentry.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

# Build-time variables for the frontend
ARG SENTRY_DSN
ENV SENTRY_DSN=$SENTRY_DSN

ARG SENTRY_TOKEN
ENV SENTRY_TOKEN=$SENTRY_TOKEN

ARG MATOMO_URL
ENV MATOMO_URL=$MATOMO_URL

ARG MATOMO_SITE_ID
ENV MATOMO_SITE_ID=$MATOMO_SITE_ID

ARG POSTGRES_HOST
ENV POSTGRES_HOST=$POSTGRES_HOST

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

ARG TEST_CURRENT_DATE
ENV TEST_CURRENT_DATE=$TEST_CURRENT_DATE

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

USER node

CMD ["yarn", "start"]
