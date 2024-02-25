import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../providers/AuthProvider';
import { obtenerLibroPorId } from '../../services/LibrosService';
import { book } from '../../types';
import BookInfoSection from '../../components/BookDetails/BookInfoSection';
import Colors from '../../constants/Colors';
import { renderStarRating } from '../../utils/Functions';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function BookCalificarScreen() {
  const { session } = useAuth();
  const { idLibro } = useLocalSearchParams();
  const [libro, setLibro] = useState<book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [calificando, setCalificando] = useState(false)



  const fetchLibrosData = async () => {
    try {
      const response = await obtenerLibroPorId(idLibro);
      setLibro(response);
      setLoading(false);
    } catch (e : any) {
      const mensajeError = e.response && e.response.data && typeof e.response.data === 'object' 
      ? e.response.data.message 
      : e.response.data;
      setError(mensajeError)
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrosData();
  }, [idLibro]);

  const handleCalificar = async () => {
    console.warn('Calificado')
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  } else if(libro){
    return (
      <View style={styles.root}>
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1}}>
          <View style={styles.infoSectionContainer}>
              <BookInfoSection book={libro} prestamo={false} calificacion={true}/>
          </View>

          {/* Description */}
          <View style={styles.calificarFormContainer}>
            <View style={styles.starsFormContainer}>
              <Text style={styles.starsFormTitle}>Tu Calificación en base a 5 estrellas</Text>
              <View style={styles.starsContainer}>
                {renderStarRating(5)}
              </View>
            </View>
            <View style={styles.comentarioFormContainer}>
              <Text style={styles.comentarioFormTitle}>Añade un Comentario</Text>
              <View style={styles.comentarioFormTextInputContainer}>
                <TextInput
                  placeholder='Danos tu opinión sobre el libro'
                  style={styles.comentarioFormTextInput}
                  multiline={true}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

          {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <View style={{ flex: 1}}>
              <View style={styles.containerBtn}>
                <TouchableOpacity style={styles.prestarBtn}  disabled={calificando} onPress={handleCalificar}>
                  <Text style={styles.prestarText}>{ calificando ? 'Calificando...' : 'Calificar' }</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
      </View>

      
    )
  }

}

export default BookCalificarScreen

const windowWidth =  Dimensions.get('window').width
const windowHeight =  Dimensions.get('window').height

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.pureWhite
  },
  infoSectionContainer: {
    flex: 2.4,
  },
  calificarFormContainer: {
    flex: 2,
    marginTop: 50,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    marginHorizontal: 22
  },
  starsFormContainer: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11
  },
  starsFormTitle: {
    color: Colors.light.gray,
    fontSize: 16,
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4
  },
  comentarioFormContainer: {
    marginTop: 22,
    gap: 11,
    paddingHorizontal: 11
  },
  comentarioFormTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  comentarioFormTextInputContainer: {
    backgroundColor: Colors.light.clearGray,
    borderRadius: 11,
    paddingTop: 4,
    height: '60%',
  },
  comentarioFormTextInput: {
    backgroundColor: Colors.light.clearGray,
    paddingHorizontal: 14,
    borderRadius: 11,
    fontSize: 16,
  },
  buttonsContainer: {
    height: 135,
  },
  containerBtn: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    height:  windowHeight > 850 ? 100 : 80,
    width: '100%',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingBottom: windowHeight > 850 ? 20 : 10,
    paddingTop: windowHeight > 850 ? 10 : 5,
    padding: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,  
    elevation: 5,
    backgroundColor: '#fff'
},
prestarBtn: {
    flex: 1,
    flexDirection: 'row',
    gap: 11,
    backgroundColor: '#F9410B',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 28,
    elevation: 8, // Sombras en Android
    shadowColor: '#000', // Sombras en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
},
prestarText: {
    fontSize: 18,
    lineHeight: 22,
    color: 'white',
    fontWeight: '600'
}
})