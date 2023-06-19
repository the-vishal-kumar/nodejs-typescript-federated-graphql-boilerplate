import { ApolloServer } from 'apollo-server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const buildGateway = async (port: number): Promise<void> => {
  const gateway = new ApolloGateway({
    debug: true,
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: 'socket',
          url: 'http://socket:4001/graphql',
        },
      ],
    }),
  });

  const server = new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  const { url } = await server.listen(port);
  console.log(`🚀Gateway running ${url}`);
};

void (async (): Promise<void> => {
  try {
    await buildGateway(4000);
  } catch (error) {
    console.error('Unable to spin up Gateway:- ', error);
  }
})();
