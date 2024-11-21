import { View, Text, Picker, StyleSheet } from 'react-native';

interface DropdownFieldProps {
  label: string;
  options: string[];
}

export default function DropdownField({ label, options }: DropdownFieldProps) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Picker>
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
