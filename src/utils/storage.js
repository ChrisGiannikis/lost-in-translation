//This function takes a key-value pair and stores it in localStorage after converting the value to a JSON string. If no key is provided or the key is not a string, it throws an error.
export const storageSave = (key, value) => {
    if(!key && typeof key !='string'){
        throw new Error('StorageSave: No storage key provided');
    }
    if(!value){
        throw new Error('storageSave: No value provided for ' +key)
    }
    localStorage.setItem(key, JSON.stringify(value));
}
//This function takes a key and returns the corresponding value from localStorage after parsing it from JSON format. If no data is found for the given key, it returns null.
export const storageRead = key => {
    const data = localStorage.getItem(key);
    if(data){   
        return JSON.parse(data);
    }
    return null;
}
//This function takes a key and removes the corresponding key-value pair from localStorage.
export const storageDelete = key =>{
    localStorage.removeItem(key)
}