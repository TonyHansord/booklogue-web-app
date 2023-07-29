import { Row, Col, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Book from './Book';

function AllBooks() {
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
        />
      );
    });
  };

  return (
    <Container className="border border-3 border-info-subtle rounded">
      <Row>
        <Col>
          <h3 className="text-center">Recently Added</h3>
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
          <p className="text-start px-2">Add Book</p>
        </Col>
      </Row>
      {renderBooks(books)}
    </Container>
  );
}

export default AllBooks;
