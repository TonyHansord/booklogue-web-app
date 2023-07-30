import { Row, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Book from './Book';

function AllBooks({ isLoggedIn }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  const handleAddToMyBooks = (book) => {
    console.log('add to my books');
    fetch(`/books/${book.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_id: book.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const renderBooks = (books) => {
    return books.map((book) => {
      return (
        <Book
          key={book.id}
          bookType={'all'}
          book={book}
          handleAdd={handleAddToMyBooks}
          isLoggedIn={isLoggedIn}
        />
      );
    });
  };

  return (
    <Container className="main-container border border-3 border-info-subtle rounded">
      <Row>
        <Col>
          <h3 className="text-center">Recently Added</h3>
        </Col>
      </Row>
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
        {isLoggedIn ? (
          <Col>
            <h4 className="text-center px-2">Add Book</h4>
          </Col>
        ) : (
          <></>
        )}
      </Row>
      {renderBooks(books)}
    </Container>
  );
}

export default AllBooks;
