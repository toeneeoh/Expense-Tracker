import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { DemoBar, ErrorBanner, Screen, useShellStyles } from '@/components/AppShell';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/constants/Theme';
import { useFinance } from '@/context/FinanceContext';

export default function Insights() {
  const { colors: theme } = useAppTheme();
  const shellStyles = useShellStyles();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { insights, refreshInsights, busy } = useFinance();
  const { width } = useWindowDimensions();
  useEffect(() => { if (!insights) void refreshInsights(); }, [insights, refreshInsights]);
  return <Screen eyebrow="Smart guidance" title="Your next best moves" action={<Pressable disabled={busy} onPress={() => void refreshInsights()} style={shellStyles.primary}><Text style={shellStyles.primaryText}>{busy ? 'Refreshing…' : 'Refresh insights'}</Text></Pressable>}>
    <DemoBar /><ErrorBanner />
    <View style={styles.intro}><View style={styles.spark}><Ionicons name="sparkles" color={theme.green} size={22} /></View><View style={styles.introText}><Text style={styles.introTitle}>Practical guidance, grounded in your numbers</Text><Text style={shellStyles.muted}>Recommendations use transparent budgeting rules and may be refined by AI when available.</Text></View>{insights && <View style={styles.source}><Text style={styles.sourceText}>{insights.source === 'ai' ? 'AI enhanced' : 'Rules based'}</Text></View>}</View>
    {busy && !insights ? <View style={styles.loading}><ActivityIndicator color={theme.green} /><Text style={shellStyles.muted}>Looking for useful patterns…</Text></View> : <View style={[styles.grid, width < 900 && styles.stack]}>{insights?.insights.map((item, index) => <View key={`${item.title}-${index}`} style={[shellStyles.card, styles.card]}><View style={styles.cardTop}><Text style={styles.number}>0{index + 1}</Text><View style={[styles.priority, item.priority === 'high' && styles.high]}><Text style={[styles.priorityText, item.priority === 'high' && styles.highText]}>{item.priority}</Text></View></View><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.observation}>{item.observation}</Text><View style={styles.divider} /><Text style={styles.label}>Suggested action</Text><Text style={styles.action}>{item.action}</Text><View style={styles.impact}><Ionicons name="trending-up-outline" size={17} color={theme.green} /><Text style={styles.impactText}>{item.impact}</Text></View></View>)}</View>}
    {insights && <Text style={styles.disclaimer}>{insights.disclaimer}</Text>}
  </Screen>;
}
function makeStyles(theme: AppTheme) { return StyleSheet.create<any>({
  intro: { backgroundColor: theme.greenSoft, borderRadius: 17, padding: 18, flexDirection: 'row', gap: 13, alignItems: 'center', flexWrap: 'wrap' }, spark: { width: 43, height: 43, borderRadius: 13, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }, introText: { flex: 1, minWidth: 220 }, introTitle: { color: theme.ink, fontSize: 17, fontWeight: '800', marginBottom: 4 }, source: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 11, paddingVertical: 7 }, sourceText: { color: theme.green, fontWeight: '750', fontSize: 12 }, grid: { flexDirection: 'row', gap: 15, alignItems: 'stretch' }, stack: { flexDirection: 'column' }, card: { flex: 1, minWidth: 220 }, cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, number: { color: theme.green, fontWeight: '800', fontSize: 12, letterSpacing: 1 }, priority: { backgroundColor: theme.surfaceMuted, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5 }, high: { backgroundColor: theme.redSoft }, priorityText: { color: theme.muted, fontWeight: '750', fontSize: 10, textTransform: 'uppercase' }, highText: { color: theme.red }, cardTitle: { color: theme.ink, fontSize: 20, lineHeight: 25, fontWeight: '800', marginTop: 24, marginBottom: 9 }, observation: { color: theme.muted, lineHeight: 21, minHeight: 63 }, divider: { height: 1, backgroundColor: theme.border, marginVertical: 18 }, label: { color: theme.green, textTransform: 'uppercase', letterSpacing: .8, fontSize: 10, fontWeight: '800', marginBottom: 7 }, action: { color: theme.ink, lineHeight: 21, fontWeight: '550', flex: 1 }, impact: { backgroundColor: theme.greenSoft, borderRadius: 11, padding: 11, flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 18 }, impactText: { color: theme.green, fontWeight: '700', fontSize: 12, flex: 1 }, loading: { minHeight: 260, alignItems: 'center', justifyContent: 'center', gap: 12 }, disclaimer: { color: theme.muted, fontSize: 12, textAlign: 'center', marginTop: 3 },
}) as any; }
