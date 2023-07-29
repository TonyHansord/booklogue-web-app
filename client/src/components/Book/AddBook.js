import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddBook({ show, handleClose }) {
  const [title, setTitle] = useState('');
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [genreList, setGenreList] = useState([]);
  const [genreID, setGenreID] = useState(1);

  useEffect(() => {
    fetch('/genres')
      .then((res) => res.json())
      .then((data) => {
        setGenreList(data);
      });
  }, []);

  const onchange = (e) => {
    setGenreID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/authors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: authorFirstName,
        last_name: authorLastName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch('/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            genre_id: genreID,
            author_id: data.id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            handleClose();
          });
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formBookTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Book Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBookAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                name="firstName"
                value={authorFirstName}
                onChange={(e) => setAuthorFirstName(e.target.value)}
              />

              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={authorLastName}
                onChange={(e) => setAuthorLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBookGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Select name="genre" onChange={onchange} value={genreID}>
                {genreList.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* <p className="error">{errormessage}</p> */}

            <div>
              <Button variant="secondary" type="submit">
                Add Book
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

export default AddBook;
