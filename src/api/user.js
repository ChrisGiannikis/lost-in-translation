import {createHeaders} from './customHeader'

const API_URL = process.env.REACT_APP_API_URL 

const checkForUser = async (username) => {
    try{
        const response = await fetch(`${API_URL}/users?username=${username}`);  //trying to connect with the api and checks if username exists
        if(!response.ok){  //if connection fail
            throw new Error('Could not connect to api.'); //throw an error
        }
        const users = await response.json();
        return [null, users];
    }catch(error){
        return [error.message, []]
    }
}

const createUser = async (username) => {
    try{
        const response = await fetch(`${API_URL}/users`, { //trying to connect with the api
            method:'POST',                      //with POST method,
            headers: createHeaders(),           //the custom headers
            body: JSON.stringify({              //and the json body of a new user in string
                username,
                favourites : []
            })
        });  
        if(!response.ok){  //if connection fail
            throw new Error(`Could not create user with username: ${username}`); //throw an error
        }
        const user = await response.json(); //takes the user
        createTranslation(user.username,user.id);   //creates a new reference to that user at translations api 
        return [null, user];
    }catch(error){
        return [error.message, []]
    }
}

export const loginUser = async (username) => {
    const [checkError, user] = await checkForUser(username);

    if(checkError !== null){
        //all went good
        return [checkError, null]
    }

    if (user.length > 0){
        //user exists
        return [null, user.pop()];
    }

    //if there is not error and no user exists 
    return await createUser(username);
   

}

export const userById = async (userId) => {
    try{
          const response = await fetch(`${API_URL}/translations/${userId}`)
          if(!response.ok){
            throw new Error('Could not fetch user')
          }
          const user = await response.json()
          return [null,user]
    }
    catch(error){
        return[error.message,null]
    }
}

const createTranslation = async (username, id) => {
    try{
        const response = await fetch(`${API_URL}/translations`, { //trying to connect with the api at translations
            method:'POST',                      //with POST method creates a new translation,
            headers: createHeaders(),           //the custom headers
            body: JSON.stringify({              //and the json body of a new user with translation history in string 
                id,                             //adds the id of the user
                username,                       //adds the username of the user
                translations : []    //adds a list with the first translation of the user
            })
        });  
        if(!response.ok){  //if connection fail
            throw new Error(`Could not create user with username: ${username}`); //throw an error
        }
        const translation = await response.json(); //takes the translation
        return [null, translation];
    }catch(error){
        return [error.message, []]
    }
}