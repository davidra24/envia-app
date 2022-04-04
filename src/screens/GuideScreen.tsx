import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setGuide as setGuideStorage } from '../redux';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import { GuideModel, RootTabScreenPropsModel, StateModel } from '../models';
import { getResource } from '../utilities';
import { GuideComponent } from '../components/guides/GuideComponent';

export const GuideModal = ({
  navigation,
  route: {
    params: { id }
  }
}: RootTabScreenPropsModel<'GuideModal'>) => {
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<any>();
  const guideStorage = useSelector((state: StateModel) => state.guide);
  const dispatch = useDispatch();

  const existGuide = () => guideStorage && guideStorage.id_guide === id;

  const findResource = async () => {
    setLoading(true);
    const resource = await getResource({
      endpoint: `guides_view/${id}`
    });
    if (Object.keys(resource).length) {
      dispatch(setGuideStorage(resource));
      setGuide(resource);
      setLoading(false);
    } else {
      navigation.pop();
    }
  };

  useEffect(() => {
    if (existGuide()) setGuide(guideStorage);
    else findResource();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size='large'
        />
      ) : (
        <Text>{guide ? <GuideComponent guide={guide} /> : 'Not found'}</Text>
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
