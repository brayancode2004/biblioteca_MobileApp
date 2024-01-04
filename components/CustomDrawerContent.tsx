import { View, Text, Image, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/SimpleLineIcons';


function CustomDrawerContent(props: any) {
  const [login, setLogin] = useState(true);
  const { top, bottom }  = useSafeAreaInsets();

  useEffect(() => {
    console.log(login)
  },[login])

  return (
    <View style={{flex: 1}} >
      <DrawerContentScrollView {...props} 
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: '#dde3fe'}}
      >
        <View style={{ padding: 20}}>
          <Image
            source={{ uri: 'https://galaxies.dev/img/authors/simong.webp'}}
            style={{ width: 100, height: 100, alignSelf: 'center'}}
          />
          <Text 
            style={{
              alignSelf: 'center',
              fontWeight: '500',
              fontSize: 18,
              paddingTop: 10,
              color: '#5363df'
            }}
          >
            Simmon Grimm
          </Text>
        </View>
        <View 
          style={{
            backgroundColor: '#fff',
            paddingTop: 10
          }}
        >
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>

      <Pressable 
        style={{
          borderTopColor: '#dde3fe',
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
        onPress={() => setLogin(!login)}
        >
          <Ionicons name='logout' size={22} color={'#5363df'}/>
          <Text
            style={{
              color: '#5363df',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            Cerrar Sesión
          </Text>
      </Pressable>
    </View>
  )
}

export default CustomDrawerContent;
