import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface IconOptionProps {
  label: string;
  onClick: () => void;
}

export default function IconOption({ label, onClick }: IconOptionProps) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
