## Deploy with Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/pronvd7/linkin)



## Getting started

- Deploy in Vercel
  - set environment variables
    - `DATABASE_URL` - **Postgres** database url
    - `HASHSALT` - random secret key
    - `NODE_ENV` - set NODE_ENV to `production`
  - after successfully deploying visit `youdomain/admin` to view admin login
  - use default login credentials
    - username = `admin`
    - password = `linkin123`
  - after a successfull login you will be able to see above admin dashboard.

<br>
<br>

- Deploy in Heroku
  - set environment variables
    - `DATABASE_URL` - **Postgres** database url
    - `HASHSALT` - random secret key
  - after successfully deploying visit `youdomain/admin` to view admin login
  - use default login credentials
    - username = `admin`
    - password = `linkin123`
  - after a successfull login you will be able to see above admin dashboard.
    <br>

<br>
<br>

- Deploy in Railway
  - set environment variables
    - `HASHSALT` - random secret key
    - `PORT` - 3000
    - `RAILWAY` - Set to `1` to run migrations and seeding in docker build stage . set `0` to avoid migrations and seeding in docker build stage
    - `DATABASE_URL` - **Postgres** database url . use this variable **if you are not using** railway postgres plugin
  - after successfully deploying visit `youdomain/admin` to view admin login
  - use default login credentials
    - username = `admin`
    - password = `linkin123`
  - after a successfull login you will be able to see above admin dashboard.
    <br>

## Running with docker

- build the docker image using `docker build . -t linkin` command
- Run the docker image `docker run -d -p 3000:3000 -e DATABASE_URL='postgres://linkin:123@localhost:5432/linkin' -e HASHSALT='123' linkin`. make sure you specified `DATABASE_URL` and `HASHSALT` environment varaibles.

### Database connection

- if the postgres database is behind pgbounce use `pgbouncer=true` parameter in `DATABASE_URL` ex - `postgres://xx:xxx@xxxx:5432/xxxx?pgbouncer=true`

## Developing locally

#### Requirements

- Node.js 14.x or newer
- Postgresql

#### Clone and install dependencies

```bash
git clone https://github.com/pronvd7/linkin.git
cd linkin
npm i
```

<!-- Setup local environmrnt variables in [config.js](configs/config.js) -->

Setup local environmrnt variables in `.env`

example `.env` file

```
DATABASE_URL=postgres://linkin:123@localhost:5432/linkin
HASHSALT=123
```

#### Database migration

create database relations with prisma migration

**you must have Postgres database setup locally**

```bash
npx prisma migrate dev
```

#### Database Seeding

Addign Initial data to the database to get you started

```bash
npm run seed
```

#### Run

```
npm run dev
```

### Build with

- [Next.Js](https://nextjs.org/) .
- [Postgres](https://www.postgresql.org/) .
- [Prisma](https://www.prisma.io/) .

### Currently supported hosting in

- [Vercel](https://vercel.com/) .
- [Heroku](https://heroku.com/) .
- [railway](https://railway.app/) .


