import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { DemoBar, ErrorBanner, Screen, useShellStyles } from '@/components/AppShell';
import { useAppTheme } from '@/context/ThemeContext';
import type { AppTheme } from '@/constants/Theme';
import { useFinance } from '@/context/FinanceContext';
import type { TransactionType } from '@/types/finance';
import { currency, shortDate } from '@/utils/format';

const categoryMap = { income: ['Salary', 'Freelance', 'Interest', 'Other income'], expense: ['Housing', 'Food', 'Transport', 'Utilities', 'Subscriptions', 'Shopping', 'Wellness', 'Other'] };
export default function Transactions() {
  const { colors: theme } = useAppTheme();
  const shellStyles = useShellStyles();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { dashboard, addTransaction, deleteTransaction, busy } = useFinance();
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState<'all' | TransactionType>('all');
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('Housing');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notice, setNotice] = useState('');
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const rows = useMemo(() => dashboard?.transactions.filter((item) => filter === 'all' || item.type === filter) ?? [], [dashboard, filter]);
  if (!dashboard) return null;
  const chooseType = (value: TransactionType) => { setType(value); setCategory(categoryMap[value][0]); };
  const submit = async () => {
    const numeric = Number(amount);
    if (!description.trim() || !Number.isFinite(numeric) || numeric <= 0) { setFormError('Enter a description and an amount greater than zero.'); return; }
    try { await addTransaction({ type, category, description: description.trim(), amount: numeric, occurredOn: date }); setDescription(''); setAmount(''); setFormError(''); setShowForm(false); setNotice('Transaction added. Your dashboard has been updated.'); }
    catch { return; }
  };
  return <Screen eyebrow="Cash flow" title="Transactions" action={<Pressable accessibilityRole="button" accessibilityLabel={showForm ? 'Close transaction form' : 'Add transaction'} accessibilityState={{ expanded: showForm }} onPress={() => setShowForm(!showForm)} style={shellStyles.primary}><Text style={shellStyles.primaryText}>{showForm ? 'Close' : '+ Add transaction'}</Text></Pressable>}>
    <DemoBar /><ErrorBanner />
    {!!notice && <View style={styles.notice}><Ionicons name="checkmark-circle" color={theme.green} size={18} /><Text style={styles.noticeText}>{notice}</Text></View>}
    {showForm && <View style={shellStyles.card}><Text style={styles.formTitle}>Add a transaction</Text><View style={[styles.formGrid, width < 720 && styles.stack]}>
      <View style={styles.fieldGroup}><Text style={styles.label}>Type</Text><View style={styles.segment}>{(['expense', 'income'] as TransactionType[]).map((value) => <Pressable key={value} onPress={() => chooseType(value)} style={[styles.segmentItem, type === value && styles.segmentActive]}><Text style={[styles.segmentText, type === value && styles.segmentTextActive]}>{value[0].toUpperCase() + value.slice(1)}</Text></Pressable>)}</View></View>
      <View style={styles.fieldGroup}><Text style={styles.label}>Amount</Text><TextInput accessibilityLabel="Transaction amount" keyboardType="decimal-pad" placeholder="0.00" placeholderTextColor={theme.muted} value={amount} onChangeText={setAmount} style={shellStyles.field} /></View>
      <View style={styles.fieldGroup}><Text style={styles.label}>Date</Text><TextInput accessibilityLabel="Transaction date" placeholder="YYYY-MM-DD" placeholderTextColor={theme.muted} value={date} onChangeText={setDate} style={shellStyles.field} /></View>
    </View><View style={styles.fieldGroup}><Text style={styles.label}>Category</Text><View style={styles.chips}>{categoryMap[type].map((value) => <Pressable key={value} onPress={() => setCategory(value)} style={[styles.chip, category === value && styles.chipActive]}><Text style={[styles.chipText, category === value && styles.chipTextActive]}>{value}</Text></Pressable>)}</View></View>
    <View style={styles.fieldGroup}><Text style={styles.label}>Description</Text><TextInput accessibilityLabel="Transaction description" maxLength={80} placeholder="What was this for?" placeholderTextColor={theme.muted} value={description} onChangeText={setDescription} style={shellStyles.field} /></View>
    {!!formError && <Text style={styles.formError}>{formError}</Text>}<View style={styles.formActions}><Pressable disabled={busy} onPress={() => void submit()} style={shellStyles.primary}><Text style={shellStyles.primaryText}>{busy ? 'Saving…' : 'Save transaction'}</Text></Pressable></View></View>}
    <View style={shellStyles.card}><View style={styles.listHeader}><View><Text style={shellStyles.cardTitle}>This month</Text><Text style={shellStyles.muted}>{rows.length} recorded transactions</Text></View><View style={styles.filters}>{(['all', 'income', 'expense'] as const).map((value) => <Pressable key={value} onPress={() => setFilter(value)} style={[styles.filter, filter === value && styles.filterActive]}><Text style={[styles.filterText, filter === value && styles.filterTextActive]}>{value[0].toUpperCase() + value.slice(1)}</Text></Pressable>)}</View></View>
      {!rows.length ? <View style={styles.empty}><Ionicons name="receipt-outline" size={28} color={theme.muted} /><Text style={styles.emptyTitle}>Nothing here yet</Text><Text style={shellStyles.muted}>Try another filter or add your first transaction.</Text></View> : rows.map((item) => <View key={item.id} style={styles.row}><View style={[styles.icon, item.type === 'income' ? styles.incomeIcon : styles.expenseIcon]}><Ionicons name={item.type === 'income' ? 'arrow-down' : 'arrow-up'} size={17} color={item.type === 'income' ? theme.green : theme.red} /></View><View style={styles.rowContent}><Text style={styles.rowTitle}>{item.description}</Text><Text style={styles.rowMeta}>{item.category} · {shortDate(item.occurred_on)}</Text></View><Text style={[styles.amount, item.type === 'income' && styles.income]}>{item.type === 'income' ? '+' : '−'}{currency.format(item.amount)}</Text><Pressable accessibilityLabel={pendingDelete === item.id ? `Confirm delete ${item.description}` : `Delete ${item.description}`} disabled={busy} onPress={() => { if (pendingDelete === item.id) { void deleteTransaction(item.id).then(() => { setPendingDelete(null); setNotice('Transaction deleted.'); }); } else setPendingDelete(item.id); }} style={styles.delete}>{pendingDelete === item.id ? <Text style={styles.confirmDelete}>Confirm</Text> : <Ionicons name="trash-outline" color={theme.muted} size={18} />}</Pressable></View>)}
    </View>
  </Screen>;
}
function makeStyles(theme: AppTheme) { return StyleSheet.create<any>({
  notice: { backgroundColor: theme.greenSoft, borderRadius: 11, padding: 12, flexDirection: 'row', gap: 8, alignItems: 'center' }, noticeText: { color: theme.green, fontWeight: '650' }, formTitle: { color: theme.ink, fontSize: 20, fontWeight: '800', marginBottom: 18 }, formGrid: { flexDirection: 'row', gap: 13 }, stack: { flexDirection: 'column' }, fieldGroup: { flex: 1, gap: 7, marginBottom: 15 }, label: { color: theme.ink, fontWeight: '700', fontSize: 13 }, segment: { flexDirection: 'row', backgroundColor: theme.surfaceMuted, padding: 4, borderRadius: 11, minHeight: 46 }, segmentItem: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }, segmentActive: { backgroundColor: theme.surface }, segmentText: { color: theme.muted, fontWeight: '700' }, segmentTextActive: { color: theme.green }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 }, chip: { borderColor: theme.border, borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8 }, chipActive: { backgroundColor: theme.greenSoft, borderColor: theme.green }, chipText: { color: theme.muted, fontSize: 13, fontWeight: '600' }, chipTextActive: { color: theme.green }, formError: { color: theme.red, marginBottom: 12 }, formActions: { alignItems: 'flex-start' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 15, marginBottom: 15, flexWrap: 'wrap' }, filters: { maxWidth: '100%', flexDirection: 'row', backgroundColor: theme.surfaceMuted, padding: 3, borderRadius: 10 }, filter: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 8 }, filterActive: { backgroundColor: theme.surface }, filterText: { color: theme.muted, fontWeight: '650', fontSize: 12 }, filterTextActive: { color: theme.ink }, row: { maxWidth: '100%', flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 14, borderTopColor: theme.border, borderTopWidth: StyleSheet.hairlineWidth }, icon: { width: 37, height: 37, flexShrink: 0, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }, incomeIcon: { backgroundColor: theme.greenSoft }, expenseIcon: { backgroundColor: theme.redSoft }, rowContent: { flex: 1, minWidth: 0 }, rowTitle: { color: theme.ink, fontWeight: '700' }, rowMeta: { color: theme.muted, fontSize: 12, marginTop: 3 }, amount: { color: theme.red, fontWeight: '750', flexShrink: 0 }, income: { color: theme.green }, delete: { padding: 6, flexShrink: 0 }, confirmDelete: { color: theme.red, fontWeight: '700', fontSize: 12 }, empty: { alignItems: 'center', paddingVertical: 55, gap: 8 }, emptyTitle: { color: theme.ink, fontWeight: '750', fontSize: 17 },
}) as any; }
