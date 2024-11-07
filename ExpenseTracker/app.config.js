import * as dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    name: "ExpenseTracker",
    slug: "ExpenseTracker",
    version: "1.0.0",
    android: {
      package: "com.kafei.ExpenseTracker", // Package name for deployment
    },
    extra: {
      API_URL: 'https://5c7f-129-174-182-107.ngrok-free.app', // Put backend ip and port for development testing here
      eas: {
        projectId: "804e51c0-4ef2-4b9c-92e1-b049aca8ab21"
      }
    },
    scheme: "myapp",
  },
};
