# Do the npm install or yarn install in the full image
FROM node:12-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build && yarn --production --frozen-lockfile

# And then copy over node_modules, etc from that stage to the smaller base image
FROM node:12-alpine

WORKDIR /app

COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/.env ./.env
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/knexfile.js ./knexfile.js
COPY --from=builder /app/scripts/server.js ./scripts/server.js
COPY --from=builder /app/src/lib/sentry.js ./src/lib/sentry.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# env vars are handled by the .env file at the root and with .dotenv in the code

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

USER node

CMD ["yarn", "start"]
