import "./home.css";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import { useState ,useEffect } from "react";
import axios from "axios";

function Home() {
  const [search, setSearch] =useState("")
  const [books,setBooks]=useState([])
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

 

  const MyFunction = (e) => {
    e.preventDefault(); 
    setSearch(e.target.value);
};

  useEffect(() => {
    
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
  }, []);

  const bookmapping = books.filter((book) => {
    if (search === "") {
      return book;
    } else if (
      book.title.toLowerCase().includes(String(search).toLowerCase()) ||
      book.author.toLowerCase().includes(String(search).toLowerCase())
    ) {
      return book;
    }}).map((book) => {
    return (
      <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.datepub}</td>
        <td>{book.avalibale}</td>
      </tr>
    );
  });
  return (
    <div className="">
      <nav className=" nav grid grid-cols-10 gap-3">
        <h1 className="col-span-8 logo">EmiBook</h1>

        <ul className=" col-span-2 grid grid-cols-4 gap-10">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li className=" col-span-2">
            {localStorage.getItem("token") ? (
              <a
                className="login"
                href="/"
                onClick={() => {
                  localStorage.setItem("token", "");
                }}
              >
                logout
              </a>
            ) : (
              <a className="login" href="/auth">
                Login
              </a>
            )}
          </li>
        </ul>
      </nav>
      <div class="fullscreen-video-wrap">
        <video src={video} autoPlay autoFocus loop></video>
      </div>
      <main>
        <section id="home">
          <p className="intro">
            Bienvenue sur le site de notre bibliothèque. Nous offrons une vaste
            gamme de livres, de ressources numériques et d'événements
            communautaires.
          </p>
          <div class="highlight hours">
            <h3>Heures d'ouverture</h3>
            <p>
              <span className="special">Lundi - Vendredi: </span> 9h00 - 18h00
            </p>
            <p>
              <span className="special">Samedi: </span>10h00 - 16h00
            </p>
            <p>
              <span className="special">Dimanche:</span> Fermé
            </p>
          </div>
          <div class="highlight news">
            <h3>Nouvelles acquisitions</h3>

            <ul>
              <li>
                <strong>Le dernier roman de Pierre Lemaitre</strong>
              </li>
              <li>
                <strong>Un guide complet sur le jardinage urbain</strong>
              </li>
              <li>
                <strong>
                  Des ressources interactives pour apprendre le codage
                </strong>
              </li>
            </ul>
          </div>
          <div class="highlight events">
            <h3>Événements à venir</h3>
            <p className="special">Ne manquez pas nos prochains événements :</p>
            <ul>
              <li>
                -&nbsp;&nbsp; Atelier de lecture pour enfants &nbsp; -&nbsp; 12
                juin à 14h00
              </li>
              <li>
                -&nbsp;&nbsp; Conférence sur l'histoire locale &nbsp;- &nbsp;20
                juin à 18h00
              </li>
              <li>
                -&nbsp;&nbsp; Club de lecture mensuel &nbsp;-&nbsp; 25 juin à
                17h00
              </li>
            </ul>
          </div>
        </section>
        <div className="table">
          <input
            type="text"
            placeholder="search ..."
            onChange={(e) => {
              MyFunction(e);
            }}
          />
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
      </main>

      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
export default Home;
