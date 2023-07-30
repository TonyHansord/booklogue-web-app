import { useEffect, useState } from 'react';
import Note from '../Notes/Note';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function BookInfo({ bookID }) {
  const [book, setBook] = useState({});
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookNotes, setBookNotes] = useState([]);

  const navigate = useNavigate();

  const { book_id } = useParams();

  const id = book_id ? book_id : bookID;

  useEffect(() => {
    // console.log(params);
    fetch(`/me/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBook(data);
        setBookTitle(data.title);
        setBookAuthor(data.authors[0].full_name);
        setBookGenre(data.genre.name);
        setBookNotes(data.notes);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNotes = (notes) => {
    return notes.map((note) => {
      return <Note key={note.id} note={note} book={book} />;
    });
  };

  const handleDelete = () => {
    fetch(`/me/books/${book.id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        navigate('/me/books');
      }
    });
  };

  return (
    <Container className="note-container rounded">
      <h1 className="text-left">{bookTitle}</h1>
      <h2 className="text-left">{bookAuthor}</h2>
      <p className="text-left">{bookGenre}</p>

      <Button onClick={handleDelete} variant="danger">
        Delete Book
      </Button>

      <h3 className="text-center">Notes</h3>
      {renderNotes(bookNotes)}
    </Container>
  );
}

export default BookInfo;
