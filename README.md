# Questionnaire Editor - Backend

<p align="center">
  <img src="https://user-images.githubusercontent.com/31348348/168585463-64802615-b4f3-47f2-b858-4757566d3bef.png" width="600" alt="Questionnaire Editor Logo" />
</p>

➡ Link to the Frontend repository: **[Questionnaire Editor - Frontend](https://github.com/alieldinayman/questionnaire-editor-frontend)**

## Summary

A NestJS application responsible for serving the RESTful API consumed by the Frontend linked above through a MongoDB database.

## Tech Stack

-   [NestJS](https://nestjs.com/) - A [NodeJS](https://nodejs.org/en/) Framework
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose ODM](https://mongoosejs.com/)
-   [Jest](https://jestjs.io/)
-   [Docker](https://www.docker.com/)

## Running the Backend

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Unit Tests and Code Coverage

```bash
# unit tests
pnpm run test

# test coverage
pnpm run test:cov
```

## Dockerizing

```bash
# building the backend image
docker build -t questionnaire-editor-backend .

# starting docker-compose with the MongoDB image
docker-compose up -d questionnaire-editor-backend
```

## Design Decisions and Better Alternatives

Please read the [Design Decisions and Better Alternatives](https://github.com/alieldinayman/questionnaire-editor-frontend/blob/main/README.md#design-decisions-and-better-alternatives) section in the Frontend repository.
