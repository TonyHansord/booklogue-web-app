import { Button } from 'react-bootstrap';

function Note({ note }) {
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
      <h1>{note.subject}</h1>
      <p>{note.content}</p>
      <Button onClick={handleDelete} variant="danger">
        Delete Note
      </Button>
    </div>
  );
}

export default Note;
