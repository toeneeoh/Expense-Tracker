import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    // Function to update user data (e.g., after login or profile update)
    const updateUserData = (newUserData) => {
        setUserData(newUserData);
    };

    // Function to clear user data (e.g., on logout)
    const clearUserData = () => {
        setUserData(null);
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
