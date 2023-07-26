This is mobile app for the "21 Trading" [**Paper Trader**](https://github.com/christianzski/paper-trader) project
# Getting Started

## Step 1
[**Install Node.js and npm**](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Step 2
Install all required packages

```bash
npm install
```

## Step 3
Start the application from root of the project directory:

```bash
npm run start
```

The application can then be started via Expo Go.

# Building Binaries

If a binary is needed, either use [**EAS Build servers**](https://docs.expo.dev/build/) or local builds. You must be logged into an Expo account via Expo CLI.

## Local Builds

You can also build a binary [**locally**](https://docs.expo.dev/build-reference/local-builds/) for Android or iOS:

### Android (Android SDK required):
```bash
eas build --platform android --local --profile preview
```

### iOS (MacOS + Xcode required):
```bash
eas build --platform ios --local
```
