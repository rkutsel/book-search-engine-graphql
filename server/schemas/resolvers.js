const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				console.log(context.user._id);
				return User.findOne({ _id: context.user._id }).populate("savedBooks");
			}
			throw new AuthenticationError("You need to be logged in!");
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
				throw new AuthenticationError("No user found with this email address");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);

			return { token, user };
		},
		saveBook: async (
			parent,
			{ description, authors, bookId, title, image },
			context
		) => {
			if (context.user) {
				// const newBook = await Book.create({
				// 	input,
				// });
				// console.log(input);
				const newBook = await User.findOneAndUpdate(
					{ _id: context.user._id },
					// { _id: "62e01502f04112d654fa40d4" },
					{
						$addToSet: {
							savedBooks: { description, authors, bookId, title, image },
						},
					},
					{ new: true }
				);
				// console.log(context.user._id);
				// console.log(context.user);
				// await User.findOneAndUpdate(
				// 	{ _id: context.user._id },
				// 	{ $addToSet: { savedBooks: book._id } }
				// );

				return newBook;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		removeBook: async (parent, { bookId }, context) => {
			if (context.user) {
				const removedBook = await User.findOneAndUpdate(
					{
						_id: context.user._id,
					},
					{
						$pull: {
							savedBooks: { bookId },
						},
					}
				);

				return removedBook;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
	},
};
module.exports = resolvers;
