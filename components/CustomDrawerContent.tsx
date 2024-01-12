import { View, Text, Image, Pressable, StyleSheet} from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/SimpleLineIcons';


function CustomDrawerContent(props: any) {
  const [login, setLogin] = useState(true);
  const { top, bottom }  = useSafeAreaInsets();
  
  return (
    <View style={{flex: 1}} >
      <DrawerContentScrollView {...props} 
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: '#dde3fe'}}
      >
        <View style={{ padding: 20}}>
          <Image
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/uamlibrary-b1bf8.appspot.com/o/IMG_3753.JPG?alt=media&token=4333c6e7-211a-41e0-abd4-7bb8d5d09e35'}}
            style={styles.userPic}
          />
          <Text style={styles.userName}>
            Brayan Calderón
          </Text>
        </View>
        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      <View style={[styles.drawerFooterContainer, {paddingBottom: 20 + bottom}]} >
          <DrawerItem 
            label={'Cerrar Sesión'} 
            inactiveTintColor="#5363df"
            onPress={() => setLogin(!login)} 
            icon={({size,color}) => (
              <Ionicons name="logout" size={size} color={color}/>
            )}
          />
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
    fontWeight: '500',
    fontSize: 18,
    paddingTop: 10,
    color: '#5363df'
  },
  drawerItemListContainer: {
    backgroundColor: '#fff',
    paddingTop: 10
  },
  drawerFooterContainer: {
    borderTopColor: '#dde3fe',
    borderTopWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  }
});

export default CustomDrawerContent;
