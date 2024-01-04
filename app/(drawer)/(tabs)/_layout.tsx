import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';


function TabsLayout () {
  return (
  <Tabs screenOptions={{ headerLeft: () => <DrawerToggleButton/>}} initialRouteName="index">
    <Tabs.Screen 
        name="index" 
        options={{ 
            title: "Home",
            tabBarIcon: ({ size, color}) => (
              <Ionicons name='home-outline' size={size} color={color}/>
            )
        }}
    />
    <Tabs.Screen 
        name="prestamosScreen"
        options={{
            title: "Mis Préstamos",
            tabBarIcon: ({ size, color}) => (
              <Ionicons name='library-outline' size={size} color={color}/>
            )
        }}
    />
  </Tabs>
  )
}

export default TabsLayout;
