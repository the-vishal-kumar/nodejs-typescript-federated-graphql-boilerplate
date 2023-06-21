import 'newrelic';

import cron from 'node-cron';
import { MongoAppInit, NodeAppInit } from './app';
import { Logger } from './util';
import { pullSocket } from './cron';

void (async (): Promise<void> => {
  await MongoAppInit();
  await NodeAppInit();

  // await pullSocket();
  cron.schedule('1 0 * * *', async (): Promise<void> => {
    Logger.info('Socket polling initiated...');
    await pullSocket();
    Logger.info('Socket polling finished...');
  });
})();
