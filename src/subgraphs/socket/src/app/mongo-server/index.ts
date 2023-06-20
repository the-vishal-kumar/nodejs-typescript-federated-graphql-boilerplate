import mongoose from 'mongoose';
import { Logger } from '../../util';
import { mongoConfig } from '../../config';
const { dbOptions } = mongoConfig;

const init = async (): Promise<typeof mongoose> => {
  const mongoUri = String(process.env.MONGO_URI);
  try {
    if (!mongoUri) throw new Error('Mongo URI invalid');
    await mongoose.connect(mongoUri, dbOptions);
    Logger.info(`🚀Mongo database is accepting connections on ${mongoUri}`);
    return mongoose;
  } catch (err) {
    Logger.error('Failed to connect to Mongo database:- ', err);
    throw err;
  }
};

export default init;
