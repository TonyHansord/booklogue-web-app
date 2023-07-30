import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddNote({ book, handleClose, show, note }) {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [errormessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleResponse = (res) => {
    console.log(res.status);
    if (res.status === 201 || 200) {
      res.json().then((data) => {
        handleClose();
      });
    } else {
      res.json().then((data) => {
        console.log(data.errors[0]);
        setErrorMessage(data.errors[0]);
      });
    }
  };

  function handleEdit(e) {
    e.preventDefault();
    fetch(`/me/notes/${note.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_id: book.id,
        subject: subject,
        content: content,
      }),
    }).then((res) => {
      console.log(res.json());
      handleResponse(res);
      if (res.ok) {
        window.location.reload();
      }
    });
  }

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
    }).then((res) => {
      handleResponse(res);
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{note ? 'Edit Note' : 'Add Note'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={note ? handleEdit : handleSubmit}>
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

            {<p className="error">{errormessage}</p>}

            <div>
              <Button variant="secondary" type="submit">
                {note ? 'Edit Note' : 'Add Note'}
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
