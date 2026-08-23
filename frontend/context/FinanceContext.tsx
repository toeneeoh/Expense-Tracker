import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/services/api';
import type { Dashboard, InsightsResponse, NewTransaction } from '@/types/finance';
import { demoDashboard, demoInsights } from '@/constants/demoData';

type Status = 'connecting' | 'ready' | 'offline';
type Value = {
  dashboard: Dashboard | null; insights: InsightsResponse | null; status: Status; busy: boolean; error: string | null;
  retry(): Promise<void>; addTransaction(value: NewTransaction): Promise<void>; deleteTransaction(id: string): Promise<void>;
  updateGoal(target: number): Promise<void>; reset(): Promise<void>; refreshInsights(): Promise<void>;
};
const FinanceContext = createContext<Value | null>(null);
const SESSION_KEY = 'budget-buddy-demo-session';

export function FinanceProvider({ children }: React.PropsWithChildren) {
  const [dashboard, setDashboard] = useState<Dashboard>(demoDashboard);
  const [insights, setInsights] = useState<InsightsResponse | null>(demoInsights);
  const [status, setStatus] = useState<Status>('connecting');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setStatus('connecting'); setError(null);
    const waits = [0, 2000, 5000];
    for (const wait of waits) {
      if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
      try {
        const saved = await AsyncStorage.getItem(SESSION_KEY);
        let data: Dashboard;
        if (saved) { try { data = await api.dashboard(saved); } catch { data = await api.createSession(); } }
        else data = await api.createSession();
        await AsyncStorage.setItem(SESSION_KEY, data.sessionId);
        setDashboard(data); setStatus('ready'); setError(null); return;
      } catch { /* retry while a free backend wakes */ }
    }
    setStatus('offline'); setError('Interactive editing is temporarily offline. The read-only demo remains available.');
  }, []);
  useEffect(() => { void Promise.resolve().then(load); }, [load]);
  const mutate = useCallback(async (work: (id: string) => Promise<Dashboard>) => {
    if (status !== 'ready') {
      const message = 'The interactive API is still waking up. Try again in a moment.';
      setError(message);
      throw new Error(message);
    }
    setBusy(true); setError(null);
    try { setDashboard(await work(dashboard.sessionId)); setInsights(null); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save that change.'); throw reason; }
    finally { setBusy(false); }
  }, [dashboard, status]);
  const refreshInsights = useCallback(async () => {
    if (status !== 'ready') { setError('The interactive API is still waking up. Showing reliable rules-based insights for now.'); return; }
    setBusy(true); setError(null);
    try { setInsights(await api.insights(dashboard.sessionId)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to refresh insights.'); }
    finally { setBusy(false); }
  }, [dashboard, status]);
  const value = useMemo<Value>(() => ({
    dashboard, insights, status, busy, error, retry: load,
    addTransaction: (item) => mutate((id) => api.addTransaction(id, item)),
    deleteTransaction: (transactionId) => mutate((id) => api.deleteTransaction(id, transactionId)),
    updateGoal: (target) => mutate((id) => api.updateGoal(id, target)),
    reset: () => mutate((id) => api.reset(id)),
    refreshInsights,
  }), [busy, dashboard, error, insights, load, mutate, refreshInsights, status]);
  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}
export function useFinance() {
  const value = useContext(FinanceContext);
  if (!value) throw new Error('useFinance must be used inside FinanceProvider');
  return value;
}
