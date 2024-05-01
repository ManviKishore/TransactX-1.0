import React, { createContext, useState } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
 
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole ? storedRole : null;
  });



  const updateUserAndRole = (userData, userRole) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setRole(userRole);
    localStorage.setItem('role', userRole);
    setIsLoggedIn(true);
    console.log(userData, userRole);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    setRole(null);
    setIsLoggedIn(false);
    
  };

  return (
    <UserContext.Provider value={{ user, role, updateUserAndRole, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
