import React, {useEffect, useState} from 'react';
import {doc, query, where, getDocs, getDoc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import List from './List'
import {db} from '../firebase.config'
import {useParams, useNavigate} from 'react-router-dom'


export default function Profile() {

    const [user, setUser] = useState({
        admin: false,
        email: '',
        email_verified: false,
        first_name: '',
        last_name: '',
        followers: 0,
        following: 0,
        lists: [],
        profile_pic: ''
    })

    const [userLists, setUserLists] = useState([])
    const [loading, setLoading] = useState(true)

    const [currentUser, setCurrentUser] = useState({})

    const [currentBook, setCurrentBook] = useState(null)

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() =>{

        const auth = getAuth();
        

        setCurrentUser(auth.currentUser);
        console.log(auth.currentUser);

        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //fetch the user who's profile it is
    const fetchUser = async() =>{
        try {

            const snap = await getDoc(doc(db, 'users', params.user_id))
            
            if(snap.exists()){
                // console.log(snap.data())
                setUser(snap.data())
                setUserLists([])
                snap.data().lists.forEach((list) =>{
                    fetchUserList(list);
                })

                if(snap.data().current_book !== ""){
                    fetchCurrentBook(snap.data().current_book)
                }
                
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    

    const { first_name, last_name, followers, following , profile_pic} = user

    //fetch this user's lists
    const fetchUserList = async(list) =>{
        // console.log(list)

        const snap = await getDoc(doc(db, 'lists', list))
        if(snap.exists()){
            // console.log(snap.data())
            setUserLists((prevState) =>([...prevState, snap.data()]))
        }

    }

    const fetchCurrentBook = async (book) =>{

        // console.log("fetching current book")
        const snap = await getDoc(doc(db, 'books', book))

        // console.log(snap)

        if(snap.exists()){
            console.log(snap.data())
            setCurrentBook(snap.data())
        }
    }

    if(loading){
        return <div>loading</div>
    }

  return (
    <div className="flex flex-row">
        <div>
            <div>{first_name} {last_name}</div>
                
            <div>{profile_pic}</div>
            <div className="flex flex-row">
                <div>followers: {followers.length}</div>
                <div>following: {following.length}</div>
            </div>

            {currentBook && <>
                <div>Current Book: </div>
                <div>{currentBook.title}</div>
                <div>{currentBook.cover_image}</div>
            </>}
        </div>
        
        <div>
            
            {userLists.map((list, index) => (
                <div className="flex flexrow" key={index}>
                    <List list={list} />
                </div>
            ))}
        </div>
    </div>
  )
}



