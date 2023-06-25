import * as Query from './query';
import { getEnumKey } from '../util';
import {
  ISocketDocument,
  IDataProvider,
  IDataProviderStatusTypeTitle,
  IDataProviderTitle,
  IConnection,
  IFormalName,
  IDescription,
  ICurrentTypeTitle,
  IComments,
  ILevelTitle,
} from '../type';

export const resolvers = {
  Query: {
    socket: Query.socket,
    sockets: Query.sockets,
  },
  Socket: {
    identifier: ({ _id }: ISocketDocument): string => _id,
    // id: ({ serial }: ISocketDocument): number => serial,
    dataProvider: ({ dataProvider }: ISocketDocument): IDataProvider => ({
      ...dataProvider,
      dataProviderStatusType: {
        ...dataProvider.dataProviderStatusType,
        title: getEnumKey(
          IDataProviderStatusTypeTitle,
          dataProvider.dataProviderStatusType.title,
        ) as IDataProviderStatusTypeTitle,
      },
      title: getEnumKey(IDataProviderTitle, dataProvider.title) as IDataProviderTitle,
    }),
    connections: ({ connections }: ISocketDocument): IConnection[] => {
      const connectionSubDocs = JSON.parse(JSON.stringify(connections));
      return connectionSubDocs.map((connection: IConnection) => ({
        ...connection,
        connectionType: {
          ...connection.connectionType,
          formalName: getEnumKey(IFormalName, connection.connectionType.formalName) as IFormalName,
        },
        currentType: {
          ...connection.currentType,
          description: getEnumKey(IDescription, connection.currentType?.description),
          title: getEnumKey(ICurrentTypeTitle, connection.currentType?.title),
        },
        level: {
          ...connection.level,
          comments: getEnumKey(IComments, connection.level?.comments),
          title: getEnumKey(ILevelTitle, connection.level?.title),
        },
      }));
    },
  },
};
