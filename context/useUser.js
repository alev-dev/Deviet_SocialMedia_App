import axios from "axios";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";
import { socket } from "../services/socket";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    getUser((param) => {
      socket.emit("login", param);
    });
    return () => {
      socket.close();
      socket.disconnect();
    };
  }, []);

  const getUser = async (callback) => {
    const idToken = localStorage.getItem("token");
    if (idToken) {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
        {
          idToken,
        }
      );
      const { name, email, picture, sub } = data;
      if (name) {
        setUser({ name, email, picture, id: sub });

        callback({ name, email, picture, id: sub });
      } else {
        setUser(null);
        localStorage.removeItem("token");
        router.replace("/");
      }
    } else {
      setUser(null);
      router.replace("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, getUser, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
