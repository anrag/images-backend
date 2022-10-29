import { PubSub } from "apollo-server";

const pubsub = new PubSub();

/**
 * extractInput - extracts the actual input payload from the graphql input
 * in case no input was provided, the function returns an empty JSON object
 *
 * @param {*} args
 */
let getQuery = function (args) {
  return args.query ? args.query : {};
};

let getInput = function (args) {
  return args.input ? args.input : {};
};

export default {
  Query: {
    user: (parent, args, { db }, info) => db.getUser(args, info),
    org: (parent, args, { db }, info) => db.getOrg(args, info),
    role: (parent, args, { db }, info) => db.getRole(args, info),
    article: (parent, args, { db }, info) => db.getArticle(args, info),
  },
  Mutation: {
    addArticle: (parent, args, { db }, info) => db.addArticle(args),
    updateArticle: (parent, args, { db }, info) => db.updateArticle(args),
    getArticleByTitle: (parent, args, { db }, info) =>
      db.getArticleByTitle(args),
  },
};
