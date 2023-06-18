import { ApolloServer, gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

const buildSubgraph = async (port: number): Promise<void> => {
  const typeDefs = gql`
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

    type Query {
      a: A
    }
    type A {
      foo: String
    }
  `;

  const resolvers = {
    Query: {
      a: () => ({}),
    },
    A: {
      foo: () => 'hello from a',
    },
  };

  const schema = buildSubgraphSchema({ typeDefs, resolvers });
  const server = new ApolloServer({ schema });
  const { url } = await server.listen(port);
  console.log(`Subgraph running ${url}`);
};

void (async (): Promise<void> => {
  await buildSubgraph(4001);
})();
