import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { GuideViewModel, RootTabScreenPropsModel } from '../../models';
import { getResource } from '../../utilities';
import { ActivityIndicator, Caption, Colors } from 'react-native-paper';
import { GuidesList } from '../../components/guides/GuidesList';
import { useDispatch } from 'react-redux';
import { setGuides as dispatchGuides } from '../../redux';
import { RefreshView } from '../../containers/RefreshView';

const STATUS_CREATED = 0;

export const GuideListTab = ({
  navigation
}: RootTabScreenPropsModel<'GuideListTab'>) => {
  const [loading, setLoading] = useState(false);
  const [guides, setGuides] = useState<Array<GuideViewModel>>([]);
  const dispatch = useDispatch();

  const callCreatedGuides = async () => {
    setLoading(true);
    const guides = await getResource<null, Array<GuideViewModel>>({
      endpoint: `guides_view?status=${STATUS_CREATED}`
    });
    if (guides !== undefined && Object.keys(guides).length) {
      dispatch(dispatchGuides(guides));
      setGuides(guides);
    }
    setLoading(false);
  };

  useEffect(() => {
    callCreatedGuides();
    const willFocusSubscription = navigation.addListener('focus', () => {
      callCreatedGuides();
    });
    return willFocusSubscription;
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size='large'
        />
      ) : guides && guides.length ? (
        <RefreshView styles={styles} functionToCall={callCreatedGuides}>
          <GuidesList guides={guides} navigation={navigation} />
        </RefreshView>
      ) : (
        <RefreshView functionToCall={callCreatedGuides}>
          <Caption>No hay guías disponibles para salida</Caption>
        </RefreshView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
