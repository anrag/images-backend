"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;
var _graphqlImport = require("graphql-import");
var _graphqlTools = require("graphql-tools");
var _resolvers = _interopRequireDefault(require("./resolvers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: (0, _graphqlImport.importSchema)("src/graphql/typeDefs/schema.gql"),
  resolvers: _resolvers.default
});
exports.schema = schema;
//# sourceMappingURL=index.js.map