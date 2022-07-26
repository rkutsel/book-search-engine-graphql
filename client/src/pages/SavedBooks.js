import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import {
	Jumbotron,
	Container,
	CardColumns,
	Card,
	Button,
} from "react-bootstrap";

import { getMe, deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
	const [userData, setUserData] = useState({});
	const { loading, data } = useQuery(QUERY_ME, {
		// variables: { _id: "62e0257a53a7727dc3c9aa2a" },
	});
	const [removeBook, { error }] = useMutation(REMOVE_BOOK, {
		update(cache, { data: { removeBook } }) {
			try {
				cache.writeQuery({
					query: QUERY_ME,
					data: { me: removeBook },
				});
			} catch (e) {
				console.error(e);
			}
		},
	});
	// console.log(JSON.stringify(data?.me?.savedBooks));
	// console.log(books);
	// data?.me?.savedBooks.map((book) => {
	// 	// key = { bookId };
	// 	console.log(book.image);
	// });
	// setUserData((data) => JSON.stringify(data));
	// console.log(userData);

	// setUserData(data);
	// console.log(books);

	// use this to determine if `useEffect()` hook needs to run again
	// const userDataLength = Object.keys(userData).length;

	// useEffect(() => {
	// 	const getUserData = async () => {
	// 		try {
	// 			const token = Auth.loggedIn() ? Auth.getToken() : null;

	// 			if (!token) {
	// 				return false;
	// 			}

	// 			const response = await getMe(token);

	// 			if (!response.ok) {
	// 				throw new Error("something went wrong!");
	// 			}

	// 			const user = await response.json();
	// 			setUserData(user);
	// 		} catch (err) {
	// 			console.error(err);
	// 		}
	// 	};

	// 	getUserData();
	// }, [userDataLength]);

	// create function that accepts the book's mongo _id value as param and deletes the book from the database
	const handleDeleteBook = async (bookId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		try {
			// const response = await deleteBook(bookId, token);

			// if (!response.ok) {
			// 	throw new Error("something went wrong!");
			// }

			// const updatedUser = await response.json();
			// setUserData(updatedUser);
			const { data } = await removeBook({
				variables: { bookId },
			});
			// upon success, remove book's id from localStorage
			removeBookId(bookId);
		} catch (err) {
			console.error(err);
		}
	};

	// if data isn't here yet, say so
	// if (!userDataLength) {
	// 	return <h2>LOADING...</h2>;
	// }

	return (
		<>
			<Jumbotron fluid className="text-light bg-dark">
				<Container>
					<h1>Viewing saved books!</h1>
				</Container>
			</Jumbotron>
			<Container>
				<h2>
					{data?.me?.savedBooks.length
						? `Viewing ${data?.me?.savedBooks.length} saved ${
								data?.me?.savedBooks.length === 1 ? "book" : "books"
						  }:`
						: "You have no saved books!"}
				</h2>
				<CardColumns>
					{data?.me?.savedBooks.map((book) => {
						return (
							<Card key={book.bookId} border="dark">
								{book.image ? (
									<Card.Img
										src={book.image}
										alt={`The cover for ${book.title}`}
										variant="top"
									/>
								) : null}
								<Card.Body>
									<Card.Title>{book.title}</Card.Title>
									<p className="small">Authors: {book.authors}</p>
									<Card.Text>{book.description}</Card.Text>
									<Button
										className="btn-block btn-danger"
										onClick={() => handleDeleteBook(book.bookId)}
									>
										Delete this Book!
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container>
		</>
	);
};

export default SavedBooks;
