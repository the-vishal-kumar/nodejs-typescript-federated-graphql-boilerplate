# nodejs-typescript-rest-boilerplate

## Problem Statement

-   Create an app that fetches charging stations from [Open Charge Map API] and then persists them in [MongoDB].
    -   Following fields are to be imported from [Open Charge Map API]\:
        -   operatorInfo
        -   statusType
        -   addressInfo
        -   connections
-   It shall update the database only in case of changes in the polled data.
-   Provide a [GraphQL] endpoint which can be queried to pull all imported charging stations. Use [Federated GraphQL] Gateway and SubGraphs.
-   It should be possible to paginate through the list in GraphQL using [relay-style pagination].
-   It should be possible to run the whole service and the import locally using a single command.
-   No [NodeJs] frameworks shall be used. e.g NestJS, etc.

## Solution

-   There is one entity - Socket. It represents charging stations in our database.
-   There are two graphql queries - Socket and Sockets.

    [Read more...](./SOLUTION.md)

## Actions to implement

1.  **Create an [NodeJs] application using [Federated GraphQL]\:**
2.  **Dockerize the application**

    -   Create multiple Dockerfile(s) for each service, such as Gateway, Subgraph, etc.
    -   Create a docker-compose.yml as entry point of application.

3.  **Implement the polling service to fetch data of smaller areas:**

    -   Fetch data of smaller areas because the API is unpaginated.
    -   This service shall start populating the mongo database as soon as the application is started.

4.  **Implement a cron job for the polling service to run once everyday:**

    -   This cron job shall run the polling service once every day to fetch new charging stations and update the existing ones.

5.  **Create a query to fetch a particular charging station:**

    -   Fetch a charging station by its ID.

6.  **Create a query to fetch relay-style paginated charging stations:**

7.  **Write unit tests and end-to-end tests:**

[nodejs]: https://nodejs.org/en
[open charge map api]: (https://openchargemap.org/site/develop/api#/operations/get-poi)
[graphql]: https://graphql.org/
[federated graphql]: https://www.apollographql.com/docs/federation/
[relay-style pagination]: https://www.apollographql.com/docs/technotes/TN0029-relay-style-connections/
[mongodb]: https://www.mongodb.com/