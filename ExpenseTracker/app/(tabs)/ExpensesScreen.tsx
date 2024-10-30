import { useNavigation } from 'expo-router';
import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import InputField from '@/components/InputField';
import { StyleSheet } from 'react-native';

export default function ExpensesScreen() {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('ProfileScreen');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Give us some information to work with</ThemedText>

      <InputField label="Monthly Salary" />
      <InputField label="Monthly Rent" />
      <InputField label="Car Expenses" />
      <InputField label="Utility Payments" />
      <InputField label="Other Expenses" />

      <ThemedText onPress={handleSubmit} style={styles.linkText}>
        Next
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 16,
  },
});