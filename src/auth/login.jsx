import React, { useState } from "react";
import "./auth.css";
import video from "../assets/video/1472560_Education_People_1920x1080.mp4";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event){
    event.preventDefault();
    setError("");
    try {
      const response = await axios.get('http://localhost:5000/users/search', {
        params: {
          username: email,
          password: password
        }
      });
      
      localStorage.setItem('token',password)
      localStorage.setItem('user',email)
      localStorage.setItem('role',response.data.role)
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response.status === 404) {
        setError('username or password is incorrect');
        console.error('User not found');
      } else {
        // Handle other errors
        console.error('Error:', error.message);
      }
    }
    
  }
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
      <h1 className="intro">Login</h1>
        <div className={ error ? "highlight news lg er " : "highlight news lg  "}>
          
          <form className ="grid grid-cols-4   gap-7" onSubmit={handleSubmit}>
            <label>
              Email
              </label>
              <input
              className="col-span-3"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
           
            <label>
              Password
              </label>
              <input
                className="col-span-3 "
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            {error && <p className="error col-span-4 ">{error}</p>}
            
            <button  className= "col-span-4 " type="submit">Login</button>
          </form>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Login;
