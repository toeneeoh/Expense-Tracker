import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import ApiService from '../../utils/apiService';

export default function ApiTestScreen() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleProcessText = async () => {
    try {
      const result = await ApiService.processText(inputText);
      setResponseText(result.processed_text);
    } catch (error) {
      console.error('Error processing text:', error);
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
      <Button title="Send to API" onPress={handleProcessText} />
      {responseText ? <Text style={styles.result}>Response: {responseText}</Text> : null}
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
