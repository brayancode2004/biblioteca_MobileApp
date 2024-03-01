import React, { useState } from "react";
import { StyleSheet,View, Switch, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PromotionSlider from "../../../components/Home/PromotionSlider";
import Header from "../../../components/Home/Header";
import TopAutores from "../../../components/Home/TopAutores";
import { ScrollView } from "react-native-gesture-handler";
import BooksSlider from "../../../components/Home/BooksSlider";
import ToggleSwitch from "../../../components/Home/CategorySwitch";

export default function HomeScreen() {
  const [category1, setCategory1] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60}}>
          <View style={styles.componentsContainer}>
            <Header />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
  },
  componentsContainer: {
    gap: 15
  },
  slidersContainer: {
    gap: 18,
    marginTop: 20
  },
  categoriesContainer:{
    gap: 28
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