import mongoose, { Connection } from 'mongoose';
const { MONGO_URI } = process.env;

const initEventListeners = (connection: Connection): void => {
  connection.once('open', async () => {
    console.info('Mongo database event open');
    console.debug(`Mongo database connected to ${MONGO_URI}`);

    connection.on('connected', () => {
      console.info('Mongo database event connected');
    });

    connection.on('disconnected', () => {
      console.warn('Mongo database event disconnected');
    });

    connection.on('reconnected', () => {
      console.info('Mongo database event reconnected');
    });

    connection.on('error', (err: Error) => {
      console.error('Mongo database event error: ', err);
    });
  });
};

const init = async (): Promise<typeof mongoose> => {
  try {
    if (!MONGO_URI) throw new Error('Mongo URI invalid');

    await mongoose.connect(MONGO_URI, {
      connectTimeoutMS: 1000,
    });
    initEventListeners(mongoose.connection);
    console.info(`🚀Mongo database is accepting connections on ${MONGO_URI}`);

    return mongoose;
  } catch (err) {
    console.error('Failed to connect to Mongo database:- ', err);
    throw err;
  }
};

export default init;
