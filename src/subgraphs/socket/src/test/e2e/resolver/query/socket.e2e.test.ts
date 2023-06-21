describe('Query:Socket', () => {
  it('throws validation error when identifier is not provided', async () => {
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
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
        `,
        variables: {},
      }),
    });
    expect(response.status).toBe(400);
    const responseJson = await response.json();
    expect(responseJson.errors[0].message).toBe('Variable "$identifier" of required type "String!" was not provided.');
  });

  it('throws not found error when socket identifier does not exist', async () => {
    const identifier = '6491d40a66373ff02b91cb68';
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
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
        `,
        variables: {
          identifier,
        },
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.errors[0].message).toBe('Socket not found');
  });

  it('returns a socket successfully', async () => {
    const identifier = '6491d40a66373ff02b91cb67';
    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
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
        `,
        variables: {
          identifier,
        },
      }),
    });
    expect(response.status).toBe(200);
    const responseJson = await response.json();
    expect(responseJson.data.socket.identifier).toBe(identifier);
  });
});
