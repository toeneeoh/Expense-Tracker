import React, { useState } from 'react';
import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import DropdownField from '@/components/DropdownField';
import InputField from '@/components/InputField';
import { TextInput, StyleSheet } from 'react-native';
import ApiService from '../../utils/apiService';
import { useUserName } from '../../utils/getUserData';
import { useUser } from '../../context/UserContext';
import { useNavigation } from 'expo-router';


const cities = ['Washington, D.C.', 'Fairfax', 'Arlington'];

export default function ProfileScreen() {
    const navigation = useNavigation() as any;
    const [cityName, setCityName] = useState('');
    const [address, setAddress] = useState('');
    const [roommatesNum, setRoommatesNum] = useState('');
    const [dependentsNum, setDependentsNum] = useState('');
    const [bedroomsNum, setBedroomsNum] = useState('');

    const userName = useUserName();

    const handleSubmit = async () => {
        try {
            var result = await ApiService.pushToDatabase("city_name", cityName, userName, "users");
            result = await ApiService.pushToDatabase("address", address, userName, "users");
            result = await ApiService.pushToDatabase("roommates_num", roommatesNum, userName, "users");
            result = await ApiService.pushToDatabase("dependents_num", dependentsNum, userName, "users");
            result = await ApiService.pushToDatabase("bedrooms_num", bedroomsNum, userName, "users");
            navigation.navigate('ProfileScreen');
        } catch (error) {
            console.error('Error pushing item:', error);
        }
    };

  return (
    <ThemedView style={styles.container}>

      <ThemedText type="title">Location Data</ThemedText>

          <ThemedText>
              What NOVA city do you live in? Arlington, Fairfax, and Washington D.C. are your options!
          </ThemedText>
          <TextInput
              style={styles.input}
              placeholder=""
              value={cityName}
              onChangeText={setCityName}
          />

          <ThemedText>
              What's your current address?
          </ThemedText>
          <TextInput
              style={styles.input}
              placeholder=""
              value={address}
              onChangeText={setAddress}
          />

          <ThemedText>
              How many financially independent roommates do you live with?
          </ThemedText>
          <TextInput
              style={styles.input}
              placeholder=""
              value={roommatesNum}
              onChangeText={setRoommatesNum}
          />

          <ThemedText>
              How many financially dependent people (i.e. children) do you live with?
          </ThemedText>
          <TextInput
              style={styles.input}
              placeholder=""
              value={dependentsNum}
              onChangeText={setDependentsNum}
          />

          <ThemedText>
              How many bedrooms do you need in your home?
          </ThemedText>
          <TextInput
              style={styles.input}
              placeholder=""
              value={bedroomsNum}
              onChangeText={setBedroomsNum}
          />
          <ThemedText onPress={handleSubmit} style={styles.linkText}>
              Next
          </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    linkText: {
        color: '#007AFF',
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginTop: 16,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginBottom: 16,
    },
  container: {
    margin: 16,
  },
});