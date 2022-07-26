const { gql } = require("apollo-server-express");

const typeDefs = gql`
	input CreateBook {
		bookId: String
		authors: [String]
		description: String
		title: String
		image: String
	}
	type User {
		_id: ID
		username: String
		email: String
		password: String
		bookCount: Int
		savedBooks: [Book]
	}
	type Book {
		bookId: String
		authors: [String]
		description: String
		title: String
		image: String
	}
	type Auth {
		token: ID!
		user: User
	}
	type Query {
		me: User
	}
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveBook(
			description: String
			authors: [String]
			bookId: String
			title: String
			image: String
		): User
		removeBook(bookId: ID!): User
	}
`;
module.exports = typeDefs;
