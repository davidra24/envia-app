import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { GuideViewModel, StateModel } from '../../models';
import { getResource } from '../../utilities';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { GuidesList } from '../../components/guides/GuidesList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setGuides as dispatchGuides } from '../../redux';

type ProfileParams = {
  Login: undefined;
  Root: undefined;
  GuideModal: { id: string };
};

type TGuidesProps = NativeStackScreenProps<ProfileParams, 'Root'>;

export const GuideListTab = ({ navigation }: TGuidesProps) => {
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
      ) : guides ? (
        <GuidesList guides={guides} navigation={navigation} />
      ) : (
        <Text>Not found</Text>
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
