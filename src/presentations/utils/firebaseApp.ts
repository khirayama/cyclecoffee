import * as firebase from 'firebase/app';

export const firebaseApp: {
  init(): void;
  onAuthStateChanged(callback: (user?: firebase.User) => void): void;
} = {
  init: (): void => {
    const FIREBASE_PROJECT_ID: string = process.env.FIREBASE_PROJECT_ID;
    const FIREBASE_API_KEY: string = process.env.FIREBASE_API_KEY;

    firebase.initializeApp({
      apiKey: FIREBASE_API_KEY,
      authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: FIREBASE_PROJECT_ID,
      databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
  },
  onAuthStateChanged: (callback: (user?: firebase.User) => void): void => {
    firebase.auth().onAuthStateChanged(callback);
  },
};
