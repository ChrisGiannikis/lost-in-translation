
import { createHeaders } from "./customHeader";

const apiUrl = process.env.REACT_APP_API_URL
export const addTranslation = async (user, translation) => {
    try{
        const translationsHistory = getTranslations(user.id);
        const list = (await translationsHistory)[1]; //taking the list of translations of current user
        list.push(translation)    //adding to the list the current translation
        const response = await fetch(`${apiUrl}/translations/${user.id}`,{
        method: 'PATCH',
        headers: createHeaders(),
        body: JSON.stringify({
            username: user.username,  //returning the username
            translations: list  //returning the updated list 
        })

        })

        if(!response.ok){
            throw new Error('Could not update the translation list')
        }
        const result = await response.json()
        return[null,result]
    }
    catch(error){
        return [error.message,null]
    }
}

export const translationClearhistory = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/translations/${userId}`,{
            method:'PATCH',
            headers:createHeaders(),
            body: JSON.stringify({translations:[]})
        }
        )
        if(!response.ok){throw new Error('Could not update the translation list')}
        const result = await response.json()
        return[null,result]
        }
        catch(error){
        return [error.message,null]
        }
    
}

const getTranslations = async(userId) => {
    try{
        const response = await fetch(`${apiUrl}/translations/${userId}`);  //trying to connect with the translations api for user with the current id
        if(!response.ok){  //if connection fail
            throw new Error('Could not connect to api.'); //throw an error
        }
        const user = await response.json();
        return [null, user.translations];
    }catch(error){
        return [error.message, []];
    }
}
