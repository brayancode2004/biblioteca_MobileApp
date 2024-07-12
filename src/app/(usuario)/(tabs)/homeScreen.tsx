import React, { useState, useEffect } from "react";
import { StyleSheet,View, Switch, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PromotionSlider from "../../../components/Home/PromotionSlider";
import Header from "../../../components/Home/UserHeader";
import TopAutores from "../../../components/Home/TopAutores";
import { ScrollView } from "react-native-gesture-handler";
import BooksSlider from "../../../components/Home/BooksSlider";
import ToggleSwitch from "../../../components/Home/CategorySwitch";
import { useAuth } from "../../../providers/AuthProvider";
import 'react-native-reanimated';


export default function HomeScreen() {
  const { setSession, session} = useAuth()
  const [category1, setCategory1] = useState(true);
  // console.warn(session)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60}}>
          <View style={styles.componentsContainer}>
            <Header/>
            {/* Slider con imágenes Promocionales */}
            <PromotionSlider />
            {/* Slider Top Autores */}
            <TopAutores discover={false}/>
            <View style={styles.slidersContainer}>
              <ToggleSwitch isAcademic={category1} setIsAcademic={setCategory1}/>
              <View style={styles.categoriesContainer}>
                {
                  category1 === true ? (
                    <>
                    <BooksSlider category1={'Literatura'} category2={"Adolescente"}/>
                    <BooksSlider category1={'Literatura'} category2={"Ficción"}/>
                    <BooksSlider category1={'Literatura'} category2={"Thriller"}/>
                    <BooksSlider category1={'Literatura'} category2={"Biografía"}/>
                    <BooksSlider category1={'Literatura'} category2={"Poesía"}/>
                    </>
                  ):(
                    <>
                      <BooksSlider category1={'Académico'} category2={"Medicina"}/>
                      <BooksSlider category1={'Académico'} category2={"Ingeniería"}/>
                      <BooksSlider category1={'Académico'} category2={"Derecho"}/>
                      <BooksSlider category1={'Académico'} category2={"Marketing"}/>
                      <BooksSlider category1={'Académico'} category2={"Arquitectura"}/>
                    </>
                  )
                }
              </View>

            </View>
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