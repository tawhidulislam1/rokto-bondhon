/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.init";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import useAxosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app);
export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    const updateUser = (name, PhotoUrl) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: PhotoUrl,
        });
    };

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {

            if (currentUser) {
                const email = currentUser.email;
                console.log('email', email);
                axiosPublic.post('/jwt', { email })
                    .then(res => {
                        if (res.data.token) {
                            setUser(currentUser);
                            localStorage.setItem("access-token", res.data.token);
                            setLoading(false);
                        }
                    });

            }
            else {
                localStorage.removeItem("access-token");
                setUser(null);
                setLoading(false);
            }

            console.log("current user ", currentUser);
        });
        return () => {
            return () => unsubcribe();
        };
    }, [axiosPublic]);

    const AuthInfo = {
        user,
        loading,
        createUser,
        logIn,
        logOut,
        updateUser
    };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;