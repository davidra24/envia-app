import { ReactNode, useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

interface RefreshProps {
  styles?: any;
  children: ReactNode;
  functionToCall: Function;
}

export const RefreshView = ({
  styles,
  children,
  functionToCall
}: RefreshProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    functionToCall();
    setRefreshing(false);
  }, []);
  return (
    <ScrollView
      style={{ ...styles }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {children}
    </ScrollView>
  );
};
