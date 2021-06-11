FROM node:15-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --prefer-offline

COPY . ./

# May be not mandatory, since yarn install is supposed to run prisma generate initially
RUN yarn prisma generate

RUN yarn build

# TODO: There is a bug if we pass by a multi staged build. Some dev dependancies should be moved in dependancies. For now, let's use all deps.
#RUN yarn install --production

USER node

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]
