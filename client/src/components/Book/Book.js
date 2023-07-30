import { Row, Col, Button, Container } from 'react-bootstrap';
import AddNote from '../Notes/AddNote';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Book({ bookType, book, handleAdd, setSelectedBook, isLoggedIn }) {
  const [showAddNote, setShowAddNote] = useState(false);

  const bookTitle = book.title;
  const bookAuthor = book.authors[0].full_name;
  const bookGenre = book.genre.name;

  const navigate = useNavigate();

  console.log(isLoggedIn);

  const handleCloseAddNote = () => setShowAddNote(false);
  const handleShowAddNote = () => setShowAddNote(true);

  return (
    <Row key={book.id} className="py-2">
      <Col>
        <p className="text-center px-2">{bookTitle}</p>
      </Col>
      <Col>
        <p className="text-center px-2">{bookAuthor}</p>
      </Col>
      <Col>
        <p className="text-center px-2">{bookGenre}</p>
      </Col>

      {isLoggedIn ? (
        <Col>
          {bookType === 'all' ? (
            <Button onClick={() => handleAdd(book)}> Add Book </Button>
          ) : (
            <Container>
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      setSelectedBook(book);
                      navigate(`/me/books/${book.id}`);
                    }}
                  >
                    View Notes
                  </Button>
                </Col>
                <Col>
                  <Button onClick={handleShowAddNote}> Add Note </Button>
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      ) : (
        <></>
      )}
      <AddNote
        book={book}
        show={showAddNote}
        handleClose={handleCloseAddNote}
      />
    </Row>
  );
}

export default Book;
