import { GuideModel } from '../../models';
import { View, Text } from '../Themed';
import { styleGuideComponent as style } from '../../styles';
import { statusGuide } from '../../utilities';
import {
  Button,
  Caption,
  Divider,
  List,
  Paragraph,
  Subheading,
  Title
} from 'react-native-paper';
import { InformationComponent } from './InformationComponent';

export const GuideComponent = ({ guide }: { guide: GuideModel }) => {
  const {
    id_guide,
    status_guide,
    date_admission,
    notes_guide,
    content_guide,
    origin_city,
    destination_city,
    destination_regional,
    address_addressee_in_guide,
    document_sender,
    first_name_sender,
    last_name_sender,
    address_sender,
    phone_sender,
    postal_code_sender,
    document_addressee,
    first_name_addressee,
    last_name_addressee,
    address_addressee,
    phone_addressee,
    postal_code_addressee
  } = guide;
  return (
    <View style={style.container}>
      <Subheading style={style.idGuide}>{id_guide}</Subheading>
      <View style={style.informationView}>
        <Title style={style.centerTitle}>Información de guia</Title>
        <Divider />
        <InformationComponent
          title='Estado: '
          content={statusGuide(status_guide)}
        />
        <InformationComponent
          title='Admisión: '
          content={` ${date_admission}`}
        />
        <InformationComponent title='Notas: ' content={notes_guide} />
        <InformationComponent title='Contenido: ' content={content_guide} />
      </View>
      <View style={style.informationView}>
        <Title style={style.centerTitle}>Información de envío</Title>
        <Divider />
        <InformationComponent
          title='Ciudad de origen: '
          content={origin_city}
        />
        <InformationComponent
          title='Ciudad de destino: '
          content={destination_city}
        />
        <InformationComponent
          title='Regional de destino: '
          content={destination_regional}
        />
        <InformationComponent
          title='Dirección de envío: '
          content={address_addressee_in_guide}
        />
      </View>
      <List.AccordionGroup>
        <View style={style.informationView}>
          <List.Accordion title='Información de remitente' id='1'>
            <Divider />
            <InformationComponent
              title='Documento: '
              content={document_sender}
            />
            <InformationComponent
              title='Nombre: '
              content={`${first_name_sender} ${last_name_sender}`}
            />
            <InformationComponent
              title='Dirección: '
              content={address_sender}
            />
            <InformationComponent title='Teléfono: ' content={phone_sender} />
            <InformationComponent
              title='Codigo postal: '
              content={postal_code_sender}
            />
          </List.Accordion>
        </View>
        <View style={style.informationView}>
          <List.Accordion title='Información de destinatario' id='2'>
            <Divider />
            <InformationComponent
              title='documento: '
              content={document_addressee}
            />
            <InformationComponent
              title='Nombre: '
              content={`${first_name_addressee} ${last_name_addressee}`}
            />
            <InformationComponent
              title='Dirección: '
              content={address_addressee}
            />
            <InformationComponent
              title='Teléfono: '
              content={phone_addressee}
            />
            <InformationComponent
              title='Codigo postal: '
              content={postal_code_addressee}
            />
          </List.Accordion>
        </View>
      </List.AccordionGroup>
      <Button onPress={() => console.log('cambia')}>Definir ruta</Button>
    </View>
  );
};
