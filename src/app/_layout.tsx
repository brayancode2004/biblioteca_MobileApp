import { Stack } from "expo-router"

function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}} initialRouteName="(auth)" >
        <Stack.Screen name="(drawer)" options={{ headerShown: false}}/>
        <Stack.Screen 
          name="bookDetails/[id]" 
          options={{ headerShown: false}} 
        />
        <Stack.Screen name="(auth)"/>
    </Stack>
  )
}

export default RootLayout
