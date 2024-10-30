import { useNavigation } from 'expo-router';

import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { Image, StyleSheet } from 'react-native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('GoalsScreen');
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
      <ThemedText type="title">Welcome to the Expense Tracker</ThemedText>
      <ThemedText onPress={handleGetStarted} style={styles.linkText}>
        Get Started
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 16,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});
