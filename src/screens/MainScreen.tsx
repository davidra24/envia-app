import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StateModel, userInformationModel } from '../models';

export const MainScreen = () => {
  const user = useSelector<StateModel, userInformationModel | undefined>(
    (state) => state.user
  );
  useEffect(() => {
    console.log({ user });
  }, []);

  return <>{user}</>;
};
