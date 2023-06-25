import fs from 'node:fs';
import path from 'node:path';

import { Socket } from '../model';
import { ISocketDocument, IISOCode, ICountryBoundingBox } from '../type';
import {
  generateCountriesJson,
  generateSubBoundingBoxesOfCountry,
  Logger,
  readInputFileAndReturnContent,
  writeOutputFile,
} from '../util';

const countriesJsonPath = path.join(__dirname, '..', 'config', 'countries.json');
const openChargeMapApiKey = String(process.env.OPEN_CHARGE_MAP_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchSocketsData = async (uri: string): Promise<any> => {
  const response = await fetch(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSocketsToBeUpserted = async (fetchedSockets: any[]): Promise<ISocketDocument[]> => {
  const fetchedSocketsIDs: string[] = fetchedSockets.map(fetchedSocket => fetchedSocket?.id);
  const alreadyExistingSockets = await Socket.find(
    { serial: { $in: fetchedSocketsIDs } },
    { serial: 1, dateLastStatusUpdate: 1 },
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketsToBeUpserted: any[] = [];
  fetchedSockets.forEach(fetchedSocket => {
    let exisitngSocket = alreadyExistingSockets.find(existingSocket => {
      const eSocket = existingSocket.toObject();
      return eSocket.serial === fetchedSocket.id;
    });
    if (exisitngSocket) {
      exisitngSocket = exisitngSocket.toObject();
      const fetchedSocketLastUpdated = Math.floor(new Date(fetchedSocket.dateLastStatusUpdate).valueOf() / 1000);
      const savedSocketLastUpdated = Math.floor(new Date(exisitngSocket.dateLastStatusUpdate).valueOf() / 1000);

      const isFetchedDataUpdated = fetchedSocketLastUpdated > savedSocketLastUpdated;
      if (isFetchedDataUpdated) socketsToBeUpserted.push(Socket.build(fetchedSocket, exisitngSocket.id));
    } else {
      socketsToBeUpserted.push(Socket.build(fetchedSocket));
    }
  });

  return socketsToBeUpserted;
};

const pullSocket = async (): Promise<void> => {
  Logger.info('Socket polling initiated...');
  try {
    if (!openChargeMapApiKey) throw new Error('Unable to pull sockets. Missing license');

    let countriesData;
    try {
      countriesData = fs.readFileSync(countriesJsonPath, 'utf8');
    } catch (err) {
      Logger.error('CountriesJson not found:- ', err);

      const content = readInputFileAndReturnContent();
      const countriesJSON = generateCountriesJson(content);
      writeOutputFile(countriesJSON);

      countriesData = fs.readFileSync(countriesJsonPath, 'utf8');
    }

    const countriesJson = JSON.parse(countriesData);
    const enabledCountries = Object.values(IISOCode);

    const subBoundingBoxesOfCountries = enabledCountries.flatMap(countryIsoCode => {
      const countryData: ICountryBoundingBox = countriesJson[countryIsoCode];
      const generatedSubBoundingBoxes = generateSubBoundingBoxesOfCountry(countryData.topLeft, countryData.bottomRight);

      return generatedSubBoundingBoxes.map(subBoundingBox => {
        const [topLeftLongitude, topLeftLatitude] = subBoundingBox[0];
        const [bottomRightLongitude, bottomRightLatitude] = subBoundingBox[1];

        let uri = `https://api.openchargemap.io/v3/poi?key=${openChargeMapApiKey}&camelcase=true&distanceunit=km&maxresults=1000`;
        uri += `&countrycode=${countryIsoCode}&boundingbox=(${topLeftLatitude},${topLeftLongitude}),(${bottomRightLatitude},${bottomRightLongitude})`;

        return {
          countryIsoCode,
          subBoundingBox,
          uri,
        };
      });
    });

    for (let subBoundingBoxIndex = 0; subBoundingBoxIndex < subBoundingBoxesOfCountries.length; subBoundingBoxIndex++) {
      const { countryIsoCode, subBoundingBox, uri } = subBoundingBoxesOfCountries[subBoundingBoxIndex];
      const fetchedSockets = await fetchSocketsData(uri);
      const sockets: ISocketDocument[] = await getSocketsToBeUpserted(fetchedSockets);
      try {
        const upsertionResult = await Socket.bulkWrite(
          sockets.map(socket => {
            return {
              updateOne: {
                filter: { serial: socket.serial },
                update: { $set: socket },
                upsert: true,
              },
            };
          }),
        );
        Logger.info(
          `${subBoundingBoxIndex} Upsertion done:- ${JSON.stringify({
            countryIsoCode,
            subBoundingBox,
            upsertionResult,
          })}`,
        );
      } catch (err) {
        Logger.error(
          `${subBoundingBoxIndex} Upsertion failed:- ${JSON.stringify({ countryIsoCode, subBoundingBox, err })}`,
        );
        Logger.error(`${subBoundingBoxIndex} fetchedSockets ${JSON.stringify(fetchedSockets)}`);
        Logger.error(`${subBoundingBoxIndex} sockets ${JSON.stringify(sockets)}`);
      }
    }
  } catch (err) {
    Logger.error('Error occured pulling sockets:- ', err);
  }
  Logger.info('Socket polling finished...');
};

export default pullSocket;
