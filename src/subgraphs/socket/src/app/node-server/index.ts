import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { GraphQLError } from 'graphql';
import { Logger } from '../../util';
const schemaPath = join(__dirname, 'schema.graphql');

const buildSubgraph = async (port: number): Promise<void> => {
  const typeDefs = gql(readFileSync(schemaPath, { encoding: `utf-8` }));

  const resolvers = {
    Query: {
      a: () => ({}),
    },
    A: {
      foo: () => 'hello from a',
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
    await buildSubgraph(socketSubgraphPort);
  } catch (error) {
    Logger.error('Unable to spin up Socket Subgraph:- ', error);
  }
};

export default init;
