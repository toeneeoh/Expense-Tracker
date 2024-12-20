import { useNavigation } from 'expo-router';
import React, { useState } from 'react';

import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { TouchableOpacity, TextInput, Platform, Image, StyleSheet, Pressable, View } from 'react-native';
import { useUser } from '../../context/UserContext';

import ApiService from '../../utils/apiService';

export default function WelcomeScreen() {
    const [inputText, setInputText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const navigation = useNavigation() as any;
    const { updateUserData } = useUser(); // Access updateUserData from UserContext

    const handleGetStarted = () => {
        navigation.navigate('GoalsScreen');

    };

    const handleLogin = async () => {
        //const password = "1234"; // TODO: Add a password input

        console.log("Attempting to login as: " + inputText);

        try {
            console.log("Username:" + inputText)
            console.log("Password:" + passwordText)

            const result = await ApiService.checkUserCredentials(inputText, passwordText);

            if (result.authenticated) {
                // Update user data in UserContext
                updateUserData({ username: inputText });
                navigation.navigate('settings');
            } else {
                alert("Invalid username or password! Please try again!");
            }
        } catch (error) {
            console.log("Login error: " + error);
        }
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/img.png')}
                    style={styles.reactLogo}
                />
                <ThemedText type="title" style={styles.titleText}>Welcome to Budget Buddy!</ThemedText>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleGetStarted} style={styles.signUpButton}>
                    <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
                </TouchableOpacity>
                
                <Pressable onPress={handleLogin} style={styles.loginButton}>
                    <ThemedText style={styles.buttonText}>Log In</ThemedText>
                </Pressable>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter username here..."
                placeholderTextColor="#888"
                value={inputText}
                onChangeText={setInputText}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter password here..."
                placeholderTextColor="#888"
                value={passwordText}
                onChangeText={setPasswordText}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'linear-gradient(135deg, #f8f8f8, #eaeaea)',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    reactLogo: {
        height: 150,
        width: 150,
        marginBottom: 16,
    },
    titleText: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    signUpButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
        ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        default: {
            "--opacity": "0.3",
            boxShadow: "0 4px 8px rgba(0, 0, 0, var(--opacity))"
        },
        })
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
        },
        default: {
            "--opacity": "0.3",
            boxShadow: "0 4px 8px rgba(0, 0, 0, var(--opacity))"
        },
        })
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    input: {
        marginTop: 20,
        width: '80%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
        ...Platform.select({
        ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 2,
        },
        default: {
            "--opacity": "0.1",
            boxShadow: "0 4px 6px rgba(0, 0, 0, var(--opacity))"
        },
        })
    },
});

