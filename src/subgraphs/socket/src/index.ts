import cron from 'node-cron';
import { MongoAppInit, NodeAppInit } from '../src/app';
import { pullSocket } from './cron';

void (async (): Promise<void> => {
  await MongoAppInit();
  await NodeAppInit();

  cron.schedule('1 0 * * *', async (): Promise<void> => {
    console.log('Socket polling initiated...');
    await pullSocket();
    console.log('Socket polling finished...');
  });
})();
