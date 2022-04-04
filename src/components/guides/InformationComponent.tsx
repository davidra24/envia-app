import { Caption, Paragraph } from 'react-native-paper';
import { Text, View } from '../Themed';

interface InformationComponentProps {
  title: string;
  content: string;
}

export const InformationComponent = ({
  title,
  content
}: InformationComponentProps) => (
  <View>
    <Paragraph>
      <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      <Caption>
        <Text>{content}</Text>
      </Caption>
    </Paragraph>
  </View>
);
