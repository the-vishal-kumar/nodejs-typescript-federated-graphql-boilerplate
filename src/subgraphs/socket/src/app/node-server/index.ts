import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
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
    introspection: process.env.ENVIRONMENT !== `production`,
  });
  const { url } = await server.listen(port);
  console.log(`🚀Socket Subgraph running ${url}`);
};

const init = async (): Promise<void> => {
  try {
    await buildSubgraph(4001);
  } catch (error) {
    console.error('Unable to spin up Socket Subgraph:- ', error);
  }
};

export default init;
