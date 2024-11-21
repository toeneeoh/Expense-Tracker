// import { useNavigation } from 'expo-router';
// import React, { useState } from 'react';

// import { ThemedView, ThemedText } from '@/components/ThemedComponents';
// import { TextInput, Image, StyleSheet } from 'react-native';

// import ApiService from '../../utils/apiService';

// var activeUsername;


// export default function WelcomeScreen() {
//     const [inputText, setInputText] = useState('');
//   const navigation = useNavigation() as any;

//   const handleGetStarted = () => {
//     navigation.navigate('GoalsScreen');
//     };

//     const handleLogin = () => {
//         console.log("Attempting to login as:" + inputText);

//         ApiService.loginAttempt(inputText).then(x => {
//             console.log("ApiService response:" + x);
//             if (x === "-1") {
//                 //TODO: return error, user not found
//                 navigation.navigate('settings');
//             }
//             else {
//                 navigation.navigate('home');
//             }
//         });
//     };

//   return (
//     <ThemedView style={styles.container}>
//       <Image
//         source={require('@/assets/images/partial-react-logo.png')}
//         style={styles.reactLogo}
//       />
//       <ThemedText type="title">Welcome to the Expense Tracker</ThemedText>
//       <ThemedText onPress={handleGetStarted} style={styles.linkText}>
//         Sign Up with Email
//       </ThemedText>
//           <ThemedText onPress={handleLogin} style={styles.linkText}>
//               Log In
//           </ThemedText>
//           <TextInput
//               style={styles.input}
//               placeholder="Enter username here..."
//               value={inputText}
//               onChangeText={setInputText}
//           />
//       </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     margin: 16,
//     alignItems: 'center',
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     marginBottom: 16,
//   },
//   linkText: {
//     color: '#007AFF',
//     textDecorationLine: 'underline',
//     marginTop: 16,
//     },
//     input: {
//         borderColor: '#ccc',
//         borderWidth: 1,
//         padding: 8,
//         marginBottom: 16,
//     }
// });

import { useNavigation } from 'expo-router';
import React, { useState } from 'react';

import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { TextInput, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../context/UserContext';

import ApiService from '../../utils/apiService';

export default function WelcomeScreen() {
    const [inputText, setInputText] = useState('');
    const navigation = useNavigation() as any;
    const { updateUserData } = useUser(); // Access updateUserData from UserContext

    const handleGetStarted = () => {
        navigation.navigate('GoalsScreen');
    };

    const handleLogin = async () => {
        const password = "1234"; // TODO: Add a password input

        console.log("Attempting to login as: " + inputText);

        try {
            const result = await ApiService.checkUserCredentials(inputText, password);

            if (result.authenticated) {
                // Update user data in UserContext
                updateUserData({ username: inputText });
                navigation.navigate('settings');
            } else {
                navigation.navigate('home');
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
                    <ThemedText style={styles.buttonText}>Sign Up with Email</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <ThemedText style={styles.buttonText}>Log In</ThemedText>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter username here..."
                placeholderTextColor="#888"
                value={inputText}
                onChangeText={setInputText}
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
});

