# Amigo messages



## Install

```
git clone git@github.com:tomsutton1984/amigo.git amigo && cd $_
npm install

```


## Build

```
docker-compose up --build -d

```

## Migrate and Seed Database

```
docker-compose run --rm web knex migrate:latest --env development --knexfile knexfile.js
docker-compose run --rm web knex seed:run --env development --knexfile knexfile.js

```


## Test

```
docker-compose -f docker-compose-test.yml run --rm web npm test

```


## TODO

- [ ] Refactor Docker
- [ ] Security
- [ ] Logging
- [ ] Deployment guide
- [ ] Documentation


### Reading list
- https://diogomonica.com/2017/03/27/why-you-shouldnt-use-env-variables-for-secret-data/
- https://www.sumologic.com/blog/security/securing-docker-containers/