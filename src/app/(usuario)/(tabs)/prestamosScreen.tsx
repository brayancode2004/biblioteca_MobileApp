import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { obtenerPrestamosPorEstudiante } from '../../../services/PrestamosService';
import { useAuth } from '../../../providers/AuthProvider';
import PrestamoItem from '../../../components/MisPrestamos/PrestamoItem';
import { prestamo } from '../../../types';
import Colors from '../../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

function PrestamosScreen() {
  const [prestamos, setPrestamos] = useState<prestamo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrestamos = async () => {
    if (session && 'cif' in session) {
      try {
        const prestamosResponse = await obtenerPrestamosPorEstudiante(session.cif);
        setPrestamos(prestamosResponse);
      } catch (error) {
        console.error("Error al obtener los préstamos:", error);
      } finally {
        setLoading(false);
        setRefreshing(false); // Detener el indicador de refreshing
      }
    } else {
      setLoading(false);
      setRefreshing(false); // Detener el indicador de refreshing
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, [session]);

  const onRefresh = () => {
    setRefreshing(true); // Iniciar el indicador de refreshing
    fetchPrestamos(); // Volver a cargar los datos
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis Préstamos</Text>
      <FlatList
        data={prestamos}
        renderItem={({ item, index }) => <PrestamoItem prestamo={item} />}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        refreshControl={ // Agregar el RefreshControl a la FlatList
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.light.primary]} // Color del indicador de refreshing en Android
            tintColor={Colors.light.primary} // Color del indicador de refreshing en iOS
          />
        }
      />
    </SafeAreaView>
  );
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
});

export default PrestamosScreen;

