import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Colors,
  IconButton,
  Paragraph,
  Title
} from 'react-native-paper';
import { GuideViewModel } from '../../models';
import { getTextResource } from '../../utilities';
import { View } from '../Themed';

interface GuidesListProps {
  guide: GuideViewModel;
  navigation: {
    navigate: Function;
    replace: Function;
  };
}

const LeftContent = (props: any) => {
  const { navigation, id_guide, loading, setLoading } = props;
  return loading ? (
    <ActivityIndicator
      animating={true}
      color={Colors.red800}
      size='small'
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    />
  ) : (
    <IconButton
      {...props}
      style={{ marginEnd: 10 }}
      icon='folder'
      onPress={() => {
        setLoading(true);
        pdfReader(navigation, id_guide);
      }}
    />
  );
};

const pdfReader = async (
  navigation: { navigate: Function },
  id_guide: string
) => {
  const base64 = await getTextResource({
    endpoint: `guides_view/${id_guide}?pdf=true`
  });
  if (base64) {
    await navigation.navigate('PDFReader', { base64 });
  }
};

export const GuideItem = ({ guide, navigation }: GuidesListProps) => {
  const [folderLoading, setFolderLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Card>
        <Caption style={styles.idGuide}>{}</Caption>
        <Card.Title
          title={guide.address_addressee_in_guide}
          subtitle={guide.destination_city}
          left={() =>
            LeftContent({
              navigation,
              id_guide: guide.id_guide,
              loading: folderLoading,
              setLoading: setFolderLoading
            })
          }
        />
        <Card.Content>
          <Title>{guide.destination_regional}</Title>
          <Paragraph>{guide.notes_guide}</Paragraph>
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
          <Button
            onPress={() => {
              navigation.replace('GuideModal', { id: guide.id_guide });
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
