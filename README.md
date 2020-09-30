# README

# ONVS

ONVS is the `Observatoire National des Violences en Santé`, a web app to declare any violence for medical people in France.

### 🧡 Architecture

The product is composed of :

- a Next.js app, responsible of both the frontend and the API
- a db container which uses a Postgresql Docker image

This architecture is described in docker configuration files.

### 👔 Install

First, install git, yarn, docker, docker-compose (you can use brew if you are on Mac OS).

Then, run the containers with docker-compose.

```
docker-compose up --build -d
```

This will build and run the db container and the app container.

Then, on the host machine, the db is exposed on port 5435 and the app is accessible on port 80.

### 🎛️ Env vars

You need to set `process.env` variables.

[Untitled](https://www.notion.so/a05e88b680f24095aa6b4336d32a06ab)

The easiest solution to set the variables, is to populate the `.env` file at root of the project. See the `.env.sample`file for example of this.

The API is also provided by this app. So, API_URL must be the same domain name that the app itself. For example, the frontend stage environment is `https://onvs-dev.fabrique.social.gouv.fr`. So use `https://onvs-dev.fabrique.social.gouv.fr/api` as the `API_URL`.

### 👩‍🍳 Local development

The developers can benefit of the hot reload provided by Next.js. for an improved DX.

In this case, just configure a db URL in your `.env` file, then

```
yarn install
yarn dev
```

You can use the db container inside the docker-compose.yml. In this case, the DATABASE_URL looks like `DATABASE_URL=psql://onvs:password@localhost:5435/onvs`.

One step further, if you want to getting close to the production build, you can use

```jsx
yarn install
yarn build
yarn start
```

Then, go to the app at [http://localhost:3030/](http://localhost:3030/).

### 🏋️‍♂️ Run the tests

There is some Jest tests, which can be run with :

```jsx
yarn run test
```

### 🧯 Troubleshoot

_How can I see the logs ?_

```
# To see the logs for the both containers
docker-compose logs -f

# To see only the app container
docker-compose logs -f app
```
