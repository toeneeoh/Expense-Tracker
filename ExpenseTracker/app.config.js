import * as dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    owner: "budget-buddy",
    name: "budget-buddy",
    slug: "budget-buddy",
    version: "1.0.0",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    android: {
      adaptiveIcon: {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      package: "com.budget_buddy.budget_buddy", // Package name for deployment
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      "typedRoutes": true
    },
    extra: {
      API_URL: 'https://open-openly-longhorn.ngrok-free.app', // Put backend ip and port for development testing here
      eas: {
        projectId: "ce723064-1f58-4682-8e0a-4eb0a7dbd18c"
      }
    },
    scheme: "myapp",
  },
};
