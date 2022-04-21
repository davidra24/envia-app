import { useEffect, useState } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setGuide as setGuideStorage } from '../../redux';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Text, View } from '../../components/Themed';
import {
  GuideViewModel,
  RootTabScreenPropsModel,
  StateModel
} from '../../models';
import { getResource } from '../../utilities';
import { GuideComponent } from '../../components/guides/GuideComponent';

export const GuideModal = ({
  navigation,
  route: {
    params: { id }
  }
}: RootTabScreenPropsModel<'GuideModal'>) => {
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<GuideViewModel | undefined>(undefined);

  const guideStorage: GuideViewModel | undefined = useSelector<
    StateModel,
    GuideViewModel | undefined
  >((state: StateModel) => state.reducer.guide);

  const dispatch = useDispatch();

  const existGuide = () => guideStorage && guideStorage.id_guide === id;

  function backButtonHandler() {
    navigation.replace('Root');
    return true;
  }

  const findGuide = async () => {
    setLoading(true);
    try {
      const guide = await getResource<null, GuideViewModel | undefined>({
        endpoint: `guides_view/${id}`
      });
      if (guide !== undefined && Object.keys(guide).length) {
        dispatch(setGuideStorage(guide));
        setGuide(guide);
        setLoading(false);
      } else {
        navigation.replace('Root');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [backButtonHandler]);

  useEffect(() => {
    if (existGuide()) setGuide(guideStorage);
    else findGuide();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size='large'
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <View>
          {guide ? (
            <GuideComponent guide={guide} navigation={navigation} />
          ) : (
            <Text>Not found</Text>
          )}
        </View>
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
