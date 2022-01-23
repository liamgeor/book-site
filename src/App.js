import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home';
import Profile from './components/Profile';
import List from './components/List';
import Book from './components/Book';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
// import {collection, where, doc, getDocs, query} from 'firebase/firestore'
// import {db} from './firebase.config.js'


function App() {

  const [users, setUsers] = useState([])

  useEffect(() =>{
    // getUsers()
  }, [])

  // const getUsers = async() =>{
  //   const usersRef = collection(db, "users")

  //   const q = query(
  //     usersRef
  //   )
  //   // setUsers()
  //   const querySnap = await getDocs(q);
    
  //   const users = []

  //   querySnap.forEach((doc) =>{
  //     return users.push({
  //       id: doc.id,
  //       data: doc.data()
  //     })
  //   })

  //   setUsers(users)
  // }




  return (
    <div className="App">
      <Router>
      <Navbar/>
      {/* {users.map((user) => <h1 key={user.id}>{user.data.first_name}</h1>)} */}
      
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
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
