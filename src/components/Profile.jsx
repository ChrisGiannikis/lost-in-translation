import React, { useEffect } from 'react';
import { userById } from '../api/user';
import { useUser } from '../context/UserContext';
import withAuth from '../hoc/withAuth';
import ProfileActions from './Profile/ProfileActions';
import ProfileHeader from './Profile/ProfileHeader';
import ProfileTranslationsHistory from './Profile/ProfileTranslationHistory';

// Profile Component Definition
const Profile = () => {
  // Accessing user and setUser functions from UserContext using custom hook
  const {user, setUser} = useUser()

  // Using useEffect to fetch latest user data on component mount and update the UserContext
  useEffect(() =>{
    const findUser = async () => {
      const [error, latestUser] = await userById(user.id)
      if(error === null){
        setUser(latestUser)
      }
    }
    findUser()
  }, [setUser, user.id])

  // Rendering profile components
  return (
    <div>
      <h1>Profile Page</h1>
      <ProfileHeader username={user.username}/>
      <ProfileActions />
      <ProfileTranslationsHistory translations={user.translations}/>
    </div>
  );
}

// Exporting profile component with Auth HOC for authentication
export default withAuth(Profile);