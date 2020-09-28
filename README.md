# ONVS

ONVS is the Observatoire National des Violences en Santé, a web app to declare any violence for medical people in France.

### 👔 Install

First, install git, yarn, docker, docker-compose with brew on Mac OS.

Then, run the containers with docker-compose.

docker-compose up --build -d

Then, the DB is exposed on port 5435 and the app is accessible on port 80.

### Env vars

⚠ You need to set client-side browser `process.env` variables **at build time**.

| Var            | desc                       | build time | run time |
| -------------- | -------------------------- | :--------: | :------: |
| PORT           | port to run the server on  |            |    ✅    |
| SENTRY_DSN     | DSN of your sentry project |     ✅     |
| SENTRY_TOKEN   | token to allow sourcemaps  |     ✅     |
| MATOMO_URL     | URL to your piwik instance |     ✅     |
| MATOMO_SITE_ID | site id on piwik instance  |     ✅     |
| DATABASE_URL   | URL of Postgres DB         |     ✅     |
| API_URL        | URL of the API             |     ✅     |

NB: the API is also provided by this app. So, API_URL must be the same domain name that the app itself.
For example, the stage environement is https://onvs-dev.fabrique.social.gouv.fr/ for the frontend. So use `https://onvs-dev.fabrique.social.gouv.fr/api` as the `API_URL`.

The easiest solution is to populate the `.env` file at root of the project. See `.env.sample` for example of this.

Directly with Docker, you can use:

```
docker build \
  --build-arg SENTRY_DSN="https://[hash]@url.sentry.com/42" \
  --build-arg SENTRY_TOKEN="1234" \
  --build-arg MATOMO_URL="https://url.matomo.com" \
  --build-arg MATOMO_SITE_ID=42 \
  . -t onvs-app
```

### Build the project

```sh
yarn build # to build a .next directory with the full app
docker-compose up --build -d

# or just run the app with
docker-compose up --build -d app
```

You can use the db container inside the docker-compose.yml.
In this case, the DATABASE_URL looks like `postgres://onvs:the-passowrd@db:5432/onvs`

Then start the project with `yarn start`.

The app is avaialable on port 80.

### Develop

You can profit of the hot reload for development time, thanks to Next, with the command:

`yarn dev`

### Troubleshoot

How to see the logs ?

```sh
docker-compose logs -f
# or just for app container
docker-compose logs -f app
```
