const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    checkLists: [CheckList]
  }

  type CheckItem {
    text: String!
    isCheck: Boolean
  }

  type CheckList {
    _id: ID!
    checklistText: String!
    checklistAuthor: String
    createdAt: String
    comments: [Comment]!
    items: [CheckItem]
  }
  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input CheckItemInput {
    text: String!
  }

  type Query {
    users: [User]
    user(username: String): User
    checkLists(username:String): [CheckList]
    checkList(checklistId: ID!): CheckList
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCheckList(checklistText: String!, checkListAuthor: String! items: [CheckItemInput]): CheckList
    addComment(
      checkListId: ID!
      commentText: String!
      commentAuthor: String!
    ): CheckList
    removeCheckList(checkListId: ID!): Thought
    removeComment(checkListId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
