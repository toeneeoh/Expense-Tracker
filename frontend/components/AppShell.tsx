import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions, type TextStyle, type ViewStyle } from 'react-native';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/constants/Theme';

export function useShellStyles() {
  const { colors } = useAppTheme();
  return useMemo(() => StyleSheet.create({
    card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 20 },
    cardTitle: { color: colors.ink, fontSize: 17, fontWeight: '700' }, muted: { color: colors.muted, fontSize: 14, lineHeight: 21 },
    primary: { backgroundColor: colors.green, borderRadius: 12, minHeight: 46, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center' },
    primaryText: { color: colors.white, fontWeight: '700', fontSize: 14 },
    field: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 11, minHeight: 46, paddingHorizontal: 13, color: colors.ink },
  }) as { card: ViewStyle; cardTitle: TextStyle; muted: TextStyle; primary: ViewStyle; primaryText: TextStyle; field: TextStyle }, [colors]);
}

export function Screen({ title, eyebrow, children, action }: React.PropsWithChildren<{ title: string; eyebrow: string; action?: React.ReactNode }>) {
  const { width } = useWindowDimensions();
  const { colors, resolved, toggle } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return <ScrollView style={styles.page} contentContainerStyle={[styles.content, width < 600 && styles.contentNarrow, width >= 1100 && styles.contentWide]}>
    <View style={[styles.headingRow, width < 600 && styles.headingNarrow]}><View style={styles.heading}><Text style={styles.eyebrow}>{eyebrow}</Text><Text accessibilityRole="header" style={[styles.title, width < 600 && styles.titleNarrow]}>{title}</Text></View>
      <View style={styles.headingActions}>{action}<Pressable accessibilityRole="switch" accessibilityState={{ checked: resolved === 'dark' }} accessibilityLabel={`Use ${resolved === 'dark' ? 'light' : 'dark'} mode`} onPress={toggle} style={styles.themeToggle}><Ionicons name={resolved === 'dark' ? 'sunny-outline' : 'moon-outline'} size={19} color={colors.ink} /></Pressable></View>
    </View>{children}
  </ScrollView>;
}

export function DemoBar() {
  const { reset, busy, status, retry } = useFinance();
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const connected = status === 'ready';
  return <View style={styles.demoBar}><View style={styles.demoLabel}><View style={[styles.dot, !connected && styles.dotWaking]} /><View style={styles.demoCopy}><Text style={styles.demoText}>Fictional demo data</Text><Text style={styles.connectionText}>{connected ? 'Interactive demo connected' : status === 'connecting' ? 'Connecting to the interactive demo…' : 'Read-only preview · service asleep'}</Text></View></View>
    {status === 'offline' ? <Pressable onPress={() => void retry()} style={styles.reset}><Ionicons name="cloud-upload-outline" size={15} color={colors.green} /><Text style={styles.resetText}>Reconnect</Text></Pressable> : <Pressable accessibilityRole="button" accessibilityLabel="Reset demo data" disabled={busy || !connected} onPress={() => void reset()} style={({ pressed }) => [styles.reset, pressed && styles.pressed, !connected && styles.disabled]}><Ionicons name="refresh" size={15} color={colors.green} /><Text style={styles.resetText}>Reset demo</Text></Pressable>}
  </View>;
}

export function AppGate({ children }: React.PropsWithChildren) { return <>{children}</>; }
export function ErrorBanner() {
  const { error } = useFinance();
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return error ? <View style={styles.errorBanner}><Ionicons name="alert-circle-outline" size={18} color={colors.red} /><Text style={styles.errorText}>{error}</Text></View> : null;
}

function makeStyles(theme: AppTheme) { return StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.background }, content: { padding: 22, paddingBottom: 110, gap: 18, maxWidth: 1280, width: '100%', alignSelf: 'center' }, contentNarrow: { padding: 16 }, contentWide: { padding: 42 },
  headingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 4 }, headingNarrow: { alignItems: 'flex-start', flexWrap: 'wrap' }, heading: { flex: 1, minWidth: 0 }, headingActions: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 0 }, eyebrow: { color: theme.green, fontSize: 12, letterSpacing: 1.2, fontWeight: '800', textTransform: 'uppercase', marginBottom: 7 }, title: { color: theme.ink, fontSize: 32, fontWeight: '800', letterSpacing: -.8 }, titleNarrow: { fontSize: 28 }, themeToggle: { width: 46, height: 46, borderRadius: 14, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface, alignItems: 'center', justifyContent: 'center' },
  demoBar: { minHeight: 60, backgroundColor: theme.greenSoft, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 8, gap: 8, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }, demoLabel: { flex: 1, minWidth: 190, flexDirection: 'row', alignItems: 'center', gap: 9 }, demoCopy: { flex: 1, minWidth: 0 }, dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.green }, dotWaking: { backgroundColor: theme.gold }, demoText: { color: theme.ink, fontWeight: '600', fontSize: 13 }, connectionText: { color: theme.muted, fontSize: 11, marginTop: 2 }, reset: { flexDirection: 'row', flexShrink: 0, gap: 5, padding: 8, alignItems: 'center' }, resetText: { color: theme.green, fontWeight: '700', fontSize: 13 }, pressed: { opacity: .65 }, disabled: { opacity: .45 },
  errorBanner: { flexDirection: 'row', gap: 9, backgroundColor: theme.redSoft, padding: 13, borderRadius: 11, alignItems: 'center' }, errorText: { color: theme.red, fontWeight: '600', flex: 1 },
}); }
