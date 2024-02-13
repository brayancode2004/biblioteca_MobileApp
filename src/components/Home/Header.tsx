import { StyleSheet, Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from "expo-router";
import { DrawerActions} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { cortarStringEnPrimerEspacio } from '../../utils/Functions';
import { useAuth } from '../../providers/AuthProvider';

function Header() {
    const navigation = useNavigation();
    const { session } = useAuth();
  
    const onOpenDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
    }

    const notificationCount = 5;

  return (
    <View style={styles.header}>
    <Pressable style={styles.user} onPress={onOpenDrawer}>
      <Image
        source={{ uri: session?.userPic}}
        style={styles.userPic} 
      />
      <View>
        <Text style={styles.greetings}>Hola, {cortarStringEnPrimerEspacio(session?.nombreCompleto)  } 👋!</Text>
        <Text style={styles.phrase}>Vamos a empezar a leer</Text>
      </View>
    </Pressable>
    
    {/* Notifications icon with count */}
    <View style={styles.notificationsContainer}>
      <Ionicons name="notifications-outline" size={32}/>
      {notificationCount > 0 && (
        <View style={styles.notificationCountBadge}>
          <Text style={styles.notificationCountText}>{notificationCount}</Text>
        </View>
      )}
    </View>
  </View>
  )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      user: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 11,
      },
      userPic: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
      greetings: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20
      },
      phrase: {
        fontWeight: '300',
        fontSize: 15,
        color: 'gray'

      },
      notificationsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      notificationCountBadge: {
        backgroundColor: 'red', 
        borderRadius: 10,
        marginLeft: -15,
        paddingHorizontal: 5,
        alignSelf: 'flex-start'
      },
      notificationCountText: {
        color: 'white', // Customize the text color
        fontSize: 12,
      },
})