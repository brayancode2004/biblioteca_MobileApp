import { View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/SimpleLineIcons';
import Colors from "../constants/Colors";
import { Redirect, router } from "expo-router";
import { eliminarDatosUsuario } from "../utils/Functions";
import { useAuth } from "../providers/AuthProvider";
import 'react-native-reanimated';


function CustomDrawerContent(props: any) {
  const { top, bottom }  = useSafeAreaInsets();
  const { session, setSession } = useAuth();


  const onLogOut = () => {
    eliminarDatosUsuario();
    setSession(null)
    router.replace('/')
  }
  
  return (
    <View style={{flex: 1}} >
      <DrawerContentScrollView {...props} 
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: '#F9410B'}}
      >
        <View style={{ padding: 20}}>
          <Image
            source={{ uri: session?.userPic}}
            style={styles.userPic}
          />
          <Text style={styles.userName}>
            {session?.nombreCompleto}
          </Text>
        </View>
        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      <View style={[styles.drawerFooterContainer, {paddingBottom: 20 + bottom}]} >
        <TouchableOpacity onPress={onLogOut} style={styles.drawerFooterTouchable} >
          <Ionicons name="logout" size={24} color={'#F9410B'}/>
          <Text style={styles.drawerFooterLabel}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  userPic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  userName: {
    alignSelf: 'center',
    fontWeight: '800',
    fontSize: 18,
    paddingTop: 10,
    color: 'white',
    textAlign: 'center'
  },
  drawerItemListContainer: {
    backgroundColor: '#fff',
    paddingTop: 10
  },
  drawerFooterContainer: {
    borderTopColor: '#dde3fe',
    borderTopWidth: 1,
    padding: 20,
  },
  drawerFooterTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  drawerFooterLabel: {
    fontWeight: '600',
    color: Colors.light.primary
  }
});

export default CustomDrawerContent;
