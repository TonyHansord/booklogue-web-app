import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Book from './Book';
import AddBook from './AddBook';

function MyBooks({ setSelectedBook, isLoggedIn }) {
  const [showAddBook, setShowAddBook] = useState(false);

  const [myBooks, setMyBooks] = useState([]);

  const handleCloseAddBook = () => setShowAddBook(false);
  const handleShowAddBook = () => setShowAddBook(true);

  useEffect(() => {
    fetch('/me/books')
      .then((res) => res.json())
      .then((data) => {
        setMyBooks(data);
      });
  }, [showAddBook]);

  const renderBooks = (books) => {
    return books.map((book) => {
      return (
        <Book
          key={book.id}
          book={book}
          bookType={'my'}
          setSelectedBook={setSelectedBook}
          isLoggedIn={isLoggedIn}
        />
      );
    });
  };

  return (
    <Container className="main-container border border-3 border-info-subtle rounded">
      {/* <Row>
        <Col>
          <Button onClick={handleShowAddBook}>Add New Book</Button>
        </Col>
      </Row> */}

      <Row>
        <Col>
          <h4 className="text-center px-2">Title</h4>
        </Col>
        <Col>
          <h4 className="text-center px-2">Author</h4>
        </Col>
        <Col>
          <h4 className="text-center px-2">Genre</h4>
        </Col>
        <Col>
          <h4 className="text-center px-2">Actions</h4>
        </Col>
      </Row>
      {renderBooks(myBooks)}

      <Row className="p-2">
        <Col>
          <Button onClick={handleShowAddBook}>Add New Book</Button>
        </Col>
      </Row>

      <AddBook show={showAddBook} handleClose={handleCloseAddBook} />
    </Container>
  );
}

export default MyBooks;
