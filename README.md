# nodejs-typescript-federated-graphql-boilerplate

A [NodeJs] / [TypeScript] application boilerplate with Federated 2 [GraphQL].

-   It contains a mechanism to pull all the data from an unpaginated [Open Charge Map API].
-   The data is persisted in a [MongoDB].
-   The data is then queryable through [GraphQL] in [relay-style pagination].
-   It can be run with [Docker] containerization software.
-   It has some end-to-end and unit tests written using [Jest].
-   It uses [ESLint], [Prettier], [CommitLint], [Husky] for maintaining code quality.
-   It uses [New Relic] for error logging, application performance monitoring, log monitoring.

## Problem Statement

-   Create an app that fetches charging stations from [Open Charge Map API] and then persists them in [MongoDB].
    -   Following fields are to be imported from [Open Charge Map API]\:
        -   operatorInfo
        -   statusType
        -   addressInfo
        -   connections
-   It shall update the database only in case of changes in the polled data.

    [Read more...](./PROBLEM.md)

## Solution

-   There is one entity - Socket. It represents charging stations in our database.
-   There are two graphql queries - Socket and Sockets.

    [Read more...](./SOLUTION.md)

## Initial setup

1.  Clone from Github
    ```bash
    git clone https://github.com/the-vishal-kumar/nodejs-typescript-federated-graphql-boilerplate.git
    ```
2.  Setup Docker and Docker Compose

    -   Install `docker` and `docker-compose` on your machine
    -   Copy `docker-compose.sample.yml` as `docker-compose.yml`

3.  Install dependencies using npm

    ```bash
    cd nodejs-typescript-federated-graphql-boilerplate
    npm i
    ```

4.  Set environment variables

    -   Copy `.env.sample` to root directory as `.env`
        -   Put the value of `OPEN_CHARGE_MAP_API_KEY`.
            -   Leaving it empty won't prevent the application from starting/running, the polling won't work.
        -   (Optional) Put the value of `NEW_RELIC_LICENSE_KEY`. Generate key from [here](https://docs.newrelic.com/docs/apm/agents/nodejs-agent/getting-started/introduction-new-relic-nodejs/)

## Development

1.  Execute the command to start the application
    ```bash
    npm start
    ```

## Testing

1.  Some end-to-end and unit tests are included in `src/test` directory for socket subgraph
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

-   Language - [NodeJs] \| [TypeScript]
-   [GraphQL] \| [Federated GraphQL]
-   [MongoDB]
-   Containerization Software - [Docker]
-   Version Control - [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Code Quality

-   [ESLint]
-   [Prettier]
-   [CommitLint]

## Code Review

-   A feature branch is created from *dev* branch, and after completion of code, a PR is generated to *dev* branch
-   If changes are requested by a reviewer on Github, then the person who has made the PR makes appropriate changes. The reviewer reviews again and marks the comments as resolved
-   If there are no new changes required, then PR is merged with *dev* branch

## Managing Credentials

-   Credentials live in `.env` file

## Git Workflow

-   A branch is created for each ticket from *dev* branch
-   Example of Branch Name:
    -   feature/{ticket_number}
    -   bugfix/{ticket_number}
    -   hotfix/{ticket_number}
    -   dev
    -   staging
    -   master
-   Read next section for more information

## Error Logging

-   [New Relic]

## Application Performance Monitoring

-   [New Relic]

## Log Monitoring

-   [New Relic]

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
    -   The Open Charge Map API provides access to the worlds largest registry of charging locations as Open Data.
-   [Countries of the World]
    -   The solution involves conceptualizing each country as a small rectangle, encompassing all of its borders, and representing each corner of the rectangle with coordinates.
    -   The data for edge coordinates was obtained from [here](https://gis.stackexchange.com/a/260612/225830) where I reached through this [stack exchange answer](https://gis.stackexchange.com/a/260612/225830).

## License

-   AGPL-3.0-or-later

## Meet The Maker

[Vishal Kumar] - Software Engineer 👨‍💻 and an Aspiring Entrepreneur👨‍💼

[vishal kumar]: https://www.linkedin.com/in/the-vishal-kumar/

[nodejs]: https://nodejs.org/en
[typescript]: https://www.typescriptlang.org/
[graphql]: https://graphql.org/
[federated graphql]: https://www.apollographql.com/docs/federation/
[relay-style pagination]: https://www.apollographql.com/docs/technotes/TN0029-relay-style-connections/
[mongodb]: https://www.mongodb.com/
[docker]: https://www.docker.com/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[commitlint]: https://commitlint.js.org/
[husky]: https://typicode.github.io/husky/
[jest]: https://jestjs.io/
[heroku]: https://www.heroku.com/
[new relic]: https://newrelic.com
[postman]: https://postman.com/
[git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[open charge map api]: (https://openchargemap.org/site/develop/api#/operations/get-poi)
[countries of the world]: https://web.archive.org/web/20150319012353/http://opengeocode.org/cude/download.php?file=/home/fashions/public_html/opengeocode.org/download/cow.txt