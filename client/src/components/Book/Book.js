import { Row, Col, Button } from 'react-bootstrap';
import AddNote from '../Notes/AddNote';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Book({ bookType, book, handleAdd, setSelectedBook }) {
  const [showAddNote, setShowAddNote] = useState(false);

  const bookTitle = book.title;
  const bookAuthor = book.authors[0].full_name;
  const bookGenre = book.genre.name;

  const navigate = useNavigate();

  const handleCloseAddNote = () => setShowAddNote(false);
  const handleShowAddNote = () => setShowAddNote(true);

  return (
    <Row key={book.id}>
      <Col className="border-end">
        <p className="text-start px-2">{bookTitle}</p>
      </Col>
      <Col>
        <p className="text-start px-2">{bookAuthor}</p>
      </Col>
      <Col>
        <p className="text-start px-2">{bookGenre}</p>
      </Col>
      <Col>
        {bookType === 'all' ? (
          <Button onClick={() => handleAdd(book)}> Add Book </Button>
        ) : (
          <>
            <Button
              onClick={() => {
                setSelectedBook(book);
                navigate(`/me/books/${book.id}`);
              }}
            >
              View Notes
            </Button>
            <Button onClick={handleShowAddNote}> Add Note </Button>
          </>
        )}
      </Col>
      <AddNote
        book={book}
        show={showAddNote}
        handleClose={handleCloseAddNote}
      />
    </Row>
  );
}

export default Book;
