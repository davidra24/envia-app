import {
  GuideObject,
  GuideViewModel,
  RouteModel,
  STATUS_ENUM
} from '../../models';
import { Text, View } from '../Themed';
import { styleGuideComponent as style } from '../../styles';
import { getResource, putResource, statusGuide } from '../../utilities';
import {
  ActivityIndicator,
  Button,
  Colors,
  Divider,
  List,
  Paragraph,
  Subheading,
  TextInput,
  Title
} from 'react-native-paper';
import { InformationComponent } from './InformationComponent';
import { ModalComponent } from '../ModalComponent';
import { useEffect, useState } from 'react';

export const GuideComponent = ({
  guide,
  navigation
}: {
  guide: GuideViewModel;
  navigation: {
    replace: Function;
  };
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);

  const {
    id_guide,
    status_guide,
    date_admission,
    notes_guide,
    content_guide,
    origin_regional,
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
    postal_code_addressee,
    assigned_route
  } = guide;

  const [suggestedRoute, setSuggestedRoute] = useState<string>(
    assigned_route || ''
  );

  const findRoute = async (address: string) => {
    setLoading(true);
    try {
      const addressRoute = await getResource<null, RouteModel>({
        baseUrl: 'http://192.168.2.11:8080/api',
        endpoint: `Route?address=${address}`
      });
      if (guide && addressRoute?.name) {
        setSuggestedRoute(addressRoute?.name);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setSuggestedRoute('');
    }
  };

  useEffect(() => {
    guide && findRoute(guide?.address_addressee_in_guide);
  }, [guide]);

  const saveRoute = () => {
    if (suggestedRoute) {
      setLoading(true);
      try {
        putResource<GuideObject, any>({
          endpoint: `guides/pdf/${id_guide}`,
          body: {
            guide_person: {
              assigned_route: suggestedRoute
            },
            guide: {
              status_guide: 1
            }
          }
        });
        setLoading(false);
        setVisible(false);
        navigation.replace('Root');
      } catch (error) {
        setLoading(false);
      }
    }
  };

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
          title='Regional de origen: '
          content={origin_regional}
        />
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
      {assigned_route ? (
        <Paragraph style={{ fontWeight: 'bold' }}>{assigned_route}</Paragraph>
      ) : (
        <Button onPress={() => setVisible(true)}>Definir ruta</Button>
      )}
      <ModalComponent visible={visible} setVisible={setVisible}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={Colors.red800}
            size='large'
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        ) : (
          <View>
            <Title>Ruta sugerida:</Title>
            <TextInput
              value={suggestedRoute}
              onChangeText={setSuggestedRoute}
              placeholder='Escribe la ruta sugerida...'
            />
            <Button onPress={saveRoute}>Ok</Button>
          </View>
        )}
      </ModalComponent>
    </View>
  );
};
