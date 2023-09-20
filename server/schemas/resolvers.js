const { User, CheckList } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("checkLists");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("checkLists");
    },
    checkLists: async (parent, { username }) => {
      const params = username ? { username } : {};
      return CheckList.find(params).sort({ createdAt: -1 });
    },
    checkList: async (parent, { checkListId }) => {
      return CheckList.findOne({ _id: checkListId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addCheckList: async (parent, { checkListText, checkListAuthor, items }) => {
      const checkList = await CheckList.create({
        checkListText,
        checkListAuthor,
        items,
      });

      await User.findOneAndUpdate(
        { username: checkListAuthor },
        { $addToSet: { checkLists: checkList._id } }
      );

      return checkList;
    },
    addComment: async (parent, { checkListId, commentText, commentAuthor }) => {
      return CheckList.findOneAndUpdate(
        { _id: checkListId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeCheckList: async (parent, { checkListId }) => {
      return CheckList.findOneAndDelete({ _id: checkListId });
    },
    removeComment: async (parent, { checkListId, commentId }) => {
      return CheckList.findOneAndUpdate(
        { _id: checkListId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
