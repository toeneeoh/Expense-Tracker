// import Ionicons from '@expo/vector-icons/Ionicons';
// import { StyleSheet, Image, Platform } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import ThemedText from '@/components/ThemedText';
// import ThemedView from '@/components/ThemedView';

// export default function TabTwoScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Explore</ThemedText>
//       </ThemedView>
//       <ThemedText>Todo: This page will need to make calls to a backend and ChatGPT to retrieve customized messages for the user: daily pieces of advice/reminders as well as responses to user input. These messages will also be pushed to the user's phone as notifications. Some possible code to implement this for the front end is included in the components, in the form of javascript components.</ThemedText>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard } from 'react-native';
import ApiService from '../../utils/apiService';

export default function NotificationsScreen() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState(''); //may not be needed

  const uniqueResponses = [
    "That's a great question! Here's what I suggest...",
    "Based on what you've asked, here's my advice...",
    "Let me think about that... okay, here's my answer.",
    "Interesting! Here are my thoughts...",
    "Here’s a perspective you might find useful...",
    "Consider this approach...",
    "Here's some advice that could help you with that."
  ];

    const handleProcessText = async () => {
        try {
            const result = await ApiService.processText(inputText);
            setResponseText(result.processed_text);
        } catch (error) {
            console.error('Error processing text:', error);
        }
    };

  const sendMessage = () => {
      if (inputText.trim() === '') return;

    // Add user's message to the chat
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: inputText }]);

    // Simulate a unique ChatGPT response
    //setTimeout(() => {
    //    const botResponse = uniqueResponses[Math.floor(Math.random() * uniqueResponses.length)];
    //  setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    //}, 1000);

    // Get ChatGPT response for message
      handleProcessText()
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: responseText }]);


    // Clear the input field and dismiss the keyboard
    setInputText('');
    Keyboard.dismiss();
  };

  const renderMessage = ({ item }: { item: { sender: 'user' | 'bot'; text: string } }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chatbot</Text>
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatBox}
        contentContainerStyle={styles.chatContent}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter to chat and feel free to ask me anything regarding your finances..."
          placeholderTextColor="#888"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage} // Send message when Enter is pressed
          blurOnSubmit={false}          // Keeps the TextInput focused after sending
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#272727',
    color: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  chatBox: {
    flex: 1,
  },
  chatContent: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
    marginVertical: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0a84ff',
    borderRadius: 20,
    borderTopRightRadius: 0,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333',
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#272727',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: '#333333',
    color: '#ffffff',
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0a84ff',
    borderRadius: 25,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
