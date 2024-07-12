import { View, Text } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawerContent from '../../components/CustomDrawerContent';
import 'react-native-reanimated';


function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
    <Drawer drawerContent={CustomDrawerContent} 
      screenOptions={{ 
        headerShown: false,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: '#F9410B',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginLeft: -20},
      }}
      >
        <Drawer.Screen name='(tabs)' 
          options={{ 
            title: 'Principal',
            drawerIcon: ({size, color}) => (
              <Ionicons name='home-outline' size={size} color={color}/>
            )
          }}
        />
        <Drawer.Screen name='settings' 
          options={{ 
            title: 'Configuración',
            headerShown: true,
            drawerIcon: ({size, color}) => (
              <Ionicons name='settings-outline' size={size} color={color}/>
            )
          }}
        />
    </Drawer>
    </GestureHandlerRootView>
  )
}

export default DrawerLayout
