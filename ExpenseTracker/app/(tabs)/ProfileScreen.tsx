import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import DropdownField from '@/components/DropdownField';
import InputField from '@/components/InputField';
import { StyleSheet, View } from 'react-native';


const cities = ['Washington, D.C.', 'Fairfax', 'Arlington', 'Austin', 'Sacramento', 'Denver']; // Get more major cities

export default function ProfileScreen() {
  return (
    <View style={styles.container}>

      <ThemedText type="title" style={styles.title}>Location Data</ThemedText>

          <DropdownField label="What city do you live in?" options={cities} />
          <DropdownField label="What state do you live in?" options={cities} />
          <InputField label="What's your current address?" />
          <InputField label="How many financially independent roommates do you live with?" />
          <InputField label="How many financially dependent (i.e. children) do you live with?" />
          <InputField label="How many bedrooms do you need in your home?" />
      {/*<InputField label="Any certifications / professional skills" />*/}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    color: '#000000',
  },
});