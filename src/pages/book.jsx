import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";

function Book() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});

  const menuItems = [
    { path: "/books", label: "Add Book" },
    { path: "/books/all", label: "All Books" },
  ];

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const postBook = async (book) => {
    try {
      const response = await axios.post("http://localhost:5000/books", book);
      console.log(response.data);
    }
    catch (error) {
      console.error("Error:", error.message);
    }
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    handleRoutes();
    setBooks([
      {
        title: "Sample Title",
        author: "Sample Author",
        datepub: "Sample Date",
        avalibale: "25",
      },
      {
        title: "Sample Title",
        author: "Sample Author",
        datepub: "Sample Date",
        avalibale: "25",
      },
    ]);
  }, [location]);
  const bookmapping = books.map((book) => {
    return (
      <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.datepub}</td>
        <td>{book.avalibale}</td>
      </tr>
    );
  });
  const handleRoutes = () => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find((item) => currentPath === item.path);
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(book);
  };

  return (
    <div>
      <nav className="nav grid grid-cols-10 gap-3">
        <h1 className="col-span-8 logo">EmiBook</h1>
        <ul className="col-span-2 grid grid-cols-4 gap-10">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li className="col-span-2">
            {localStorage.getItem("token") ? (
              <a
                className="login"
                href="/"
                onClick={() => localStorage.setItem("token", "")}
              >
                Logout
              </a>
            ) : (
              <a className="login" href="/auth">
                Login
              </a>
            )}
          </li>
        </ul>
      </nav>

      <div className="fullscreen-video-wrap">
        <video src={video} autoPlay loop muted></video>
      </div>
      <div className="wrap grid grid-cols-12 gap-0">
        <div className="sidebar col-span-2">
          <SideBar />
        </div>
        <main className="mainb col-span-10">
          <div className="grid grid-cols-2 gap-0">
            {menuItems.map((item) => (
              <a
                key={item.path}
                className={`button ${
                  activeRoute === item.path ? "btn-active" : ""
                }`}
                href={item.path}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div>
            {activeRoute === "/books" && (
              <div className=" py-20">
                <form className="form-book grid grid-cols-6 gap-5">
                  {[
                    "Title",
                    "Author",
                    "Description",
                    "date de publication",
                    "IDSN",
                  ].map((label) => (
                    <React.Fragment>
                      <label>{label}</label>
                      <input
                        name={label}
                        onChange={handleInputChange}
                        className=" col-span-2"
                        type="text"
                        placeholder={label}
                      />
                    </React.Fragment>
                  ))}

                  <button
                    onClick={handleSubmit}
                    className="col-start-5 col-span-2"
                  >
                    Add Book
                  </button>
                </form>
              </div>
            )}
            {activeRoute === "/books/all" && (
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>date de publication</th>
                      <th>copies disponibles</th>
                    </tr>
                  </thead>
                  <tbody>{bookmapping}</tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Book;
