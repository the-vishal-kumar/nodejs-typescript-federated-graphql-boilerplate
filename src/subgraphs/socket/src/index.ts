import 'newrelic';

import cron from 'node-cron';
import { MongoAppInit, NodeAppInit } from './app';
import { pullSocket } from './cron';

void (async (): Promise<void> => {
  await MongoAppInit();
  await NodeAppInit();

  await pullSocket();
  cron.schedule('1 0 * * *', async (): Promise<void> => {
    await pullSocket();
  });
})();
