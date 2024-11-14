import { useNavigation } from 'expo-router';
import React, { useState } from 'react';

import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { TextInput, Image, StyleSheet } from 'react-native';

import ApiService from '../../utils/apiService';

var activeUsername;


export default function WelcomeScreen() {
    const [inputText, setInputText] = useState('');
  const navigation = useNavigation() as any;

  const handleGetStarted = () => {
    navigation.navigate('GoalsScreen');
    };

    const handleLogin = () => {
        console.log("Attempting to login as:" + inputText);

        ApiService.loginAttempt(inputText).then(x => {
            console.log("ApiService response:" + x);
            if (x === "-1") {
                //TODO: return error, user not found
                navigation.navigate('settings');
            }
            else {
                navigation.navigate('home');
            }
        });
    };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
      <ThemedText type="title">Welcome to the Expense Tracker</ThemedText>
      <ThemedText onPress={handleGetStarted} style={styles.linkText}>
        Sign Up with Email
      </ThemedText>
          <ThemedText onPress={handleLogin} style={styles.linkText}>
              Log In
          </ThemedText>
          <TextInput
              style={styles.input}
              placeholder="Enter username here..."
              value={inputText}
              onChangeText={setInputText}
          />
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 16,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 16,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
    }
});
