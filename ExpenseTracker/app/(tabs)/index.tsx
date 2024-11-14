import { useNavigation } from 'expo-router';

import { ThemedView, ThemedText } from '@/components/ThemedComponents';
import { Image, StyleSheet } from 'react-native';

export default function WelcomeScreen() {
  const navigation = useNavigation() as any;

  const handleGetStarted = () => {
    navigation.navigate('GoalsScreen');
    };

    const handleLogin = () => {
        navigation.navigate('home');
    };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
      <ThemedText type="title">Welcome to the Expense Tracker</ThemedText>
      <ThemedText onPress={handleGetStarted} style={styles.linkText}>
        Sign Up with Email
      </ThemedText>
          <ThemedText onPress={handleLogin} style={styles.linkText}>
              Log In
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
