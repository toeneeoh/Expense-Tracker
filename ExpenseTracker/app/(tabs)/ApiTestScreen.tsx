import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import ApiService from '../../utils/apiService';
import { useUser } from '../../context/UserContext';

export default function ApiTestScreen() {
  const { userData, updateUserData } = useUser(); // Access userData and updateUserData directly from UserContext
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [item, setItem] = useState('');  // For fetching an item
  const [itemResponse, setItemResponse] = useState('');  // Response for fetched item
  const [updateItem, setUpdateItem] = useState('');  // For item to update
  const [updateValue, setUpdateValue] = useState('');  // New value for updating item

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
    if (userData && item) {
      try {
        const result = await ApiService.getFromDatabase(item);
        setItemResponse(JSON.stringify(result));
      } catch (error) {
        console.error('Error fetching item:', error)
      }
    } else {
      setItemResponse('No user data available or item not specified');
    }
  };

  // Function to update a specific item in userData
  const handleUpdateUserData = () => {
    if (updateItem && updateValue) {
      updateUserData({ ...userData, [updateItem]: updateValue });
      alert(`Updated ${updateItem} to "${updateValue}"`);
    } else {
      alert('Please specify both the item and value to update.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text to process"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send to API" onPress={promptTest} />
      {responseText ? <Text style={styles.result}>Response: {responseText}</Text> : null}

      <Text style={styles.title}>Fetch Item from User Data</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter item to fetch"
        value={item}
        onChangeText={setItem}
      />
      <Button title="Fetch Data" onPress={fetchData} />
      {itemResponse ? <Text style={styles.result}>Fetched Item: {itemResponse}</Text> : null}

      <Text style={styles.title}>Update User Data</Text>

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
      <Button title="Update Data" onPress={handleUpdateUserData} />
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