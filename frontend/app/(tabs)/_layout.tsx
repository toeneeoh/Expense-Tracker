import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useMemo } from 'react';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/constants/Theme';
import { AppGate } from '@/components/AppShell';

const icons = { index: 'grid-outline', transactions: 'swap-horizontal-outline', insights: 'sparkles-outline' } as const;
export default function TabLayout() {
  const { colors: theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { width } = useWindowDimensions();
  const desktop = width >= 850;
  return <AppGate><Tabs screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: theme.green, tabBarInactiveTintColor: theme.muted,
    tabBarPosition: desktop ? 'left' : 'bottom',
    tabBarLabelPosition: desktop ? 'beside-icon' : 'below-icon',
    tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name as keyof typeof icons] ?? 'ellipse-outline'} size={size} color={color} />,
    tabBarStyle: desktop ? styles.sidebar : styles.bottom,
    tabBarItemStyle: desktop ? styles.sidebarItem : styles.bottomItem,
    tabBarIconStyle: desktop ? styles.sidebarIcon : undefined,
    tabBarLabelStyle: [styles.label, desktop && styles.sidebarLabel],
  })}>
    <Tabs.Screen name="index" options={{ title: 'Overview' }} />
    <Tabs.Screen name="transactions" options={{ title: 'Transactions' }} />
    <Tabs.Screen name="insights" options={{ title: 'Insights' }} />
  </Tabs></AppGate>;
}
function makeStyles(theme: AppTheme) { return StyleSheet.create({
  sidebar: { width: 224, paddingTop: 36, paddingHorizontal: 14, borderRightWidth: 1, borderTopWidth: 0, borderRightColor: theme.border, backgroundColor: theme.surface },
  sidebarItem: { width: '100%', minHeight: 54, maxHeight: 54, paddingHorizontal: 14, borderRadius: 12 },
  sidebarIcon: { width: 26, marginRight: 10 },
  sidebarLabel: { flex: 1, fontSize: 14, textAlign: 'left' },
  bottom: { height: 74, paddingBottom: 9, paddingTop: 8, backgroundColor: theme.surface, borderTopColor: theme.border }, bottomItem: { borderRadius: 10 }, label: { fontSize: 12, fontWeight: '700' },
}); }
