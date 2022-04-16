import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setGuide as setGuideStorage } from '../redux';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Text, View } from '../components/Themed';
import {
  GuideModel,
  RootTabScreenPropsModel,
  RouteModel,
  StateModel
} from '../models';
import { getResource } from '../utilities';
import { GuideComponent } from '../components/guides/GuideComponent';

export const GuideModal = ({
  navigation,
  route: {
    params: { id }
  }
}: RootTabScreenPropsModel<'GuideModal'>) => {
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<GuideModel | undefined>(undefined);
  const guideStorage: GuideModel | undefined = useSelector<
    StateModel,
    GuideModel | undefined
  >((state: StateModel) => state.reducer.guide);
  const dispatch = useDispatch();

  const existGuide = () => guideStorage && guideStorage.id_guide === id;

  const findGuide = async () => {
    setLoading(true);
    const guide = await getResource<null, GuideModel | undefined>({
      endpoint: `guides_view/${id}`
    });
    if (guide !== undefined && Object.keys(guide).length) {
      dispatch(setGuideStorage(guide));
      setGuide(guide);
      setLoading(false);
    } else {
      navigation.pop();
    }
  };

  const findRoute = async (address: string) => {
    setLoading(true);
    const addressRoute = await getResource<null, RouteModel>({
      baseUrl: 'http://192.168.2.11:8080/api',
      endpoint: `Route?address=${address}`
    });
    if (guide && addressRoute?.name) {
      dispatch(
        setGuideStorage({ ...guide, assigned_route: addressRoute.name })
      );
      setGuide({ ...guide, assigned_route: addressRoute.name });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (existGuide()) setGuide(guideStorage);
    else findGuide();
  }, []);

  useEffect(() => {
    const route = guide && findRoute(guide?.address_addressee_in_guide);
  }, [guide]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size='large'
        />
      ) : (
        <View>
          {guide ? <GuideComponent guide={guide} /> : <Text>Not found</Text>}
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
