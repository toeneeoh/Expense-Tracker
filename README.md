# Budget Buddy
A web/mobile app developed with the Expo framework and React Native to track finances and develop personal finance plans.

- Python backend via flask
- PostgreSQL database
- OpenAI LLM

## Steps to start Developing

### 1. Clone the Repository
First, clone this repository to your local machine:
```bash
git clone <repository-url>
```

### 2. Install Node.js and npm
Make sure you have [Node.js](https://nodejs.org) and npm installed. You can download and install them from the official Node.js website if they aren't already on your system.

### 3. Install Project Dependencies
Navigate to the project directory and install the necessary dependencies:
```bash
cd <repository-directory>
npm install
```

### 4. Start the Expo Go Development Server
```bash
npm run start:expo
or
npx expo start -c
```

### 5 (Optional). Start the Backend Python Server
```bash
npm run start:flask
```

==================================================

## Steps to generate an .apk

### 1. Create an account on Expo Go (I need to invite you to the project)
```bash
https://expo.dev/
```

### 2. Install eas-cli and initialize the project
```bash
npm install --global eas-cli
eas init --id ce723064-1f58-4682-8e0a-4eb0a7dbd18c
```

### 3. Build the app using the production profile
```bash
eas build -p android --profile production
```

### 4. Scan the provided QR code to download the app
