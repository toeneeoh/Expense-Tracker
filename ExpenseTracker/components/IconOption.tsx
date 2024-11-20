import { Pressable, Text, StyleSheet } from 'react-native';

interface IconOptionProps {
  label: string;
  onClick: () => void;
}

export default function IconOption({ label, onClick }: IconOptionProps) {
  return (
    <Pressable onPress={onClick} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
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
