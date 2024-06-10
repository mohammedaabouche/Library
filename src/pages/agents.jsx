import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import'./pages.css';

function Agents() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState({
  });
  const attribus = ["username", "role"];
  const formatDate = (date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}01`;
  };
  const date = new Date();
    const password = formatDate(date);
    
  const menuItems = [
    { path: "/agent", label: "Add Agent" },
    { path: "/agent/all", label: "All Agent" },
  ];

  const getAgents = async () => { 
    try {
      const response = await axios.get("http://localhost:5000/agents");
      setAgents(response.data);
    }
    catch (error) {
      console.error("Error:", error.message);
    }
  };

  const postAgent = async (agent) => {
    try {
      const response = await axios.post("http://localhost:5000/agents", agent);
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
    setAgents([
        {
            username: "Sample Title",
            role: "Sample Author",
        },
        {
            username: "Sample Title",
            role: "Sample Author",
        },
    ]);

  }, [location]);
  const agentMapping=agents.map((agent) => {
    return (
      <tr>
        <td>{agent.username}</td>
        <td>{agent.role}</td>
        
      </tr>
    );
  }
  );
  const handleRoutes   = () => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find((item) => currentPath === item.path);
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgent(prevAgent => ({
      ...prevAgent,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setAgent({});
    console.log(agent);
  }

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
            {activeRoute === "/agent" && (
              <div className=" py-20">

              <form className="form-book grid grid-cols-6 gap-5">
                {attribus.map((label) => (
                  <React.Fragment>
                    <label >{label}</label>
                    <input name={label} onChange={handleInputChange} className="  col-span-2" type="text" placeholder={label} />
                  </React.Fragment>
                ))}
                <label >password</label>
                <input name="password" onChange={handleInputChange} className="password col-span-2" type="text" placeholder={password} disabled/>

                <button onClick={handleSubmit} className="col-start-5 col-span-2">Add Book</button>
              </form>
              </div>
            )}
            {activeRoute === "/agent/all" && (

              <div className="table">
                <table >
                  <thead>
                    <tr>
                        {attribus.map((attribu) => (
                            <th>{attribu}</th>
                        ))}
                     
                    </tr>
                  </thead>
                  <tbody>
                    {agentMapping}
                  </tbody>
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

export default Agents;
