import { Socket } from '../model';
import { ISocketDocument } from '../type';
import { Logger, Array } from '../util';
const { OPEN_CHARGE_MAP_API_KEY } = process.env;

export const pullSocket = async (): Promise<void> => {
  if (!OPEN_CHARGE_MAP_API_KEY) throw new Error('Unable to pull sockets. Missing license');

  try {
    const requestHeaders = new Headers();
    requestHeaders.append('Accept', 'application/json');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: requestHeaders,
      redirect: 'follow',
    };

    const uri = `https://api.openchargemap.io/v3/poi?key=${OPEN_CHARGE_MAP_API_KEY}&camelcase=true&countrycode=in&distanceunit=km&maxresults=11`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchedSockets: any[] = await (await fetch(uri, requestOptions)).json();

    const socketsToBeUpserted = await Array.filterArrayAsync(fetchedSockets, async item => {
      let socket = await Socket.findOne({ uuid: item.uuid });
      if (socket) {
        socket = socket.toObject();
        const fetchedSocketLastUpdated = Math.floor(new Date(item.dateLastStatusUpdate).valueOf() / 1000);
        const savedSocketLastUpdated = Math.floor(new Date(socket.dateLastStatusUpdate).valueOf() / 1000);
        if (fetchedSocketLastUpdated <= savedSocketLastUpdated) return false;
      }
      return true;
    });

    const sockets: ISocketDocument[] = socketsToBeUpserted.map(item =>
      Socket.build({
        ...item,
        serial: item.id,
        location: { type: 'Point', coordinates: [item.addressInfo.longitude, item.addressInfo.latitude] },
      }),
    );

    await Socket.insertMany(sockets);
  } catch (err) {
    Logger.error(err);
  }
};
