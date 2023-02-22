import {createHeaders} from './customHeader'

const API_URL = process.env.REACT_APP_API_URL  //retrieving the url of the api from enviromental variables

const checkForUser = async (username) => {
    try{
        const response = await fetch(`${API_URL}/users?username=${username}`);  //trying to connect with the api and checks if username exists
        if(!response.ok){                                                       //if connection fail
            throw new Error('Could not connect to api.');                       //throw an error
        }
        const users = await response.json(); //converting the result of the response at json and setting to user variable
        return [null, users];                // returns the user translations and null error because no error occurred
    }catch(error){                           //if error occured
        return [error.message, []]           // returns the error message and empty list of translations
    }
}

const createUser = async (username) => {
    try{
        const response = await fetch(`${API_URL}/users`, { //trying to connect with the api
            method:'POST',            //with POST method,
            headers: createHeaders(), //the custom headers
            body: JSON.stringify({    //and the json body of a new user in string
                username,             //setting the username
                favourites : []       //setting an empty list 
            })
        });  
        if(!response.ok){  //if connection fail
            throw new Error(`Could not create user with username: ${username}`); //throw an error
        }
        const user = await response.json();         //takes the user
        createTranslation(user.username,user.id);   //creates a new reference to that user at translations api 
        return [null, user];                        // returns the user translations and null error because no error occurred
    }catch(error){                                  //if error occured
        return [error.message, []]                  // returns the error message and empty list of translations
    }
}

export const loginUser = async (username) => {
    const [checkError, user] = await checkForUser(username); //calling the checkForUser() and returns the result at user value or the error at checkError value

    if(checkError !== null){ // no error occured
        //all went good
        return [checkError, null]
    }

    if (user.length > 0){ 
        //user exists
        return [null, user.pop()];
    }

    //if there is not error and no user exists, create a new user
    return await createUser(username);
   

}

export const userById = async (userId) => {
    try{
          const response = await fetch(`${API_URL}/translations/${userId}`)  //trying to conect with api and take data from a user with id 
          if(!response.ok){  //if something go wrong
            throw new Error('Could not fetch user')
          }
          const user = await response.json()  //takes the user data in json format
          return [null,user]                  // returns the user and null error because no error occurred
    }
    catch(error){                             //if error occured
        return[error.message,null]            // returns the error message and empty list of translations
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
        if(!response.ok){                                                         //if connection fail
            throw new Error(`Could not create user with username: ${username}`);  //throw an error
        }
        const translation = await response.json(); //takes the translation
        return [null, translation];                // returns the user translations and null error because no error occurred
    }catch(error){                                 //if error occured
        return [error.message, []];                // returns the error message and empty list of translations
    }
}