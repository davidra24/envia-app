import { ScrollView } from 'react-native';
import { GuideModel } from '../../models';
import { View } from '../Themed';
import { GuideItem } from './GuideItem';

interface GuidesListProps {
  guides: Array<GuideModel>;
  navigation: {
    navigate: Function;
  };
}

export const GuidesList = ({ guides, navigation }: GuidesListProps) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {guides.map((guide, index) => (
          <GuideItem key={index} guide={guide} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
};
