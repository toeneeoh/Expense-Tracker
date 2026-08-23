import { currency, shortDate } from './format';

describe('finance formatting', () => {
  it('formats US dollar values consistently', () => {
    expect(currency.format(2754)).toBe('$2,754');
  });

  it('formats an ISO date without shifting a day', () => {
    expect(shortDate('2026-08-22')).toBe('Aug 22');
  });
});
