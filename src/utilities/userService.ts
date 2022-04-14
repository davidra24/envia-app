import { initializeAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../config';
import { userInformationModel } from '../models';

const auth = initializeAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const getUserService = async (
  uid: string
): Promise<userInformationModel> => {
  const docRef = doc(firestore, `users/${uid}`);
  const documenet = await getDoc(docRef);
  const information = documenet.data();
  return information as userInformationModel;
};
