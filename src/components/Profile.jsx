import React, { useState, useEffect } from 'react';
import { userById } from '../api/user';
import { useUser } from '../context/UserContext';
import withAuth from '../hoc/withAuth';
import ProfileActions from './Profile/ProfileActions';
import ProfileHeader from './Profile/ProfileHeader';
import ProfileTranslationsHistory from './Profile/ProfileTranslationHistory';

const Profile = () => {

const {user, setUser} = useUser()
  
useEffect(() =>{
const findUser = async () => {
  const [error,latestUser] = await userById(user.id)
  if(error === null){
    setUser(latestUser)
  }
}
findUser()
},[setUser,user.id])
  return (
    <div>
      <h1>Profile Page</h1>
      <ProfileHeader username={user.username}/>
      <ProfileActions />
      <ProfileTranslationsHistory favourites={user.favourites}/>
    </div>
  );
}


export default withAuth(Profile);