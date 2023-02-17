
import { createHeaders } from "./customHeader";

const apiUrl = process.env.REACT_APP_API_URL
export const addTranslation = async (user, translation) => {
try{
    const response = await fetch(`${apiUrl}/translations/${user.id}`,{
    method: 'PATCH',
    headers: createHeaders(),
    body: JSON.stringify({username: user.username,favourites:[...user.favourites,translation]})

})
if(!response.ok){throw new Error('Could not update the translation list')}
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
            body: JSON.stringify({favourites:[]})
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