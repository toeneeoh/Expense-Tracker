export default { expo: {
  name: 'Budget Buddy', slug: 'budget-buddy', version: '2.0.0', orientation: 'default', userInterfaceStyle: 'automatic', scheme: 'budgetbuddy',
  icon: './assets/images/icon.png', splash: { image: './assets/images/splash.png', resizeMode: 'contain', backgroundColor: '#F5F3EE' },
  web: { bundler: 'metro', output: 'static', favicon: './assets/images/favicon.png' }, plugins: ['expo-router'], experiments: { typedRoutes: true },
  extra: { apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000' },
} };
