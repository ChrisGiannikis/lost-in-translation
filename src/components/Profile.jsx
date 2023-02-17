import React, { useState, useEffect } from 'react';
import { STORAGE_KEY_USER } from '../const/storageKeys';
import { useUser } from '../context/UserContext';
import withAuth from '../hoc/withAuth';
import ProfileActions from './Profile/ProfileActions';
import ProfileHeader from './Profile/ProfileHeader';
import ProfileTranslationsHistory from './Profile/ProfileTranslationHistory';

const Profile = () => {

const {user} = useUser()
  
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