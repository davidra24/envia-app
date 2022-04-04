import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userInformationModel } from '../models';
import { firebaseApp } from '../config';
import { initializeAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = initializeAuth(firebaseApp);

export const useIsSignedIn = () => async () => {
  return true;
  /* const [user, setUser] = useState<User>();
  onAuthStateChanged(auth, (userFirebase) => {
    userFirebase ? setUser(userFirebase) : setUser(undefined);
  });
  return user; */
};

export const useLogout = () => async (callback?: Function) => {};
