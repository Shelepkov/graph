const express = require('express');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const {applyMiddleware} = require('graphql-middleware');
const {makeExecutableSchema} = require('graphql-tools');
const permissions = require('./permissions');
const resolvers = require('./resolver');

const typeDefs = buildSchema(`
  ${require('fs').readFileSync(__dirname + '/schema.graphql', 'utf8')}
`);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();
app.use(cors());

const schemaWithMiddleware = applyMiddleware(schema, permissions);

app.use('/graphql', graphqlHTTP({
    schema: schemaWithMiddleware,
    graphiql: true,
}));

app.listen(4000, () => console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
