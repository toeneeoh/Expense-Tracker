import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
    height: 40,
    width: '100%',
  },
});
