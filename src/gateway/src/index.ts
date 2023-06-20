import 'newrelic';

import { ApolloServer } from 'apollo-server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GraphQLError } from 'graphql';
import { Logger } from './util';

const buildGateway = async (port: number): Promise<void> => {
  const gateway = new ApolloGateway({
    debug: true,
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: 'socket',
          url: `http://socket:${Number(process.env.SOCKET_SUBGRAPH_PORT)}/graphql`,
        },
      ],
    }),
  });

  const server = new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    formatError: (error): GraphQLError => {
      Logger.error('[Gateway Error]:', error);
      return error;
    },
  });
  const { url } = await server.listen(port);
  Logger.info(`🚀Gateway running ${url}`);
};

void (async (): Promise<void> => {
  const gatewayPort = Number(process.env.GATEWAY_PORT);
  try {
    if (!gatewayPort) throw new Error('Gateway port undefined');
    await buildGateway(gatewayPort);
  } catch (error) {
    Logger.error('Unable to spin up Gateway:- ', error);
  }
})();
