import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileInfo = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    setUserInfo(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const jwtRes = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          if (jwtRes.data?.token) {
            localStorage.setItem("access-token", jwtRes.data.token);
          }

          const userRes = await axiosSecure.get(
            `/user?email=${currentUser.email}`
          );
          setUserInfo(userRes.data);
        } catch (err) {
          console.error("Error syncing auth session:", err);
        }
      } else {
        localStorage.removeItem("access-token");
        setUserInfo(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic, axiosSecure]);

  const authInfo = {
    user,
    loading,
    createUser,
    updateProfileInfo,
    userInfo,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
