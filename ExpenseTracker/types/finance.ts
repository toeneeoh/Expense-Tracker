export type TransactionType = 'income' | 'expense';
export type Transaction = { id: string; session_id: string; type: TransactionType; category: string; description: string; amount: number; occurred_on: string };
export type Dashboard = {
  sessionId: string;
  summary: { income: number; expenses: number; balance: number; savingsRate: number };
  goal: { target: number; current: number; progress: number };
  categories: { name: string; amount: number }[];
  transactions: Transaction[];
};
export type Insight = { title: string; observation: string; action: string; impact: string; priority: 'high' | 'medium' | 'low' | string };
export type InsightsResponse = { insights: Insight[]; source: 'ai' | 'rules'; disclaimer: string };
export type NewTransaction = { type: TransactionType; category: string; description: string; amount: number; occurredOn: string };
