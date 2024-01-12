import React from "react";
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PromotionSlider from "../../../components/Home/PromotionSlider";
import Header from "../../../components/Home/Header";
import SearchBar from "../../../components/Home/SearchBar";
import TopAutores from "../../../components/Home/TopAutores";
import { ScrollView } from "react-native-gesture-handler";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={styles.componentsContainer}>
            <Header />
            {/* Slider con imágenes Promocionales */}
            <PromotionSlider />
            {/* Slider Top Autores */}
            <TopAutores />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
  },
  componentsContainer: {
    gap: 15
  }
 
});

const carouselData = [
  {
    id: "01",
    name: 'Slider 1',
    image: 'https://firebasestorage.googleapis.com/v0/b/uamlibrary-b1bf8.appspot.com/o/Captura%20de%20pantalla%202024-01-05%20a%20la(s)%2011.54.51%E2%80%AFp.%C2%A0m..png?alt=media&token=f2432433-530e-4a12-becc-c94760c26bf9'
  },
  {
    id: "02",
    name: 'Slider 2',
    image: 'https://firebasestorage.googleapis.com/v0/b/uamlibrary-b1bf8.appspot.com/o/Captura%20de%20pantalla%202024-01-05%20a%20la(s)%2011.54.51%E2%80%AFp.%C2%A0m..png?alt=media&token=f2432433-530e-4a12-becc-c94760c26bf9'
  },
  {
    id: "03",
    name: 'Slider 3',
    image: 'https://firebasestorage.googleapis.com/v0/b/uamlibrary-b1bf8.appspot.com/o/Captura%20de%20pantalla%202024-01-05%20a%20la(s)%2011.54.51%E2%80%AFp.%C2%A0m..png?alt=media&token=f2432433-530e-4a12-becc-c94760c26bf9'
  },
]