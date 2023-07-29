import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import Book from './Book';
import AddBook from './AddBook';

function MyBooks({ setSelectedBook }) {
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
        />
      );
    });
  };

  return (
    <Container className="border border-3 border-info-subtle rounded">
      <Row>
        <Col className="border-end">
          <Button className="mx-2" onClick={handleShowAddBook}>
            Add New Book
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="border-end">
          <p className="text-start px-2">Title</p>
        </Col>
        <Col>
          <p className="text-start px-2">Author</p>
        </Col>
        <Col>
          <p className="text-start px-2">Genre</p>
        </Col>
        <Col>
          <p className="text-start px-2">Add Note</p>
        </Col>
      </Row>
      {renderBooks(myBooks)}

      <AddBook show={showAddBook} handleClose={handleCloseAddBook} />
    </Container>
  );
}

export default MyBooks;
