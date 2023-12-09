
import React, { createContext, useContext, useState , useEffect } from "react";

// Buat konteks
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState({});

  const login = () => {
    // Anda dapat menentukan logika login di sini
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Anda dapat menentukan logika logout di sini
    setIsLoggedIn(false);
  };
  
  useEffect(() => {
    const savedStatus = localStorage.getItem('status');
    if (savedStatus) {
      setStatus(JSON.parse(savedStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(status));
  }, [status]);

  const updateStatus = (pertemuan, newStatus) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [pertemuan]: newStatus,
    }));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout , status, updateStatus}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
