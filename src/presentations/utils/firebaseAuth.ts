import axios, { AxiosPromise } from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/auth'; // tslint:disable-line:no-import-side-effect

export const firebaseAuth: {
  client: firebase.auth.Auth | null;
  init(): void;
  setSession(idToken: string): AxiosPromise;
  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;
  signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;
} = {
  client: null,
  init: (): void => {
    firebaseAuth.client = firebase.auth();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
  setSession: (idToken: string): AxiosPromise => {
    return axios.post('/sessions', {
      idToken,
    });
  },
  createUserWithEmailAndPassword: (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    return firebaseAuth.client.createUserWithEmailAndPassword(email, password);
  },
  signInWithEmailAndPassword: (email: string, password: string): Promise<firebase.auth.UserCredential> => {
    return firebaseAuth.client.signInWithEmailAndPassword(email, password);
  },
};
