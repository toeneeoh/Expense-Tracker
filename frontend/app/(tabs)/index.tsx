import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { DemoBar, ErrorBanner, Screen, useShellStyles } from '@/components/AppShell';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/constants/Theme';
import { useFinance } from '@/context/FinanceContext';
import { currency, shortDate } from '@/utils/format';

export default function Overview() {
  const { colors: theme } = useAppTheme();
  const shellStyles = useShellStyles();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { dashboard, updateGoal, busy } = useFinance();
  const { width } = useWindowDimensions();
  const [editing, setEditing] = useState(false);
  const [goal, setGoal] = useState('');
  if (!dashboard) return null;
  const { summary } = dashboard;
  const health = summary.balance >= 0 ? `You kept ${summary.savingsRate}% of recorded income this month.` : `Expenses are ${currency.format(Math.abs(summary.balance))} above income.`;
  const submitGoal = async () => { const value = Number(goal); if (value >= 100) { await updateGoal(value); setEditing(false); } };
  return <Screen eyebrow="Monthly snapshot" title="Financial overview">
    <DemoBar /><ErrorBanner />
    <View style={[styles.metrics, width < 700 && styles.stack]}>
      <Metric label="Available balance" value={currency.format(summary.balance)} icon="wallet-outline" accent />
      <Metric label="Income" value={currency.format(summary.income)} icon="arrow-down-outline" />
      <Metric label="Spending" value={currency.format(summary.expenses)} icon="arrow-up-outline" />
    </View>
    <View style={[styles.columns, width < 900 && styles.stack]}>
      <View style={styles.mainColumn}>
        <View style={shellStyles.card}><Text style={styles.overline}>Financial health</Text><Text style={styles.health}>{health}</Text><Text style={shellStyles.muted}>A positive monthly margin gives your goals room to grow. Keep categorizing consistently to make the signal more useful.</Text></View>
        <View style={shellStyles.card}><View style={styles.cardHeader}><View><Text style={shellStyles.cardTitle}>Spending by category</Text><Text style={shellStyles.muted}>Where this month’s money went</Text></View></View>
          {dashboard.categories.length ? dashboard.categories.map((item, index) => <View key={item.name} style={styles.categoryRow}><View style={[styles.categoryIcon, { backgroundColor: index % 2 ? theme.categoryAlt : theme.greenSoft }]}><Text style={styles.categoryLetter}>{item.name[0]}</Text></View><View style={styles.categoryContent}><View style={styles.rowBetween}><Text style={styles.categoryName}>{item.name}</Text><Text style={styles.categoryAmount}>{currency.format(item.amount)}</Text></View><View style={styles.track}><View style={[styles.fill, { width: `${Math.min(item.amount / Math.max(summary.expenses, 1) * 100, 100)}%` }]} /></View></View></View>) : <Text style={shellStyles.muted}>Add an expense to see a category breakdown.</Text>}
        </View>
      </View>
      <View style={styles.sideColumn}>
        <View style={shellStyles.card}><View style={styles.rowBetween}><View><Text style={shellStyles.cardTitle}>Savings goal</Text><Text style={shellStyles.muted}>{currency.format(dashboard.goal.current)} saved</Text></View><Pressable onPress={() => { setGoal(String(dashboard.goal.target)); setEditing(!editing); }}><Text style={styles.edit}>Edit</Text></Pressable></View>
          <View style={styles.goalRing}><Text style={styles.goalPercent}>{dashboard.goal.progress}%</Text><Text style={styles.goalCaption}>of {currency.format(dashboard.goal.target)}</Text></View>
          {editing && <View style={styles.goalForm}><TextInput accessibilityLabel="Savings goal" keyboardType="numeric" value={goal} onChangeText={setGoal} style={[shellStyles.field, styles.grow]} /><Pressable disabled={busy} onPress={() => void submitGoal()} style={shellStyles.primary}><Text style={shellStyles.primaryText}>Save</Text></Pressable></View>}
        </View>
        <View style={shellStyles.card}><Text style={shellStyles.cardTitle}>Recent activity</Text>{dashboard.transactions.slice(0, 5).map((item) => <View key={item.id} style={styles.transaction}><View><Text style={styles.transactionName}>{item.description}</Text><Text style={styles.transactionMeta}>{item.category} · {shortDate(item.occurred_on)}</Text></View><Text style={[styles.transactionAmount, item.type === 'income' && styles.income]}>{item.type === 'expense' ? '−' : '+'}{currency.format(item.amount)}</Text></View>)}</View>
      </View>
    </View>
  </Screen>;
}

function Metric({ label, value, icon, accent = false }: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap; accent?: boolean }) {
  const { colors: theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return <View style={[styles.metric, accent && styles.metricAccent]}><View style={[styles.metricIcon, accent && styles.metricIconAccent]}><Ionicons name={icon} size={20} color={accent ? '#fff' : theme.green} /></View><Text style={[styles.metricLabel, accent && styles.light]}>{label}</Text><Text style={[styles.metricValue, accent && styles.light]}>{value}</Text></View>;
}
function makeStyles(theme: AppTheme) { return StyleSheet.create<any>({
  metrics: { flexDirection: 'row', gap: 14 }, stack: { flexDirection: 'column' }, metric: { flex: 1, minWidth: 180, backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 18, padding: 19 }, metricAccent: { backgroundColor: theme.accentSurface }, metricIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: theme.greenSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }, metricIconAccent: { backgroundColor: theme.green }, metricLabel: { color: theme.muted, fontWeight: '600', marginBottom: 5 }, metricValue: { color: theme.ink, fontWeight: '800', fontSize: 28 }, light: { color: theme.white },
  columns: { flexDirection: 'row', gap: 18, alignItems: 'flex-start' }, mainColumn: { flex: 1.55, gap: 18 }, sideColumn: { flex: 1, gap: 18 }, overline: { color: theme.green, textTransform: 'uppercase', letterSpacing: 1, fontSize: 11, fontWeight: '800' }, health: { color: theme.ink, fontWeight: '800', fontSize: 23, marginVertical: 10, lineHeight: 30 }, cardHeader: { marginBottom: 18 }, rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }, categoryRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 15 }, categoryIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }, categoryLetter: { color: theme.ink, fontWeight: '800' }, categoryContent: { flex: 1 }, categoryName: { color: theme.ink, fontWeight: '650' }, categoryAmount: { color: theme.ink, fontWeight: '750' }, track: { backgroundColor: theme.surfaceMuted, height: 5, borderRadius: 4, marginTop: 8, overflow: 'hidden' }, fill: { backgroundColor: theme.green, height: 5, borderRadius: 4 },
  edit: { color: theme.green, fontWeight: '750' }, goalRing: { width: 160, height: 160, borderRadius: 80, borderWidth: 13, borderColor: theme.greenSoft, borderTopColor: theme.green, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginVertical: 22 }, goalPercent: { color: theme.ink, fontWeight: '800', fontSize: 29 }, goalCaption: { color: theme.muted, fontSize: 12 }, goalForm: { flexDirection: 'row', gap: 8 }, grow: { flex: 1 }, transaction: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, paddingVertical: 13, borderBottomColor: theme.border, borderBottomWidth: StyleSheet.hairlineWidth }, transactionName: { color: theme.ink, fontWeight: '700', marginBottom: 3 }, transactionMeta: { color: theme.muted, fontSize: 12 }, transactionAmount: { color: theme.red, fontWeight: '750' }, income: { color: theme.green },
}) as any; }
