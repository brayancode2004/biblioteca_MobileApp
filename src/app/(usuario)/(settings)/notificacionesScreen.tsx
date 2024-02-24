import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../../constants/Colors';
import { MaterialCommunityIcons, Ionicons, MaterialIcons} from '@expo/vector-icons';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';
import { useAuth } from '../../../providers/AuthProvider';
import { actualizarInfoEstudiante, obtenerEstudiantePorId } from '../../../services/EstudianteService';

function NotificacionesScreen() {
  const { session, setSession } = useAuth()
  const [ prestamosNotificaciones, setPrestamosNotificaciones] = useState(true);
  const [ eventosNotificaciones, setEventosNotificaciones] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if(session && 'cif' in session){
          const response = await obtenerEstudiantePorId(session.cif)
          setSession(response.data);
          setLoading(false)
      }
    }
    fetchUserData();
  },[])

  useEffect(() => {
    if (session && 'prestamosNotificaciones' in session){
      setPrestamosNotificaciones(session?.prestamosNotificaciones);
      setEventosNotificaciones(session?.eventosNotificaciones);
    }
  },[session])



  const handleLoanNotifications = async() => {
    try{
      const updatedValue = { 
        cif: session && 'cif' in session && session.cif,
        prestamosNotificaciones : !prestamosNotificaciones
      }
      setPrestamosNotificaciones(!prestamosNotificaciones);
      await actualizarInfoEstudiante (updatedValue);
    }catch(e : any){
      Alert.alert(e.message)
    }
  }
  
  const handleEventNotifications = async() => {
    try{
      const updatedValue = { 
        cif: session && 'cif' in session && session.cif,
        eventosNotificaciones : !eventosNotificaciones
      }
      setEventosNotificaciones(!eventosNotificaciones);
      await actualizarInfoEstudiante (updatedValue);
    }catch(e: any){
      Alert.alert(e.message)
    }
  }

  if(loading){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.light.pureWhite}}>
        <ActivityIndicator/>
      </View>
    )
  }else {
    return (
      <SafeAreaView edges={['bottom']} style={styles.container}>
          <ConfiguracionesHeader title={'Notificaciones'}/>
          <View style={styles.notificationsContainer}>
            <View style={styles.notificationsItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 17, flexShrink: 1}}>
                <MaterialCommunityIcons name="cellphone" size={35} color={Colors.light.primary} />
                <View style={{ flexShrink: 1, gap: 4}}>
                  <Text style={styles.notificationsItemTitle}>Notificaciones Push</Text>
                  <Text style={styles.notificationsItemSubTitle}>Estas son las que aparecen en la barra superior de tu celular y te mantendrán al tanto en todo momento</Text>
                </View>
              </View>
              <Switch trackColor={{ false: Colors.light.gray, true: Colors.light.primary }}/>
            </View>
            <View style={styles.notificationsItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 17, flexShrink: 1}}>
                <Ionicons name='library' size={35} color={Colors.light.primary}/>
                <View style={{ flexShrink: 1, gap: 4}}>
                  <Text style={styles.notificationsItemTitle}>Notificaciones de Préstamos</Text>
                  <Text style={styles.notificationsItemSubTitle}>Estas te permiten estar al tanto del proceso de los préstamos</Text>
                </View>
              </View>
              <Switch value={prestamosNotificaciones} onChange={handleLoanNotifications}  trackColor={{ false: Colors.light.gray, true: Colors.light.primary }} />
            </View>
            <View style={styles.notificationsItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 17, flexShrink: 1}}>
                <MaterialIcons name="event" size={35} color={Colors.light.primary} />
                <View style={{ flexShrink: 1, gap: 4,}}>
                  <Text style={styles.notificationsItemTitle}>Notificaciones de Eventos</Text>
                  <Text style={styles.notificationsItemSubTitle}>Te notifica cuando hay nuevos libros que ahora puedes prestar, actividades que se realizarán o cualquier otro acontencimiento que tenga que ver con la biblioteca.</Text>
                </View>
              </View>
              <Switch value={eventosNotificaciones} onChange={handleEventNotifications}  trackColor={{ false: Colors.light.gray, true: Colors.light.primary }} />
            </View>
          </View>
      </SafeAreaView>
    )
  }
}

export default NotificacionesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.pureWhite
    },
    notificationsContainer: {
      backgroundColor: Colors.light.white,
      marginHorizontal: 22,
      borderRadius: 11,
      padding: 11,
      gap: 17,
      paddingBottom: 22
    },
    notificationsItem: {
      flexDirection: 'row',
      padding: 11,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#E2E4E7',
      borderBottomWidth: 1,
      gap: 11
    },
    notificationsItemTitle:{
      color: Colors.light.secondary,
      fontSize: 16, 
      fontWeight: '700'
    },
    notificationsItemSubTitle: {
      color: Colors.light.gray
    }
})