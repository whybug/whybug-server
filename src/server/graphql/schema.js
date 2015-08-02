import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
} from 'graphql/lib/type';

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the User.',
    },
    caught: {
      type: new GraphQLList(GraphQLString),
      description: 'The Pokemon that have been caught by the User.',
    },
    created: {
      type: GraphQLInt,
      description: 'The creation timestamp of the User.'
    }
  })
});

let SolutionType = new GraphQLObjectType({
  name: 'Solution',
  description: 'A solution to an error',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the Pokemon.',
    },
    type: {
      type: GraphQLString,
      description: 'The type of the Pokemon.',
    },
    stage: {
      type: GraphQLInt,
      description: 'The level of the Pokemon.',
    },
    species: {
      type: GraphQLString,
      description: 'The species of the Pokemon.',
    }
  })
});


let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      pokemon: {
        type: new GraphQLList(PokemonType),
        resolve: () => Pokemon // here, Pokemon is an in-memory array
      }
    }
  })
});

export default schema;
