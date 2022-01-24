import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Profile from './components/Profile';
import List from './components/List';
import Book from './components/Book';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'


function App() {

  




  return (
    <div className="App">
      <Router>
      <Navbar/>
      

      
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/:user_id' element={<Profile/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/book/:book_id' element={<Book/>}/>
          <Route path='/list/:list_id' element={<List/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
