import React, {useEffect, useState} from 'react';
import {doc, query, where, getDocs, getDoc} from 'firebase/firestore'
import List from './List'
import {db} from '../firebase.config'
import {useParams} from 'react-router-dom'


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

    const params = useParams();

    useEffect(() =>{
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //fetch the user who's profile it is
    const fetchUser = async() =>{
        try {

            const snap = await getDoc(doc(db, 'users', params.user_id))
            
            if(snap.exists()){
                console.log(snap.data())
                setUser(snap.data())
                setUserLists([])
                snap.data().lists.forEach((list) =>{
                    fetchUserList(list);
                })
                // console.log(userLists)
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    

    const { first_name, last_name, followers, following , profile_pic} = user

    //fetch this user's lists
    const fetchUserList = async(list) =>{
        console.log(list)

        const snap = await getDoc(doc(db, 'lists', list))
        if(snap.exists()){
            console.log(snap.data())
            setUserLists((prevState) =>([...prevState, snap.data()]))
        }

    }

    if(loading){
        return <div>loading</div>
    }

  return (
    <div>
        <div className='flex flex-row'>
            <div>Welcome {first_name} {last_name}</div>
            <div>followers: {followers.length}</div>
            <div>following: {following.length}</div>
        </div>
        <div>
            <div>{profile_pic}</div>
            {userLists.map((list, index) => (
                <div className="flex flexrow" key={index}>
                    <List list={list} />
                </div>
            ))}
        </div>
    </div>
  )
}



