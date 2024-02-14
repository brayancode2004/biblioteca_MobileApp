import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Colors from "../../../constants/Colors"
import { FlatList } from "react-native-gesture-handler"
import { obtenerPrestamosPorEstudiante } from "../../../services/PrestamosService"
import { useEffect, useState } from "react"
import { useAuth } from "../../../providers/AuthProvider"
import PrestamoItem from "../../../components/MisPrestamos/PrestamoItem";
import { prestamo } from "../../../types"

function PrestamosScreen() {
  const [prestamos, setPrestamos] = useState<prestamo[] | null>(null);
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrestamos = async () => {
      if (session && 'cif' in session) {
        const prestamosResponse = await obtenerPrestamosPorEstudiante(session.cif);
        setPrestamos(prestamosResponse);
        setLoading(false);
      }
    };
    fetchPrestamos();
  }, [session]);
  
  
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Mis Préstamos</Text>
        {
          loading ? (
            <ActivityIndicator/>
          ) :
          (
            prestamos?.length ?? 0 > 0 ? (
                <FlatList 
                data={prestamos}
                renderItem={({ item, index }) => <PrestamoItem prestamo={item}/>}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
              />
              ):(
                <View style={[styles.flatList, {justifyContent: 'center', alignItems: 'center'}]}>
                  <Text style={{fontSize: 40, fontWeight: '700', color:Colors.light.gray}}>¡Aún no has prestado ningún libro🤡🤡!</Text>
                </View>
              )
          )
           
        }
        

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.light.pureWhite,
    marginLeft: 17,
    marginVertical: 22
  },
  flatList: {
    flex: 1,
    backgroundColor: Colors.light.pureWhite,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  flatListContent: {
    gap: 14,
    padding: 22,
  }
})

export default PrestamosScreen
