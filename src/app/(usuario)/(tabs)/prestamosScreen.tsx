import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { obtenerPrestamosPorEstudiantePaginados } from '../../../services/PrestamosService';
import { useAuth } from '../../../providers/AuthProvider';
import PrestamoItem from '../../../components/MisPrestamos/PrestamoItem';
import { prestamo } from '../../../types';
import Colors from '../../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isUser } from '../../../utils/Functions';

function PrestamosScreen() {
  const [prestamos, setPrestamos] = useState<prestamo[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [listEnded, setListEnded] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const pageSize = 5;
  const { session } = useAuth();

  const fetchPrestamos = async (isRefreshing = false) => {
    if (loading || !session || !isUser(session)) return;

    setLoading(true);
    try {
      const pageToFetch = isRefreshing ? 0 : nextPage;
      const response = await obtenerPrestamosPorEstudiantePaginados(session.cif, pageToFetch, pageSize);
      if (response.content.length > 0) {
        setPrestamos(prevPrestamos => isRefreshing ? response.content : [...prevPrestamos, ...response.content]);
        setNextPage(pageToFetch + 1);
      } else {
        setListEnded(true);
      }
    } catch (error: any) {
      Alert.alert('Error al obtener tus préstamos:', error.message);
    } finally {
      setLoading(false);
      if (isRefreshing) setRefreshing(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (session && isUser(session)) {
      fetchPrestamos(true);
    }
  }, [session]);

  const onRefresh = () => {
    setRefreshing(true);
    setListEnded(false);
    fetchPrestamos(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis Préstamos</Text>
      {
        initialLoading ? (
          <View style={[styles.flatList, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
          </View>
        ) : (
          prestamos.length > 0 ? (
            <FlatList
              data={prestamos}
              renderItem={({ item }) => <PrestamoItem prestamo={item} />}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[Colors.light.primary]}
                  tintColor={Colors.light.primary}
                />
              }
              onEndReached={() => !listEnded && fetchPrestamos()}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => loading && !refreshing && <ActivityIndicator size="small" color={Colors.light.primary} />}
            />
          ) : (
            <View style={[styles.flatList, { justifyContent: 'center', alignItems: 'center' }]}>
              <Text style={{ fontSize: 40, fontWeight: '700', color: Colors.light.gray }}>¡Aún no has prestado ningún libro🤡🤡!</Text>
            </View>
          )
        )
      }
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

