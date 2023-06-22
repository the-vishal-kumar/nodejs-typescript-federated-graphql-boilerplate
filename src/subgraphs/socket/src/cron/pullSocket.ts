import fs from 'node:fs';
import path from 'node:path';

import { Socket } from '../model';
import { ISocketDocument, IISOCode, ICountryBoundingBox } from '../type';
import { generateCountriesJson, generateSubBoundingBoxesOfCountry, Logger, Array } from '../util';

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
const updateSockets = async (socketsToBeUpserted: any[]): Promise<ISocketDocument[]> => {
  const socketIDsToBeUpserted: { _id?: string; uuid: string }[] = [];
  const sockets = await Array.filterArrayAsync(socketsToBeUpserted, async item => {
    let socket = await Socket.findOne({ uuid: item.uuid }, { _id: 1, dateLastStatusUpdate: 1 });
    if (socket) {
      socket = socket.toObject();
      const fetchedSocketLastUpdated = Math.floor(new Date(item.dateLastStatusUpdate).valueOf() / 1000);
      const savedSocketLastUpdated = Math.floor(new Date(socket.dateLastStatusUpdate).valueOf() / 1000);
      if (fetchedSocketLastUpdated <= savedSocketLastUpdated) return false;
    }
    socketIDsToBeUpserted.push({ _id: socket && socket._id, uuid: item.uuid });
    return true;
  });

  return sockets.map(socketToBeUpserted => {
    const _id = socketIDsToBeUpserted.find(socketId => socketToBeUpserted.uuid === socketId.uuid)?._id;
    const item = { ...socketToBeUpserted };
    if (_id) item._id = _id;
    return Socket.build(item);
  });
};

const pullSocket = async (): Promise<void> => {
  try {
    if (!openChargeMapApiKey) throw new Error('Unable to pull sockets. Missing license');

    let countriesData;
    try {
      countriesData = fs.readFileSync(countriesJsonPath, 'utf8');
    } catch (err) {
      Logger.error('CountriesJson not found:- ', err);
      generateCountriesJson();
      countriesData = fs.readFileSync(countriesJsonPath, 'utf8');
    }

    const countriesJson = JSON.parse(countriesData);
    const enabledCountries = Object.values(IISOCode);

    const fetchPromises = enabledCountries.flatMap(country => {
      const countryData: ICountryBoundingBox = countriesJson[country];
      const generatedSubBoundingBoxes = generateSubBoundingBoxesOfCountry(countryData.topLeft, countryData.bottomRight);

      return generatedSubBoundingBoxes.map(subBoundingBox => {
        const [topLeftLongitude, topLeftLatitude] = subBoundingBox[0];
        const [bottomRightLongitude, bottomRightLatitude] = subBoundingBox[1];

        let uri = `https://api.openchargemap.io/v3/poi?key=${openChargeMapApiKey}&camelcase=true&distanceunit=km&maxresults=1000`;
        uri += `&countrycode=${country}&boundingbox=(${topLeftLatitude},${topLeftLongitude}),(${bottomRightLatitude},${bottomRightLongitude})`;

        return fetchSocketsData(uri);
      });
    });

    const fetchedSockets = await Promise.all(fetchPromises);

    const socketsToBeUpserted = fetchedSockets.flat();
    const sockets: ISocketDocument[] = await updateSockets(socketsToBeUpserted);

    await Socket.insertMany(sockets);
  } catch (err) {
    Logger.error('Error occured pulling sockets:- ', err);
  }
};

export default pullSocket;
