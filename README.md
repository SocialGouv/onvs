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

```shell script
docker-compose up --build -d
```

This will build and run the db container and the app container.

Note : the `-d` will run this container in daemon mode. That is to say the containers will be re run at every start of your computer.
It may be convenient to set this daemon mode only for the db container. In this case, do `docker-compose up --build -d db`.

Then, on the host machine, the db is exposed on port 5435 and the app is accessible on port 80.

### 🎛️ Environment vars

You need to set `process.env` variables.

- PORT port to run the server on
- DATABASE_URL URL of Postgres DB
- POSTGRES_SSL true if the database uses a db URL with https
- SENTRY_DSN DSN of your sentry project
- SENTRY_TOKEN token to allow sourcemaps
- MATOMO_URL URL to your piwik instance
- MATOMO_SITE_ID site id on piwik instance
- MAIL_HOST Mailing server config
- MAIL_PORT
- MAIL_USERNAME
- MAIL_PASSWORD
- MAIL_USE_TLS defaults to true
- MAIL_FROM email sender
- MAIL_TO email recipients as a comma separated string
- MAIL_WEBHOOK_TOKEN token used to authenticate the cron for the email webhook
- NEXT_PUBLIC_ONVS_API_TOKEN  an authorized token in tokens table to be able to use POST API declaration (like an editor)

The easiest solution to set the variables, is to populate the `.env` file at root of the project. See the `.env.sample` for a file example of this.

The product provide also an API on top of the frontend. You can deduce the URL of the API after the name of the app.
For example, if the frontend stage environment is `https://onvs-dev.fabrique.social.gouv.fr`, the api part is `https://onvs-dev.fabrique.social.gouv.fr/api`.

### 👩‍🍳 Local development

The `docker-compose` has a db container which runs a Postgres instance.

To run this db container (and not the app): `docker-compose up --build -d db`

Next, the first time, you need to build a database.

1.  Connect to postgres instance

```shell
psql postgres://user:password@localhost:5435
```

2.  Create the new user onvs

```sql
create user onvs with encrypted password 'hmpHQCK7qG6^Lk5M'; # change the password with whatever you want
```

3.  Create the database onvs

```sql
create database onvs with owner onvs encoding 'UTF8';
```

Now you have a database and a user to administer it.

4.  Add in `.env` the variable DATABASE_URL with the correponding connection string

```.env
DATABASE_URL=psql://onvs:hmpHQCK7qG6^Lk5M@localhost:5435/onvs
```

5.  Now build the tables of the onvs db

```shell
yarn migrate:latest
```

6.  And a minimal set of data

```shell
yarn seed:run:dev
```

7. Install the JS libs and run the Next app in dev mode

```shell script
yarn install
yarn dev
```

Then, go to the app at [http://localhost:3030/](http://localhost:3030/).

In this mode, you will have the best DX with fast refresh. On the other hand, if you want to test a final build, like it will be on the CI/CD/production environment, do :

```shell script
yarn install
yarn build
yarn start
```

### Prisma

Historically, Knex was used to interact with the db. But the preferred way is now to request the db with Prisma.
Nevertheless, Knex is still used for migrations because of it is handy for transforming data in JS with it.

As soon as there is an update of the db, the workflow is :
- `npx prisma introspect` to introspect the database defined in DATABASE_URL and to create/update the `schema.prisma` file. This file is the keystone to interact with Prisma. We can modify this file after its generatio for our needs. For example, we can rename a column name or a table name.
- `npx prisma generate` to generate the types which are stored in `node_modules/.prisma/client`. Each time you modify the `schema.prisma`, you need to regenerate the client.

As a handy shortcut, a script `yarn prisma:refresh` runs `migrate:latest` + `prisma introspect` + `prisma generate`. 
To be used as soon as you modify the structure of the db. 

### Tokens

The API to make a declaration is accessible for third party app (editors of hospitals apps).

To restrict access to them only and to track who's using the API, this API endpoint must be called with a token in the `Authorization header`.

The valid tokens are stored in the `tokens` table.
See the [wiki](https://github.com/SocialGouv/onvs/wiki) for more details on this.

### 🏋️‍♂️ Run the tests

There is some Jest tests, which can be run with :

```shell script
yarn run test
```

Since the project is now in TypeScript, a handy script is `yarn check-all`. It runs in sequence yarn lint + yarn tsc + yarn test.

### 🤐 Secrets

The sealed-secrets.yaml files can be generated from the script `sealed-secrets`.

```shell
yarn sealed-secrets
```

You need to have a `.secrets.yml` file (which will be gitignored) a the project root, including the secrets uncrypted.

Run the script : `yarn run seal-secrets`.

The files will be generated in a temporary directory `.temp-secrets/environments`.

Then, copy the content in the `.k8s/environments` directory.

Then, update the Jest snapshots for Kosko.

```
yarn k8s # Not absolutely necessary in every case but safer to run it each time anyway.
yarn k8s test -u # This command updates the snapshots tests for Kosko.
```

### 🧯 Troubleshoot

In k8s environments, go to Rancher, select the pod and clic on View logs.

### 📧 Debuging emails

NB : At time, a mail was send every week with new declarations to some people. This job is disabled now, given that there is a dashboard with more data.

But in case of wanting to use this job, there is a fake SMTP server setup in docker-compose file. 

It can be accessed at http://localhost:37408/.

