import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import 'react-native-reanimated';



function TabsLayout () {
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#F9410B',
          tabBarStyle:{
            backgroundColor:'white', 
            position:'absolute', 
            borderTopRightRadius: 24, 
            borderTopLeftRadius: 24,
            borderWidth: 0.7,
            borderColor: '#B4B4B5',
            bottom: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIconStyle: {
            marginBottom: -3,
          },
        }}
    >
      
    <Tabs.Screen 
        name="homeScreen" 
        options={{ 
            title: "Home",
            tabBarIcon: ({ size, color}) => (
              <Ionicons name='home' size={size} color={color}/>
            ),
        }}
    />
    <Tabs.Screen
      name="prestamosControlScreen"
      options={{
        title: "Préstamos",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="library" size={size} color={color}/>
        ),
      }}
    />
    <Tabs.Screen 
        name="inventarioScreen"
        options={{
            title: "Inventario",
            tabBarIcon: ({ size, color}) => (
              <FontAwesome5 name='clipboard-list' size={size} color={color}/>
            )
        }}
    />
    <Tabs.Screen
      name="usuariosScreen"
      options={{
        title: "Usuarios",
        tabBarIcon: ({ size, color}) => (
          <FontAwesome5 name="users-cog" size={size} color={color}/>
        )
      }}
    />
  </Tabs>
  )
}

export default TabsLayout;
