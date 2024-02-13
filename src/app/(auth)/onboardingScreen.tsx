import { Link, Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';

import Animated, {
  FadeIn,
  FadeOut,
  BounceInRight,
  SlideOutLeft,
  BounceOutLeft,
  SlideInRight,
} from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import { Image } from 'expo-image';
import { useAuth } from '../../providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onboardingSteps = [
  {
    id: 1,
    icon: require('../../../assets/onboarding1.svg'),
    title: 'Explora Nuestra Biblioteca',
    description: 'Descubre una vasta colección de libros de literatura y académicos disponibles para préstamo.',
  },
  {
    id: 2,
    icon: require('../../../assets/onboarding2.svg'),
    title: 'Califica y Opina',
    description: 'Comparte tus pensamientos calificando libros y dejando reseñas para ayudar a otros a encontrar excelentes lecturas.',
  },
  {
    id: 3,
    icon: require('../../../assets/onboarding3.png'),
    title: 'Préstamo Sencillo',
    description: 'Toma prestados libros de manera sencilla utilizando códigos QR generados por la aplicación, haciendo tu experiencia en la biblioteca más fluida.',
  },
];

export default function OnboardingScreen() {
  const { session } = useAuth()
  const [screenIndex, setScreenIndex] = useState(0);

  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };

  const onBack = () => {
    const isFirstScreen = screenIndex === 0;
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = async () => {
    setScreenIndex(0);
    await AsyncStorage.setItem('@firstLaunch', 'true')
    if(session?.role == 'user'){
      router.push('(usuario)/homeScreen');
    }else{
      router.push('(bibliotecario)/homeScreen')
    }
  };

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View style={styles.stepIndicatorContainer}>
        {onboardingSteps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.stepIndicator,
              { backgroundColor: index === screenIndex ? Colors.light.primary : '#FCD8CC' },
            ]}
          />
        ))}
      </View>

      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={screenIndex}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            {/* <FontAwesome5
              style={styles.image}
              name={data.icon}
              size={150}
              color={Colors.light.primary}
            /> */}
            <Image source={data.icon}
              style={[styles.image,data.id == 1 ? styles.imagen1 : data.id == 2 ? styles.imagen2 : styles.imagen3]}
            />
          </Animated.View>

          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
              style={styles.description}
            >
              {data.description}
            </Animated.Text>

            <View style={styles.buttonsRow}>
              <Text onPress={endOnboarding} style={styles.buttonText}>
                Saltar
              </Text>

              <Pressable onPress={onContinue} style={styles.button}>
                <Text style={[styles.buttonText, { color: 'white'}]}>Continuar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 70,
  },
  imagen1: {
    width: 371,
    height: 299

  },
  imagen2: {
    width: 403,
    height: 270
  },
  imagen3: {
    width: 400,
    height: 400
  },
  title: {
    color: Colors.light.primary,
    fontSize: 50,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  footer: {
    marginTop: 'auto',
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: Colors.light.primary,
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: Colors.light.primary,
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },

  // steps
  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 15,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
});