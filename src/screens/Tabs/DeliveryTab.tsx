import { firebaseApp } from '../../config';
import {getResource, putResource} from "../../utilities";
import { Text } from '../../components/Themed';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { initializeAuth, signOut } from 'firebase/auth';
import { SafeAreaView, ScrollView } from 'react-native';
import { GuideViewModel, RouteModel } from '../../models';
import { styleProfile as style } from '../../styles/profile.style';
import { ActivityIndicator, Colors, List} from 'react-native-paper';
import { AssignedGuideModel } from '../../models/assignedGuide.model';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InformationComponent } from '../../components/guides/InformationComponent';
import {DialogComponent} from "../../components";

const auth = initializeAuth(firebaseApp);
const { button, inputText } = style;
type ProfileParams = { Login: undefined; Root: undefined; };
type TProfileProps = NativeStackScreenProps<ProfileParams, 'Root'>;

export const DeliveryTab = ({ navigation }: TProfileProps) => {

  const [listGuidesByRoute, setListGuidesByRoute] = useState<Array<GuideViewModel>>([]);
  const [listGuides, setListGuides] = useState<Array<GuideViewModel>>([]);
  const [listRoutes, setListRoutes] = useState<Array<RouteModel>>([]);
  const [loading, setLoading] = useState(false);
  const [caseGuide] = useState<string>('');
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>('');
  const [typeDialog, setTypeDialog] = useState<string>('');

  useEffect(() => {
    callListRoutes();
    callListGuides();
    return;
  }, []);

  const callListRoutes = async () => {
    setLoading(true);
    try {
      const listRoutes = await getResource<null, Array<RouteModel>>({
        baseUrl: 'http://127.0.0.1:8080/api',
        endpoint: 'polygon'
      });
      setListRoutes(listRoutes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setListRoutes([]);
    }
  };

  const callListGuides = async () => {
    setLoading(true);
    const list = await getResource<null, Array<GuideViewModel>>({
      baseUrl: 'https://envia-guide.herokuapp.com/api',
      endpoint: `guides`
    });
    setListGuides(list);
    setLoading(false);
  }

  const callListGuidesByRoute = async (id: number | undefined) => {
    setLoading(true);
    const list = await getResource<null, Array<AssignedGuideModel>>({
      baseUrl: 'http://mcrvehiculos.us-3.evennode.com/api',
      endpoint: `assignedGuides/${id}`
    });
    setLoading(false);
    return list;
  }

  const callDeliveredGuide = async (guide: GuideViewModel) => {
    setLoading(true);
    await putResource<GuideViewModel, any>({
      baseUrl: 'https://envia-guide.herokuapp.com/api',
      endpoint: `guides/${guide.id_guide}`,
      body: guide
    });
    setLoading(false);
    return;
  }

  const handleSelectedRoute = (id: number | undefined) => {
    id = 10;
    callListGuidesByRoute(id).then(response => {
      let guides: Array<GuideViewModel> = [];
      response.forEach((assigned: AssignedGuideModel) => {
        let item = listGuides.find(item => { return item.id_guide === assigned.Id})
        if (item !== undefined) {
          guides.push(item);
        }
      })
      setListGuidesByRoute(guides);
    });
  };

  const confirmDeliveredGuide = async (guide: GuideViewModel, action: string) => {
    if (action === 'report') {
      guide.notes_guide = caseGuide
    }
    callDeliveredGuide(guide).then(response => {
      dialogManager('Se ha confirmado la entrega del paquete', 'success');
      console.log(response);
    }, error => {
      dialogManager('No se pudo confirmar la entrega del paquete', 'error');
      console.log(error);
    })
  }

  const dialogManager = (message?: string, type?: string) => {
    setVisibleDialog(true);
    setMessage(message);
    setTypeDialog(type || '');
  };

  return (
      <SafeAreaView>
        <ScrollView>
          <List.Section title="Selecciona la ruta para ver las guías">
            <List.Accordion title="Rutas">
              {listRoutes.map(item =>
                ( <List.Item title={item.name} onPress={() => {handleSelectedRoute(item.id)}}/> )
              )}
            </List.Accordion>
          </List.Section>

          { loading ? (
              <ActivityIndicator animating={true} color={Colors.red800} size='large'/>
          ) : listGuidesByRoute ? (
              <List.Section title="Guías pendientes por entregar">
                {listGuidesByRoute.map(item =>
                    (<List.Accordion title={item.content_guide} left={props => <List.Icon {...props} icon="folder" />}>
                      <InformationComponent title='Contenido: ' content={item.content_guide}/>
                      <TextInput style={inputText} value={caseGuide} placeholder={'Reporta tu caso al momento de la entrega'}/>
                      <Button onPress={() => {confirmDeliveredGuide(item, 'report')}} mode="contained" style={button} color={Colors.white}>
                        Reportar caso
                      </Button>
                      <Button onPress={() => {confirmDeliveredGuide(item, '')}} mode="contained" style={button} color={Colors.white}>
                        Confirmar entrega
                      </Button>

                    </List.Accordion>)
                )}
              </List.Section>
          ) : (
              <Text>No hay guías pendientes por entregar</Text>
          )}

        </ScrollView>
        <DialogComponent
            visible={visibleDialog}
            message={message}
            setVisible={setVisibleDialog}
            type={typeDialog}
        />
      </SafeAreaView>
  );
};
