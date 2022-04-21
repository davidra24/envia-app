import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { GuideViewModel, RootTabScreenPropsModel } from '../../models';
import { getResource } from '../../utilities';
import { ActivityIndicator, Caption, Colors } from 'react-native-paper';
import { GuidesList } from '../../components/guides/GuidesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setGuides as dispatchGuides } from '../../redux';

export const GuideListTab = ({
  navigation
}: RootTabScreenPropsModel<'GuideListTab'>) => {
  const [loading, setLoading] = useState(false);
  const [guides, setGuides] = useState<Array<GuideViewModel>>([]);
  const dispatch = useDispatch();

  const callCreatedGuides = async () => {
    setLoading(true);
    const guides = await getResource<null, Array<GuideViewModel>>({
      endpoint: 'guides_view?status=0'
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
        <GuidesList guides={guides} navigation={navigation} />
      ) : (
        <Caption>No hay guías disponibles para salida</Caption>
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
