import React, {useEffect, useState} from 'react';
import {db} from '../firebase.config'
import {doc, query, where, getDocs, getDoc} from 'firebase/firestore'

export default function List({list}) {

  const [listBooks, setListBooks] = useState([])


  const {books, create_date, followers, owner, privacy, title} = list


  //fetch this list's books
  const fetchListBooks = async(book) =>{

    const snap = await getDoc(doc(db, 'books', book))
    if(snap.exists()){
        console.log(snap.data())
        setListBooks((prevState) =>([...prevState, snap.data()]))
    }

}


  useEffect(() =>{
    setListBooks([])
    books.forEach((book) =>{
      fetchListBooks(book);
    })
  }, [])


  return(
    <div>
      <div>{title}</div>
      {listBooks.map((book) => <div>{book.title}</div>)}
    </div>
  )
}
