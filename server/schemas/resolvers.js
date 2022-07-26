const { AuthenticationError } = require("apollo-server-express");
const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
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
		saveBook: async (parent, { input }, context) => {
			if (context.user) {
				// const newBook = await Book.create({
				// 	input,
				// });
				// console.log(input);
				const newBook = await User.findOneAndUpdate(
					{ _id: context.user_id },
					// { _id: "62df143447b8b9043480d3b5" },
					{ $addToSet: { savedBooks: input } },
					{ new: true }
				);
				console.log(input, context.user);
				// console.log(context.user);
				// await User.findOneAndUpdate(
				// 	{ _id: context.user._id },
				// 	{ $addToSet: { savedBooks: book._id } }
				// );

				return newBook;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		removeBook: async (parent, { input }, context) => {
			if (context.user) {
				const thought = await Book.findOneAndDelete({
					_id: input,
				});
				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { books: book._id } }
				);

				return book;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
	},
};
module.exports = resolvers;
