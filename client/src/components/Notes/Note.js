import { Button, Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import AddNote from './AddNote';

function Note({ note, book }) {
  const [showEditNote, setShowEditNote] = useState(false);

  const handleCloseEditNote = () => setShowEditNote(false);
  const handleShowEditNote = () => setShowEditNote(true);

  function handleDelete() {
    fetch(`/me/notes/${note.id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        window.location.reload();
      }
    });
  }

  return (
    <div className="my-2 p-4 border border-3 border-info-subtle rounded">
      <h4>{note.subject}</h4>
      <p>{note.content}</p>
      <Container>
        <Row>
          <Col className="note-col">
            <Button onClick={handleShowEditNote} variant="primary">
              Edit Note
            </Button>
            <Button onClick={handleDelete} variant="danger">
              Delete Note
            </Button>
          </Col>
        </Row>
      </Container>

      <AddNote
        book={book}
        note={note}
        show={showEditNote}
        handleClose={handleCloseEditNote}
      />
    </div>
  );
}

export default Note;
