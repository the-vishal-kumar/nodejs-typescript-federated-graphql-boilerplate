# nodejs-typescript-federated-graphql-boilerplate

A [NodeJs] / [TypeScript] application boilerplate with Federated 2 [GraphQL].

-   It contains a mechanism to pull all the data from an unpaginated [Open Charge Map API].
-   It uses [MongoDB] as a persistent database layer with [Mongoose] as an ODM.
-   The data is then queryable through [GraphQL] in [relay-style pagination].
-   It can be run with [Docker] and [Docker-Compose] containerization software.
-   It has some end-to-end and unit tests written using [Jest].
-   It uses [ESLint], [Prettier], [CommitLint], and [Husky] for maintaining code quality.
-   It uses [Winston] for logging.
-   It uses [New Relic] for error logging, application performance monitoring, and log monitoring.

## Problem Statement

-   Create an application that pulls current charging station data from [Open Charge Map API] and then persists the data in [MongoDB].
    -   The following fields are to be imported from [Open Charge Map API]:
        -   operatorInfo
        -   statusType
        -   addressInfo
        -   connections
-   The service pulls the data and updates our own database. It shall update the database only in case of changes in the pulled data.

    [Read more...](./PROBLEM.md)

## Solution

-   There is one entity - Socket. It represents charging stations in our database.
-   There are two graphql queries - Socket and Sockets.

    [Read more...](./SOLUTION.md)

## Initial setup

1.  Clone from GitHub

    ```bash
    git clone https://github.com/the-vishal-kumar/nodejs-typescript-federated-graphql-boilerplate.git
    ```

1.  Setup [Docker] and [Docker-Compose]

    -   Install `docker` and `docker-compose` on your machine
    -   Copy `docker-compose.sample.yml` as `docker-compose.yml`

1.  Install dependencies using npm

    ```bash
    cd nodejs-typescript-federated-graphql-boilerplate
    npm i
    ```

1.  Set environment variables

    -   Copy `.env.sample` to the root directory as `.env`.

        -   Put the value of `OPEN_CHARGE_MAP_API_KEY`.

            -   Leaving it empty won't prevent the application from starting/running, but the polling won't work.
            -   The application will be able to serve queries from already polled data (which will be empty if the application is started without a key).

        -   (Optional) Put the value of `NEW_RELIC_LICENSE_KEY`. Generate a key from [here](https://docs.newrelic.com/docs/apm/agents/nodejs-agent/getting-started/introduction-new-relic-nodejs/).

## Development

1.  Execute the command from the root directory to start the application

    ```bash
    npm start
    ```

## Testing

1.  Some end-to-end and unit tests are included in `src/test` directory for the socket subgraph
2.  Tests are run using [Jest]
3.  Execute the command from the root directory to run the tests

    ```bash
    npm test
    ```

## API Documentation

1.  Import Postman collection and environment variable
    -   Import Collection from [here](https://www.postman.com/descent-module-operator-65787222/workspace/public/collection/649289bd3516b12300f37753).
    -   Import Environment Variables from [here](https://www.postman.com/descent-module-operator-65787222/workspace/public/environment/15813424-cdf6a24c-f88e-4315-87ae-665d692a46ce).

## Technology

-   Language - [NodeJs] | [TypeScript]
-   [GraphQL] | [Federated GraphQL]
-   [MongoDB]
-   Containerization Software - [Docker] | [Docker-Compose]
-   Version Control - [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Code Quality

-   [ESLint]
-   [Prettier]
-   [CommitLint]

## Code Review

-   A feature branch is created from the *dev* branch, and after completion of the code, a PR is generated for the _dev_ branch
-   If changes are requested by a reviewer on Github, then the person who has made the PR makes appropriate changes. The reviewer reviews again and marks the comments as resolved
-   If there are no new changes required, then PR is merged with the *dev* branch

## Managing Credentials

-   Credentials live in the `.env` file

## Git Workflow

-   A branch is created for each ticket from the *dev* branch

-   Example of Branch Name:

    -   feature/{ticket_number}
    -   bugfix/{ticket_number}
    -   hotfix/{ticket_number}
    -   dev
    -   staging
    -   master

-   Read the next section for more information

<!--
## CI and Deployment

- Auto deployment is triggered on Heroku CI itself when code is pushed to respective branches. If all the test cases (feature, unit, postman, http, console etc.) don't pass, then the build won't be deployed
- On pushing the code to the `dev` branch, test cases will run. On passing all the tests, the build
  will deploy on the `Development` environment
- On pushing the code to the `staging` branch, test cases will run. On passing all the tests, the build will deploy on the `Staging` environment
- On pushing the code to the `master` branch, test cases will run. On passing all the tests, the build will deploy on the `Production` environment
-->

## Error Logging

-   [New Relic]

## Application Performance Monitoring

-   [New Relic]

## Log Monitoring

-   [New Relic]

<!---
## Backups

- Database backups are made every 24 hours at 2100 hours UTC time by Heroku for Staging and Production environment
-->

## Folder Structure

        📦nodejs-typescript-federated-graphql-boilerplate
        ┣ 📂.husky
        ┃ ┣ 📂_
        ┃ ┃ ┣ 📜.gitignore
        ┃ ┃ ┗ 📜husky.sh
        ┃ ┣ 📜commit-msg
        ┃ ┣ 📜pre-commit
        ┃ ┗ 📜pre-push
        ┣ 📂src
        ┃ ┣ 📂database-test
        ┃ ┃ ┣ 📜Dockerfile
        ┃ ┃ ┗ 📜sockets.seed.data
        ┃ ┣ 📂gateway
        ┃ ┃ ┣ 📂src
        ┃ ┃ ┃ ┣ 📂test
        ┃ ┃ ┃ ┃ ┗ 📂unit
        ┃ ┃ ┃ ┃ ┃ ┗ 📂util
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜logger.unit.test.ts
        ┃ ┃ ┃ ┣ 📂util
        ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┗ 📜logger.ts
        ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┣ 📜.nvmrc
        ┃ ┃ ┣ 📜Dockerfile
        ┃ ┃ ┣ 📜newrelic.js
        ┃ ┃ ┣ 📜package.json
        ┃ ┃ ┗ 📜tsconfig.json
        ┃ ┗ 📂subgraphs
        ┃ ┃ ┗ 📂socket
        ┃ ┃ ┃ ┣ 📂src
        ┃ ┃ ┃ ┃ ┣ 📂app
        ┃ ┃ ┃ ┃ ┃ ┣ 📂mongo-server
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┣ 📂node-server
        ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜schema.graphql
        ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┃ ┣ 📂config
        ┃ ┃ ┃ ┃ ┃ ┣ 📜countries.json
        ┃ ┃ ┃ ┃ ┃ ┣ 📜cow.txt
        ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┗ 📜mongo-config.ts
        ┃ ┃ ┃ ┃ ┣ 📂cron
        ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┗ 📜pullSocket.ts
        ┃ ┃ ┃ ┃ ┣ 📂middleware
        ┃ ┃ ┃ ┃ ┣ 📂model
        ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┗ 📜socket.ts
        ┃ ┃ ┃ ┃ ┣ 📂resolver
        ┃ ┃ ┃ ┃ ┃ ┣ 📂query
        ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜socket.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜sockets.ts
        ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┃ ┣ 📂test
        ┃ ┃ ┃ ┃ ┃ ┣ 📂e2e
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂resolver
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂query
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜socket.e2e.test.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜sockets.e2e.test.ts
        ┃ ┃ ┃ ┃ ┃ ┗ 📂unit
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂util
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜array.unit.test.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜enum.unit.test.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜generateCountriesJson.unit.test.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜generateSubBoundingBoxesOfCountry.unit.test.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜logger.unit.test.ts
        ┃ ┃ ┃ ┃ ┣ 📂type
        ┃ ┃ ┃ ┃ ┃ ┣ 📂config
        ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜country.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┣ 📂model
        ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜socket.ts
        ┃ ┃ ┃ ┃ ┃ ┣ 📂resolver
        ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂query
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜sockets.ts
        ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┃ ┣ 📂util
        ┃ ┃ ┃ ┃ ┃ ┣ 📜array.ts
        ┃ ┃ ┃ ┃ ┃ ┣ 📜enum.ts
        ┃ ┃ ┃ ┃ ┃ ┣ 📜generateCountriesJson.ts
        ┃ ┃ ┃ ┃ ┃ ┣ 📜generateSubBoundingBoxesOfCountry.ts
        ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
        ┃ ┃ ┃ ┃ ┃ ┗ 📜logger.ts
        ┃ ┃ ┃ ┃ ┗ 📜index.ts
        ┃ ┃ ┃ ┣ 📜.nvmrc
        ┃ ┃ ┃ ┣ 📜Dockerfile
        ┃ ┃ ┃ ┣ 📜newrelic.js
        ┃ ┃ ┃ ┣ 📜package.json
        ┃ ┃ ┃ ┗ 📜tsconfig.json
        ┣ 📜.commitlintrc.json
        ┣ 📜.dockerignore
        ┣ 📜.env
        ┣ 📜.env.sample
        ┣ 📜.env.test
        ┣ 📜.eslintrc.json
        ┣ 📜.gitignore
        ┣ 📜.nvmrc
        ┣ 📜.prettierrc.json
        ┣ 📜LICENSE
        ┣ 📜PROBLEM.md
        ┣ 📜README.md
        ┣ 📜SOLUTION.md
        ┣ 📜docker-compose.sample.yml
        ┣ 📜docker-compose.test.yml
        ┣ 📜docker-compose.yml
        ┣ 📜jest.config.js
        ┣ 📜package-lock.json
        ┣ 📜package.json
        ┗ 📜tsconfig.json

## External Services/API Reference

-   [Open Charge Map API]

    -   The Open Charge Map API provides access to the world's largest registry of charging locations as Open Data.

-   [Countries of the World]

    -   The solution involves conceptualizing each country as a small rectangle, encompassing all of its borders, and representing each corner of the rectangle with coordinates.

    -   The data for edge coordinates was obtained from [here](https://gis.stackexchange.com/a/260612/225830) where I reached through this [stack exchange answer](https://gis.stackexchange.com/a/260612/225830).

## License

-   AGPL-3.0-or-later

## Meet The Maker

[Vishal Kumar] - Software Engineer 👨‍💻 and an Aspiring Entrepreneur👨‍💼

[vishal kumar]: https://www.linkedin.com/in/the-vishal-kumar/

[NodeJs]: https://nodejs.org/en
[TypeScript]: https://www.typescriptlang.org/
[Graphql]: https://graphql.org/
[Federated Graphql]: https://www.apollographql.com/docs/federation/
[relay-style pagination]: https://www.apollographql.com/docs/technotes/TN0029-relay-style-connections/
[MongoDB]: https://mongodb.com/
[Mongoose]: https://mongoosejs.com/
[Docker]: https://www.docker.com/
[Docker-Compose]: https://docs.docker.com/compose/
[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[CommitLint]: https://commitlint.js.org/
[Husky]: https://typicode.github.io/husky/
[Jest]: https://jestjs.io/
[Heroku]: https://www.heroku.com/
[Winston]: https://github.com/winstonjs/winston
[New Relic]: https://newrelic.com
[Postman]: https://postman.com/
[Git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[Open Charge Map API]: https://openchargemap.org/site/develop/api#/operations/get-poi
[Countries of the World]: https://web.archive.org/web/20150319012353/http://opengeocode.org/cude/download.php?file=/home/fashions/public_html/opengeocode.org/download/cow.txt