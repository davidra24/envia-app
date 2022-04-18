import { ScrollView } from 'react-native';
import { GuideViewModel } from '../../models';
import { View } from '../Themed';
import { GuideItem } from './GuideItem';

interface GuidesListProps {
  guides: Array<GuideViewModel>;
  navigation: {
    navigate: Function;
    replace: Function;
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
