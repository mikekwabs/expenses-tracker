// We need auth since it will be needed by many components in our application 
//Therefore we can use the Context API for that.


//Creating a context

import { createContext, useContext, useEffect, useState } from "react";
import {auth} from "./firebase"
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";

//our context will store two things:
//the  authUser, together with an isLoading state.
const AuthContext = createContext({
    authUser: null,
    isLoading: true,
    signOut: async () => {}
})

export default function useFirebaseAuth(){
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clear = () =>{
        setAuthUser(null);
        setIsLoading(false);
    }

    const authStateChanged = async (user) => {
        //since the auth state is changing, we set the isLoading state to true
        setIsLoading(true);

        if (!user){
            //User not signed-in
            clear();
            return;
        }
        
        setAuthUser({
            uid: user.uid,
            email:user.email
            })
        
        //done loading the information
        setIsLoading(false);

    };

    //Sign out functionality
    const signOut = () => authSignOut(auth).then(clear);

    //get the current user: when called will start the listener, and when the state changes,
    //we will want to update the states accordingly.
    useEffect( () => {
        //we stop listening for events, by returning the unsubscribed function.
        const subscribe = onAuthStateChanged(auth, authStateChanged);
        return () => subscribe;

    }, []);

    return {
        authUser, 
        isLoading,
        signOut
    }
    

}

//create a Provider for the Context, where the auth function becomes the value we want to make available.
export function AuthUserProvider({children}){
    const auth = useFirebaseAuth();
    return <AuthContext.Provider  value={auth}> {children} </AuthContext.Provider>
}

//Custom hook to use the context created
export const useAuth = () => useContext(AuthContext);