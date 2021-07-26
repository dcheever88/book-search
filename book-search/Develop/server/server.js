const express = require('express');
const path = require('path');
// import Apollo
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;

// new apollo db and pass in data
async function startApolloServer() {

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

await server.start();
const app = express();

// integrate apollo server with expresss as middleware
server.applyMiddleware({ app });


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}`);
  // log to test graphQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
})
};

startApolloServer();