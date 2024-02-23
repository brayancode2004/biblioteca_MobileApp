import { useEffect, useState } from "react";
import { Redirect, Stack, router } from "expo-router"
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Inter_900Black,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_400Regular,
} from '@expo-google-fonts/inter';
import Animated, { FadeIn } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthProvider, {useAuth} from "../providers/AuthProvider";
import { esCorreoValido, obtenerUsuario } from "../utils/Functions";
import { obtenerEstudiantePorId } from "../services/EstudianteService";
import { obtenerPersonalBibliotecarioPorCorreo } from "../services/PersonalBibliotecarioService";

function RootLayout() {
  const { setSession } = useAuth(); // Obtén el contexto AuthContext
  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,

    // Amatic: AmaticSC_400Regular,
    // AmaticBold: AmaticSC_700Bold,
  });

  useEffect(() => {
    const checkUserLogged = async () => {
      const userLogged = await obtenerUsuario();
      if(userLogged){
        if(!esCorreoValido(userLogged)){
          try{
            const usuario = await obtenerEstudiantePorId(userLogged);
            setSession(usuario.data);
          }catch(e){
            console.warn(e)
          }
        }else {
          try{
            const bibliotecario = await obtenerPersonalBibliotecarioPorCorreo(userLogged);
            setSession(bibliotecario.data)
          }catch(e){
            console.warn(e)
          }
        }    
      }else {
        setSession(null);
      }
    }
    checkUserLogged();
    if(fontsLoaded || fontError){
      setAppReady(true)
    }
    
  },[fontsLoaded, fontError])

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
          <Stack screenOptions={{ headerShown: false}} >
              <Stack.Screen name="(usuario)" options={{ headerShown: false}}/>
              <Stack.Screen name="(bibliotecario)" options={{ headerShown: false}}/>
              <Stack.Screen 
                name="(bookDetails)" 
                options={{ headerShown: false}} 
              />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(misPrestamos)" options={{ presentation: 'fullScreenModal'}}/>
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
