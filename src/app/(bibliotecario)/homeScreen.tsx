import React, { useState } from "react";
import { StyleSheet,View, Switch, Text, TouchableOpacity, Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PromotionSlider from "../../components/Home/PromotionSlider";
import Header from "../../components/Home/UserHeader";
import TopAutores from "../../components/Home/TopAutores";
import { ScrollView } from "react-native-gesture-handler";
import BooksSlider from "../../components/Home/BooksSlider";
import ToggleSwitch from "../../components/Home/CategorySwitch";
import 'react-native-reanimated';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";



export default function HomeScreen() {
  const [category1, setCategory1] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.componentsContainer}>
        <Header />
        <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => router.push('(prestamosGestion)/prestamosQr')} style={styles.qrBtn}>
            <MaterialCommunityIcons name="qrcode-scan" size={200} color={Colors.light.pureWhite} />
            <Text style={styles.qrBtnTitle}>Entrega/Recibe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
  },
  componentsContainer: {
    gap: 15,
    flex: 1
  },
  qrBtn: {
    padding: 6,
    width: '90%',
    height: 350,
    gap: 29,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 11,
      },
    }),
  },
  qrBtnTitle: {
    fontWeight: 'bold',
    color: Colors.light.pureWhite,
    fontSize: 29
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