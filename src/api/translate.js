
import { createHeaders } from "./customHeader";

const apiUrl = process.env.REACT_APP_API_URL  //retrieving the url of the api from enviromental variables
export const addTranslation = async (user, translation) => {
    try{
        const translationsHistory = getTranslations(user.id);
        const list = (await translationsHistory)[1]; //taking the list of translations of current user
        list.push(translation)                       //adding to the list the current translation
        const response = await fetch(`${apiUrl}/translations/${user.id}`,{
        method: 'PATCH',
        headers: createHeaders(),                    //creating headers by calling the createHeaders()
        body: JSON.stringify({
            username: user.username,                 //returning the username
            translations: list                       //returning the updated list 
        })

        })

        if(!response.ok){
            throw new Error('Could not update the translation list')
        }
        const result = await response.json(); //converting the result of the response at json and setting to result variable
        return[null,result];                  // returns the result and null error because no error occurred
    }
    catch(error){                             //if error occured
        return [error.message,null];          // returns the error and null result due to an error
    }
}

export const translationClearhistory = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/translations/${userId}`,{  //adding at the url the "/translations/" and the current user id 
            method:'PATCH',
            headers:createHeaders(),                 //creating headers by calling the createHeaders()
            body: JSON.stringify({translations:[]})  //returns an empty list of translations with json
        }
        )
        if(!response.ok){throw new Error('Could not update the translation list')}  // if fetch go wrong
        const result = await response.json()   //converting the result of the response at json and setting to result variable
        return[null,result];                   // returns the result and null error because no error occurred
        } 
        catch(error){                          //if error occured
        return [error.message,null];           // returns the error and null result due to an error
        }
    
}

const getTranslations = async(userId) => {
    try{
        const response = await fetch(`${apiUrl}/translations/${userId}`);  //trying to connect with the translations api for user with the current id
        if(!response.ok){                                                  //if connection fail
            throw new Error('Could not connect to api.');                  //throw an error
        }
        const user = await response.json();  //converting the result of the response at json and setting to user variable
        return [null, user.translations];    // returns the user translations and null error because no error occurred
    }catch(error){                           //if error occured
        return [error.message, []];          // returns the error message and empty list of translations
    }
}
