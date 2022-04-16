import { Dimensions, StyleSheet } from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Card,
  Paragraph,
  Title
} from 'react-native-paper';
import { GuideModel } from '../../models';
import { View } from '../Themed';

interface GuidesListProps {
  guide: GuideModel;
  navigation: {
    navigate: Function;
  };
}

const LeftContent = (props: any) => <Avatar.Icon {...props} icon='folder' />;

export const GuideItem = ({ guide, navigation }: GuidesListProps) => {
  return (
    <View style={styles.container}>
      <Card>
        <Caption style={styles.idGuide}>{guide.id_guide}</Caption>
        <Card.Title
          title={guide.address_addressee_in_guide}
          subtitle={guide.destination_city}
          left={LeftContent}
        />
        <Card.Content>
          <Title>{guide.destination_regional}</Title>
          <Paragraph>{guide.notes_guide}</Paragraph>
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
          <Button
            onPress={() => {
              navigation.navigate('GuideModal', { id: guide.id_guide });
            }}
          >
            Asignar ruta
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: 'white'
  },
  idGuide: {
    marginLeft: 20
  }
});
