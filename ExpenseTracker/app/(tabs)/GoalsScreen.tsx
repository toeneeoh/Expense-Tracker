import { useNavigation } from 'expo-router';
import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import IconOption from '@/components/IconOption';
import { StyleSheet, View } from 'react-native';

export default function GoalsScreen() {
  const navigation = useNavigation() as any;

  const handleGoalSelect = () => {
    navigation.navigate('ExpensesScreen');
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Tell us about your financial goals</ThemedText>

      <IconOption label="I want to get out of debt" onClick={handleGoalSelect} />
      <IconOption label="I want to build a savings" onClick={handleGoalSelect} />
      <IconOption label="I want to be prepared for retirement" onClick={handleGoalSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    color: '#ffffff',
  },
  title: {
    margin: 16,
    flex: 1,
    color: '#000000',
  },
});