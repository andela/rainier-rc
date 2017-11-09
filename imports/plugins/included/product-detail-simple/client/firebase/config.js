import dotenv from "dotenv";

dotenv.config();

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "rc-app-cc3ce.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSENGING_ID
};

export default config;
