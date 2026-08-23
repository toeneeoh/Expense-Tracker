import Constants from 'expo-constants';
import type { Dashboard, InsightsResponse, NewTransaction } from '@/types/finance';

const baseUrl = (Constants.expoConfig?.extra?.apiUrl as string | undefined) ?? 'http://localhost:5000';
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(`${baseUrl}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } }); }
  catch { throw new Error('The demo service is offline. Start the API and try again.'); }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.error?.message ?? 'The request could not be completed.');
  return body as T;
}
export const api = {
  createSession: () => request<Dashboard>('/api/demo-sessions', { method: 'POST' }),
  dashboard: (id: string) => request<Dashboard>(`/api/demo-sessions/${id}/dashboard`),
  addTransaction: (id: string, value: NewTransaction) => request<Dashboard>(`/api/demo-sessions/${id}/transactions`, { method: 'POST', body: JSON.stringify(value) }),
  deleteTransaction: (id: string, transactionId: string) => request<Dashboard>(`/api/demo-sessions/${id}/transactions/${transactionId}`, { method: 'DELETE' }),
  updateGoal: (id: string, target: number) => request<Dashboard>(`/api/demo-sessions/${id}/goal`, { method: 'PUT', body: JSON.stringify({ target }) }),
  reset: (id: string) => request<Dashboard>(`/api/demo-sessions/${id}/reset`, { method: 'POST' }),
  insights: (id: string) => request<InsightsResponse>(`/api/demo-sessions/${id}/insights`, { method: 'POST' }),
};
