import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
function AdherentPrets() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [prets, setPrets] = useState([]);
  const [pret, setPret] = useState({});
  const attribus = ["agent", "livre", "datepret", "dateretour", "status"];

  const menuItems = [{ path: "/mesprets", label: "Mes prets" }];

  const getMyPrets = async (username) => {
    try {
      const response = await axios.get("http://localhost:5000/prets", {
        params: {
          adherent: username,
        },
      });
      setPrets(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const MyFunction = (e) => {
    e.preventDefault(); 
    setSearch(e.target.value);
};
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    handleRoutes();
    setPrets([
      {
        adherent: "Sample Title",
        livre: "Sample Author",
        datepret: "Sample Date",
        dateretour: "25",
        agent: "25",
        status: "OK",
      },
      {
        adherent: "Sample Title",
        livre: "Sample Author",
        datepret: "Sample Date",
        dateretour: "25",
        agent: "25",
        status: "-",
      },
      {
        adherent: "Sample Title",
        livre: "Sample Author",
        datepret: "Sample Date",
        dateretour: "25",
        agent: "25",
        status: "Non Rendu",
      },
    ]);
  }, [location]);
  const pretMapping = prets
    .filter((book) => {
      return book.adherent === localStorage.getItem("user");
    })
    .map((pret) => {
      return (
        <tr>
          <td>{pret.agent}</td>
          <td>{pret.livre}</td>
          <td>{pret.datepret}</td>
          <td>{pret.dateretour}</td>
          <td>{pret.status}</td>
        </tr>
      );
    });
  const handleRoutes = () => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find((item) => currentPath === item.path);
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };
  const handleInputChange = (e) => {
    if (e.target.name === "agent") {
      e.target.value = localStorage.getItem("user");
      setPret((prevPret) => ({
        ...prevPret,
        [e.target.name]: localStorage.getItem("user"),
      }));
      return;
    }
    const { name, value } = e.target;
    setPret((prevPret) => ({
      ...prevPret,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPret({});
    console.log(pret);
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
          <div>
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
                    {attribus.map((attribu) => (
                      <th>{attribu}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{pretMapping}</tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default AdherentPrets;
