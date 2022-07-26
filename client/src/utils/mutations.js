import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation SaveBook(
		$description: String
		$bookId: String
		$title: String
		$authors: [String]
		$image: String
	) {
		saveBook(
			description: $description
			bookId: $bookId
			title: $title
			authors: $authors
			image: $image
		) {
			_id
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation Mutation($bookId: ID!) {
		removeBook(bookId: $bookId) {
			_id
		}
	}
`;
