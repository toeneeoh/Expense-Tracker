import { TextInput, View, Text, StyleSheet } from 'react-native';

interface InputFieldProps {
  label: string;
}

export default function InputField({ label }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput style={styles.input} placeholder={`Enter ${label}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
  },
});
