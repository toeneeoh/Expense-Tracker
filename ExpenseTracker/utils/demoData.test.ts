import { demoDashboard } from '../constants/demoData';

describe('bundled demo snapshot', () => {
  it('matches the server seed totals', () => {
    const income = demoDashboard.summary.income;
    const expenses = demoDashboard.categories.reduce((total, item) => total + item.amount, 0);
    expect(income).toBe(5850);
    expect(expenses).toBe(demoDashboard.summary.expenses);
    expect(income - expenses).toBe(demoDashboard.summary.balance);
  });
});
