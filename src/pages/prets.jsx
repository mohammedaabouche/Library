import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
function Prets() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [prets, setPrets] = useState([]);
  const [pret, setPret] = useState({});
  const [search, setSearch] = useState("");
  const attribus = [
    "adherent",
    "agent",
    "livre",
    "datepret",
    "dateretour",
    "status",
  ];

  const menuItems = [
    { path: "/pret", label: "Add pret" },
    { path: "/pret/all", label: "All pret" },
  ];
  
  const getPrets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/prets");
      setPrets(response.data);
    }
    catch (error) {
      console.error("Error:", error.message);
    }
  };

  const postPret = async () => {
    
    try {
      const response = await axios.post("http://localhost:5000/prets", pret);
      console.log(response.data);
    }
    catch (error) {
      console.error("Error:", error.message);
    }
  };
  const MyFunction = (e) => {
    e.preventDefault(); 
    setSearch(e.target.value);
  }


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
  const pretMapping = prets.filter(
    (pret) => {
      if (search == "") return pret;
      else if (
        String(pret.adherent).toLowerCase().includes(search.toLowerCase()) ||
        String(pret.agent).toLowerCase().includes(search.toLowerCase()) ||
        String(pret.livre).toLowerCase().includes(search.toLowerCase()) ||
        String(pret.datepret).toLowerCase().includes(search.toLowerCase()) ||
        String(pret.dateretour).toLowerCase().includes(search.toLowerCase()) ||
        String(pret.status).toLowerCase().includes(search.toLowerCase())
      ) {
        return pret;
      }
    }
  ).map((pret) => {
    return (
      <tr>
        <td>{pret.adherent}</td>
        <td>{pret.agent}</td>
        <td>{pret.livre}</td>
        <td>{pret.datepret}</td>
        <td>{pret.dateretour}</td>
        <td onClick={()=>{
          if(pret.status==="OK"){
            pret.status="Non Rendu"
          }
          else{
            pret.status="OK"
          }
        
        }} >{pret.status}</td>
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
            {activeRoute === "/pret" && (
              <div className=" py-20">
                <form className="form-book grid grid-cols-6 gap-5">
                  {attribus.map((label) => (
                    <React.Fragment>
                      <label>{label}</label>
                      <input
                        name={label}
                        onChange={handleInputChange}
                        className="  col-span-2"
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
            {activeRoute === "/pret/all" && (
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

export default Prets;
