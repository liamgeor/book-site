import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {collection, getDocs, query} from 'firebase/firestore'
import {db} from '../firebase.config.js'

export default function Home() {

  const [users, setUsers] = useState([])

  useEffect(() =>{
    getUsers()
  }, [])

  const getUsers = async() =>{
    const usersRef = collection(db, "users")

    const q = query(
      usersRef
    )
    // setUsers()
    const querySnap = await getDocs(q);
    
    const users = []

    querySnap.forEach((doc) =>{
      return users.push({
        id: doc.id,
        data: doc.data()
      })
    })

    setUsers(users)
  }

  return <div>
    {users.map((user) => <Link to={`/profile/${user.id}`} key={user.id}>{user.data.first_name}</Link>)}
  </div>;
}
