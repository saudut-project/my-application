import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../config/url';

interface AuthContextType {
    user: any;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchUserDetails: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                await fetchUserDetails();
            }
        };
        loadUser();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('authToken', token);
        await fetchUserDetails();
    };

    const logout = async () => {
        await AsyncStorage.removeItem('authToken');
        setUser(null);
    };

    const fetchUserDetails = async () => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            try {
                const response = await fetch(url + 'user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData);
                    setUser(userData);
                } else {
                    console.error('Failed to fetch user details:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error.message);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, fetchUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};