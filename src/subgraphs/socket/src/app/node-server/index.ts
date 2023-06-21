import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { GraphQLError } from 'graphql';
import { Logger, getEnumKey } from '../../util';
import { Query } from '../../resolver';
import {
  IConnection,
  IDataProvider,
  IDataProviderStatusTypeTitle,
  IDataProviderTitle,
  ISocketDocument,
  IFormalName,
  ICurrentTypeTitle,
  IDescription,
  IComments,
  ILevelTitle,
} from '../../type';

const schemaPath = join(__dirname, 'schema.graphql');

const buildSocketSubgraph = async (port: number): Promise<void> => {
  const gqlContent = readFileSync(schemaPath, { encoding: 'utf-8' });
  const typeDefs = gql(gqlContent);
  const resolvers = {
    Query: {
      socket: Query.socket,
      sockets: Query.sockets,
    },
    Socket: {
      identifier: ({ _id }: ISocketDocument): string => _id,
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

  const schema = buildSubgraphSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    introspection: process.env.ENVIRONMENT !== 'production',
    formatError: (error): GraphQLError => {
      Logger.error('[Socket Subgraph Error]:', error);
      return error;
    },
  });
  const { url } = await server.listen(port);
  Logger.info(`🚀Socket Subgraph running ${url}`);
};

const init = async (): Promise<void> => {
  const socketSubgraphPort = Number(process.env.SOCKET_SUBGRAPH_PORT);
  try {
    if (!socketSubgraphPort) throw new Error('Socket subgraph port undefined');
    await buildSocketSubgraph(socketSubgraphPort);
  } catch (error) {
    Logger.error('Unable to spin up Socket Subgraph:- ', error);
  }
};

export default init;
