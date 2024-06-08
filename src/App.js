import React from 'react';
import Home from './home/Home';
import './App.css';
import Auth from './auth/auth';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import HomeUser from './home/HomeUser';
import ProtectedRoute from './auth/ProtectedRoute';
import Book from './pages/book'
import Adherents from './pages/adherents';
import Prets from './pages/prets';
import Agents from './pages/agents';
import AdherentPrets from './pages/adherentPrets';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" Component={Auth} />
        <Route path="/" Component={Home} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/adherent/*" element={<ProtectedRoute element={<Adherents />} role={["agent","admin"]} />} />
        <Route path="/:id" element={<ProtectedRoute element={<HomeUser />} role={["adherent","agent","admin"]} />} />
        <Route path="/books/*" element={<ProtectedRoute element={<Book />} role={["agent","admin"]}/>} />
        <Route path="/pret/*" element={<ProtectedRoute element={<Prets />}role={["agent","admin"]} /> } />
        <Route path="/agent/*" element={<ProtectedRoute element={<Agents  />}  role={["admin"]}/> } />
        <Route path="/:id/mesprets" element={<ProtectedRoute element={<AdherentPrets />} role={["adherent","agent","admin"]} />} />
        <Route path="*" element={<h1>Not Found</h1>} />


      </Routes>
    </Router>
   
  );
}

export default App;
