import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import DropdownField from '@/components/DropdownField';
import InputField from '@/components/InputField';
import { StyleSheet } from 'react-native';

const cities = ['Washington, D.C.', 'Austin', 'Sacramento', 'Denver']; // Get more major cities
const jobTitles = ['Software Engineer', 'Finance Manager', 'Lawyer', 'Marketing Specialist'];// list other ones as well Nate

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Final Questions</ThemedText>

      <DropdownField label="What city do you live in?" options={cities} />
      <DropdownField label="What's your job title?" options={jobTitles} />
      <InputField label="Any certifications / professional skills" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});