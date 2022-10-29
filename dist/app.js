"use strict";

var _apolloServer = require("apollo-server");
var _graphql = require("./graphql");
var _db = _interopRequireDefault(require("./db"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const server = new _apolloServer.ApolloServer({
  schema: _graphql.schema,
  uploads: true,
  playground: true,
  introspection: true,
  tracing: true,
  context: {
    db: _db.default
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      console.log("connect");
    },
    onDisconnect: webSocket => {
      console.log("disconnect");
    }
  }
});

// once sequelize is up & running, start market data service http listener
server.listen(8000).then(({
  url,
  subscriptionsUrl
}) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
//# sourceMappingURL=app.js.map