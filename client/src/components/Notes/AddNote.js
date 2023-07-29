import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddNote({ book, handleClose, show }) {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/me/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_id: book.id,
        subject: subject,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleClose();
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formNoteSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBookAuthor">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                required
                type="text"
                placeholder="Content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {/* <p className="error">{errormessage}</p> */}

            <div>
              <Button variant="secondary" type="submit">
                Add Note
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddNote;
