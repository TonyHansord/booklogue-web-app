import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import AllBooks from './components/Book/AllBooks';
import MyBooks from './components/Book/MyBooks';
import BookInfo from './components/Book/BookInfo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedBook, setSelectedBook] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/me')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.name) {
          setUserName(data.name);
          setIsLoggedIn(true);
          navigate('/me');
        } else {
          setUserName('');
          setIsLoggedIn(false);
          // navigate('/');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setUserName('');
        setIsLoggedIn(false);
        navigate('/');
      });
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
                handleLogout={handleLogout}
              />
              <AllBooks />
            </>
          }
        ></Route>
        <Route
          path="/me"
          element={
            <>
              <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
                handleLogout={handleLogout}
                userName={userName}
              />
              <AllBooks />
            </>
          }
        ></Route>
        <Route
          path="/me/books"
          element={
            <>
              <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
                handleLogout={handleLogout}
                userName={userName}
              />
              <MyBooks setSelectedBook={setSelectedBook} />
            </>
          }
        ></Route>

        <Route
          path="/me/books/:book_id"
          element={
            <>
              <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
                handleLogout={handleLogout}
                userName={userName}
              />
              <BookInfo bookID={selectedBook.id} />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
