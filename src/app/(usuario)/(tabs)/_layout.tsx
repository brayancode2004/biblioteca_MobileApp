import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


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
      name="(descubrir)"
      options={{
        title: "Descubrir",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="search" size={size} color={color}/>
        ),
      }}
    />
    <Tabs.Screen 
        name="prestamosScreen"
        options={{
            title: "Mis Préstamos",
            tabBarIcon: ({ size, color}) => (
              <Ionicons name='library' size={size} color={color}/>
            ),
            unmountOnBlur: true
        }}
    />
    <Tabs.Screen
      name="favoritosScreen"
      options={{
        title: "Favoritos",
        tabBarIcon: ({ size, color}) => (
          <MaterialIcons name="favorite" size={size} color={color}/>
        )
      }}
    />
  </Tabs>
  )
}

export default TabsLayout;
