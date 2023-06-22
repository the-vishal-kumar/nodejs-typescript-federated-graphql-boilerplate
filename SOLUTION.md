# nodejs-typescript-federated-graphql-boilerplate

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

1.  Description

    -   There is one entity - Socket. It represents charging stations in our database.
    -   There are two graphql queries - Socket and Sockets.
    -   Socket query
        -   Fetch a particular socket using ID.
    -   Sockets query
        -   Fetch a list of sockets from in a relay-style pagination.
    -   When the app starts, the `pullSocket` method starts polling from the [Open Charge Map API] immediately.
    -   A cron-job is also set to call the `pullSocket` method regularly at midnight for fetching new data or updating the existing ones.
        -   Changes in existing data are updated based on the comparison of the `dateLastStatusUpdate` key.
    -   `pullSocket` method.
        -   Reads the countries data from a json file which is generated at run time by `generateCountriesJson` method by reading and parsing the [cow.txt](./src/subgraphs/socket/src/config/cow.txt).
        -   Polls data only for the enabled countries from the `IISOCode` interface.
            -   Only Germany and India are enabled for now.
        -   Calls the `generateSubBoundingBoxesOfCountry` method for each enabled country to generate square areas of 10 sq. km or less.
        -   Polling happens for with respect to each generated sub box.

2.  [Initial Setup](./README.md#initial-setup)

    1.  Go to terminal and execute the command to start the application

        ```bash
        npm start
        ```

    2.  Execute the command from the root directory to run the tests

        ```bash
        npm test
        ```

3.  Import Postman collection and environment variable

    -   Import Collection from [here](https://www.postman.com/descent-module-operator-65787222/workspace/public/collection/649289bd3516b12300f37753).
    -   Import Environment Variables from [here](https://www.postman.com/descent-module-operator-65787222/workspace/public/environment/15813424-cdf6a24c-f88e-4315-87ae-665d692a46ce).

4.  Queries List:

    1.  Socket

        ```bash
        query Socket($identifier: String!) {
            socket(identifier: $identifier) {
                identifier
                serial
                uuid
                dateCreated
                dateLastVerified
                dateLastStatusUpdate
                statusType {
                    isOperational
                    isUserSelectable
                    id
                    title
                }
                operatorInfo {
                    websiteURL
                    comments
                    phonePrimaryContact
                    phoneSecondaryContact
                    isPrivateIndividual
                    addressInfo {
                        id
                        title
                        addressLine1
                        addressLine2
                        town
                        stateOrProvince
                        postcode
                        countryID
                        country {
                            isoCode
                            continentCode
                            id
                            title
                        }
                        latitude
                        longitude
                        contactTelephone1
                        contactTelephone2
                        contactEmail
                        accessComments
                        relatedURL
                    }
                    bookingURL
                    contactEmail
                    faultReportEmail
                    isRestrictedEdit
                    id
                    title
                }
                dataProvider {
                    websiteURL
                    comments
                    dataProviderStatusType {
                        isProviderEnabled
                        id
                        title
                    }
                    isRestrictedEdit
                    isOpenDataLicensed
                    isApprovedImport
                    license
                    dateLastImported
                    id
                    title
                }
                connections {
                    id
                    connectionTypeID
                    connectionType {
                        formalName
                        isDiscontinued
                        isObsolete
                        id
                        title
                    }
                    reference
                    statusTypeID
                    statusType {
                        isOperational
                        isUserSelectable
                        id
                        title
                    }
                    levelID
                    level {
                        comments
                        isFastChargeCapable
                        id
                        title
                    }
                    amps
                    voltage
                    powerKW
                    currentTypeID
                    currentType {
                        description
                        id
                        title
                    }
                    quantity
                    comments
                }
                addressInfo {
                    id
                    title
                    addressLine1
                    addressLine2
                    town
                    stateOrProvince
                    postcode
                    countryID
                    country {
                        isoCode
                        continentCode
                        id
                        title
                    }
                    latitude
                    longitude
                    contactTelephone1
                    contactTelephone2
                    contactEmail
                    accessComments
                    relatedURL
                }
            }
            DataProviderStatusTypeTitle: __type(name: "DataProviderStatusTypeTitle") {
                enumValues {
                    description
                    name
                }
            }
            DataProviderTitle: __type(name: "DataProviderTitle") {
                enumValues {
                    description
                    name
                }
            }
            FormalName: __type(name: "FormalName") {
                enumValues {
                    description
                    name
                }
            }
            Comments: __type(name: "Comments") {
                enumValues {
                    description
                    name
                }
            }
            LevelTitle: __type(name: "LevelTitle") {
                enumValues {
                    description
                    name
                }
            }
            Description: __type(name: "Description") {
                enumValues {
                    description
                    name
                }
            }
            CurrentTypeTitle: __type(name: "CurrentTypeTitle") {
                enumValues {
                    description
                    name
                }
            }
        }
        ```

    2.  Sockets

        ```bash
        query Sockets {
            sockets {
                totalCount
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    startCursor
                    endCursor
                }
                edges {
                    cursor
                    node {
                        identifier
                        serial
                        uuid
                        dateCreated
                        dateLastVerified
                        dateLastStatusUpdate
                        statusType {
                            isOperational
                            isUserSelectable
                            id
                            title
                        }
                        operatorInfo {
                            websiteURL
                            comments
                            phonePrimaryContact
                            phoneSecondaryContact
                            isPrivateIndividual
                            addressInfo {
                                id
                                title
                                addressLine1
                                addressLine2
                                town
                                stateOrProvince
                                postcode
                                countryID
                                country {
                                    isoCode
                                    continentCode
                                    id
                                    title
                                }
                                latitude
                                longitude
                                contactTelephone1
                                contactTelephone2
                                contactEmail
                                accessComments
                                relatedURL
                            }
                            bookingURL
                            contactEmail
                            faultReportEmail
                            isRestrictedEdit
                            id
                            title
                        }
                        dataProvider {
                            websiteURL
                            comments
                            dataProviderStatusType {
                                isProviderEnabled
                                id
                                title
                            }
                            isRestrictedEdit
                            isOpenDataLicensed
                            isApprovedImport
                            license
                            dateLastImported
                            id
                            title
                        }
                        connections {
                            id
                            connectionTypeID
                            connectionType {
                                formalName
                                isDiscontinued
                                isObsolete
                                id
                                title
                            }
                            reference
                            statusTypeID
                            statusType {
                                isOperational
                                isUserSelectable
                                id
                                title
                            }
                            levelID
                            level {
                                comments
                                isFastChargeCapable
                                id
                                title
                            }
                            amps
                            voltage
                            powerKW
                            currentTypeID
                            currentType {
                                description
                                id
                                title
                            }
                            quantity
                            comments
                        }
                        addressInfo {
                            id
                            title
                            addressLine1
                            addressLine2
                            town
                            stateOrProvince
                            postcode
                            countryID
                            country {
                                isoCode
                                continentCode
                                id
                                title
                            }
                            latitude
                            longitude
                            contactTelephone1
                            contactTelephone2
                            contactEmail
                            accessComments
                            relatedURL
                        }
                    }
                }
            }
            DataProviderStatusTypeTitle: __type(name: "DataProviderStatusTypeTitle") {
                enumValues {
                    description
                    name
                }
            }
            DataProviderTitle: __type(name: "DataProviderTitle") {
                enumValues {
                    description
                    name
                }
            }
            FormalName: __type(name: "FormalName") {
                enumValues {
                    description
                    name
                }
            }
            Comments: __type(name: "Comments") {
                enumValues {
                    description
                    name
                }
            }
            LevelTitle: __type(name: "LevelTitle") {
                enumValues {
                    description
                    name
                }
            }
            Description: __type(name: "Description") {
                enumValues {
                    description
                    name
                }
            }
            CurrentTypeTitle: __type(name: "CurrentTypeTitle") {
                enumValues {
                    description
                    name
                }
            }
            StatusTypeTitle: __type(name: "StatusTypeTitle") {
                enumValues {
                    description
                    name
                }
            }
        }
        ```

[open charge map api]: (https://openchargemap.org/site/develop/api#/operations/get-poi)

[countries of the world]: https://web.archive.org/web/20150319012353/http://opengeocode.org/cude/download.php?file=/home/fashions/public_html/opengeocode.org/download/cow.txt