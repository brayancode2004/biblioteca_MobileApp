import { useEffect, useState } from "react";
import { Redirect, Stack, router } from "expo-router"
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthProvider, {useAuth} from "../providers/AuthProvider";
import { obtenerUsuario } from "../utils/Functions";

function RootLayout() {
  const { setSession } = useAuth(); // Obtén el contexto AuthContext
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);
  // const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const checkUserLogged = async () => {
      const userLogged = await obtenerUsuario();
      if(userLogged){
        setSession(userLogged);
      }else {
        setSession(null);
      }
    }
    checkUserLogged();
    setAppReady(true)
  },[])

  const showAnimatedSplash = !appReady || !splashAnimationFinished;
  if (showAnimatedSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            setSplashAnimationFinished(true);
          }
        }}
      />
    );
  }

  return (
      <GestureHandlerRootView style={{ flex: 1}}>
        <Animated.View style={{ flex: 1}} entering={FadeIn}>
          <Stack screenOptions={{ headerShown: false}} initialRouteName="(auth)" >
              <Stack.Screen name="(usuario)" options={{ headerShown: false}}/>
              <Stack.Screen name="(bibliotecario)" options={{ headerShown: false}}/>
              <Stack.Screen 
                name="bookDetails/[id]" 
                options={{ headerShown: false}} 
              />
              <Stack.Screen name="(auth)" />
          </Stack>
        </Animated.View>
      </GestureHandlerRootView>
  )
}


function RootLayoutWithAuthProvider() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

export default RootLayoutWithAuthProvider
