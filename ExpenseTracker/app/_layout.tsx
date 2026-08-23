import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FinanceProvider } from '@/context/FinanceContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout() {
  return <ThemeProvider><FinanceProvider><StatusBar style="auto" /><Stack screenOptions={{ headerShown: false }} /></FinanceProvider></ThemeProvider>;
}
