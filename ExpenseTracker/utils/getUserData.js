import { useUser } from '../context/UserContext';

// Hook to get the current user data
export const useUserData = () => {
    const { userData } = useUser();
    return userData;
};

// Hook to get the current user's name
export const useUserName = () => {
    const { userData } = useUser();
    return userData ? userData.username : null;
};
