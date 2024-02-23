import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons, FontAwesome5, MaterialIcons, FontAwesome} from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { DrawerActions} from '@react-navigation/native';
import Colors from '../../../constants/Colors';
import { useAuth } from '../../../providers/AuthProvider';


function Settings() {
  const navigation = useNavigation();
  const { session } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.backBtn}>
          <Ionicons name='menu' size={24} color={Colors.light.primary}/>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.titleText}>Configuraciones</Text>
        </View>
        <View style={[styles.backBtn, {backgroundColor: 'transparent', borderColor: Colors.light.pureWhite}]}>
          <Ionicons name='arrow-back-outline' size={24} color='transparent' />
        </View>
      </View>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: session?.userPic}} style={styles.profilePicture} />
        <Text style={styles.userName}>{session?.nombreCompleto}</Text>
      </View>
      {/* Lista de Apartados de Configuracion */}
      <View style={styles.listaApartados}>
        <Pressable style={styles.listaApartadosItem} onPress={() => router.push('/informacionPersonalScreen')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22}}>
            <FontAwesome5 name="user-alt" size={24} color={Colors.light.primary} />
            <Text style={styles.listaApartadosItemTitle}>Información Personal</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.primary} />
        </Pressable>
        <Pressable style={styles.listaApartadosItem} onPress={() => router.push('/socialScreen')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22}}>
            <FontAwesome5 name="camera" size={24} color={Colors.light.primary} />
            <Text style={styles.listaApartadosItemTitle}>Foto de Perfil</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.primary} />
        </Pressable>
        <Pressable style={styles.listaApartadosItem} onPress={() => router.push('/seguridadScreen')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22}}>
            <FontAwesome5 name="lock" size={24} color={Colors.light.primary} />
            <Text style={styles.listaApartadosItemTitle}>Seguridad</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.primary} />
        </Pressable>
        <Pressable style={styles.listaApartadosItem} onPress={() => router.push('/notificacionesScreen')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22}}>
            <FontAwesome name="bell" size={24} color={Colors.light.primary} />
            <Text style={styles.listaApartadosItemTitle}>Notificaciones</Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={24} color={Colors.light.primary} />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    gap: 28,
    backgroundColor: Colors.light.pureWhite
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
      padding: 8,
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: '#EEEEEE',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  headerTitle: {
      alignItems: 'center',
  },
  titleText: {
      fontWeight: '600',
      fontSize: 19,
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14
  },
  profilePicture: {
    width: 140, 
    height: 140,
    borderRadius: 70
  },
  userName: {
    fontSize: 18,
    fontWeight: '400'
  },
  listaApartados: {
    marginTop: 28,
    paddingHorizontal: 22,
    gap: 22
  }, 
  listaApartadosItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E2E4E7',
    borderBottomWidth: 1,
    paddingBottom: 17,
    paddingHorizontal: 4,
  }, 
  listaApartadosItemTitle: {
    fontSize: 18,
    fontWeight: '400'
  }
})

export default Settings
