import * as firebase from 'firebase/app';

export const firebaseApp: {
  init(): void;
  onAuthStateChanged(callback: (user?: firebase.User) => void): void;
} = {
  init: (): void => {
    const FIREBASE_PROJECT_ID: string = process.env.FIREBASE_PROJECT_ID;
    const FIREBASE_API_KEY: string = process.env.FIREBASE_API_KEY;

    const firebaseConfig: {
      apiKey: string;
      authDomain: string;
      databaseURL: string;
    } = {
      apiKey: FIREBASE_API_KEY,
      authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    };
    firebase.initializeApp(firebaseConfig);
  },
  onAuthStateChanged: (callback: (user?: firebase.User) => void): void => {
    firebase.auth().onAuthStateChanged(callback);
  },
};
