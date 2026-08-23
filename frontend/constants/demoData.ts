import type { Dashboard, InsightsResponse } from '@/types/finance';

export const demoDashboard: Dashboard = {
  sessionId: 'local-preview', summary: { income: 5850, expenses: 3096, balance: 2754, savingsRate: 47.1 }, goal: { target: 5000, current: 2850, progress: 57 },
  categories: [{ name: 'Housing', amount: 1850 }, { name: 'Food', amount: 420 }, { name: 'Shopping', amount: 260 }, { name: 'Utilities', amount: 210 }, { name: 'Transport', amount: 185 }, { name: 'Subscriptions', amount: 96 }, { name: 'Wellness', amount: 75 }],
  transactions: [
    { id: 'preview-1', session_id: 'local-preview', type: 'expense', category: 'Wellness', description: 'Gym membership', amount: 75, occurred_on: '2026-08-20' },
    { id: 'preview-2', session_id: 'local-preview', type: 'expense', category: 'Shopping', description: 'Household purchases', amount: 260, occurred_on: '2026-08-17' },
    { id: 'preview-3', session_id: 'local-preview', type: 'expense', category: 'Subscriptions', description: 'Digital subscriptions', amount: 96, occurred_on: '2026-08-14' },
    { id: 'preview-4', session_id: 'local-preview', type: 'expense', category: 'Utilities', description: 'Utilities', amount: 210, occurred_on: '2026-08-12' },
    { id: 'preview-5', session_id: 'local-preview', type: 'expense', category: 'Transport', description: 'Transit and rides', amount: 185, occurred_on: '2026-08-10' },
  ],
};
export const demoInsights: InsightsResponse = { source: 'rules', disclaimer: 'Educational guidance only — not professional financial advice.', insights: [
  { title: 'Protect your strong surplus', observation: 'You are keeping 47% of recorded income.', action: 'Automate part of the surplus toward your savings goal.', impact: 'Up to $2,754 can support future goals.', priority: 'medium' },
  { title: 'Review housing spending', observation: 'Housing is 60% of recorded expenses.', action: 'Review fixed housing costs before optimizing smaller categories.', impact: 'A 10% reduction would free about $185 monthly.', priority: 'medium' },
  { title: 'Keep the goal visible', observation: 'Your savings goal is 57% funded.', action: 'Review progress monthly and adjust when priorities change.', impact: 'The remaining $2,150 could take about one month.', priority: 'low' },
] };
