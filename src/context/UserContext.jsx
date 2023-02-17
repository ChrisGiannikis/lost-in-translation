import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../const/storageKeys";
import { storageRead } from "../utils/storage";

//Exposing the context
const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext);
}

//managing the state with provider
const UserProvider = ({children}) => {

    const [user, setUser] = useState(storageRead(STORAGE_KEY_USER));

    const state = {
        user,
        setUser
    }

    return(
        <UserContext.Provider value={ state }>
            { children }
        </UserContext.Provider>
    )
}
export default UserProvider;