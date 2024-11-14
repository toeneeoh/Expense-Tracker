import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';
import { useUser } from '../../context/UserContext';

export default function ApiTestScreen() {
  const [username, setUsername] = useState('');  // Username input
  const [password, setPassword] = useState('');  // Password input
  const { updateUserData } = useUser(); // Access updateUserData from UserContext
  const [loginMessage, setLoginMessage] = useState('');  // Login feedback message
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [item, setItem] = useState('');  // For fetching an item
  const [itemResponse, setItemResponse] = useState('');  // Response for fetched item
  const [updateItem, setUpdateItem] = useState('');  // For item to update
  const [updateValue, setUpdateValue] = useState('');  // New value for updating item

  const userName = useUserName();

  // Login function to check if the user exists in the database
  const login = async () => {
    try {
      const result = await ApiService.checkUserCredentials(username, password);
      if (result.authenticated) {
        // Update user data in UserContext
        updateUserData({ username: username });
      }
      setLoginMessage(result.message);
    } catch (error) {
      setLoginMessage("Error logging in: " + error);
    }
  };

  // Generate message test
  const promptTest = async () => {
    try {
      const result = await ApiService.generateMessage(inputText);
      setResponseText(result.processed_text);
    } catch (error) {
      console.error('Error processing text:', error);
    }
  };

  // Fetch from database test
  const fetchData = async () => {
    if (item) {
      try {
        const result = await ApiService.getFromDatabase(item, userName);
        setItemResponse(JSON.stringify(result));
      } catch (error) {
        console.error('Error fetching item:', error)
      }
    } else {
      setItemResponse('No user data available or item not specified');
    }
  };

  // Push to database test
  const pushData = async () => {
      try {
        const result = await ApiService.pushToDatabase(updateItem, updateValue, userName);
        alert(JSON.stringify(result))
      } catch (error) {
        console.error('Error fetching item:', error)
      }
  };

return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Test</Text>

      {/* Username and Password Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      {loginMessage ? <Text style={styles.result}>{loginMessage}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Enter text to process"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send to API" onPress={promptTest} />
      {responseText ? <Text style={styles.result}>Response: {responseText}</Text> : null}

      <Text style={styles.title}>Fetch Data</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter item to fetch"
        value={item}
        onChangeText={setItem}
      />
      <Button title="Fetch Data" onPress={fetchData} />
      {itemResponse ? <Text style={styles.result}>Fetched Item: {itemResponse}</Text> : null}

      <Text style={styles.title}>Push Data</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter item to update (e.g., job)"
        value={updateItem}
        onChangeText={setUpdateItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new value"
        value={updateValue}
        onChangeText={setUpdateValue}
      />
      <Button title="Push Data" onPress={pushData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    color: 'green',
  },
});
