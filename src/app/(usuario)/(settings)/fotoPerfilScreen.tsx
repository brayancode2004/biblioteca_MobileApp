import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'expo-image';
import Colors from '../../../constants/Colors';
import ConfiguracionesHeader from '../../../components/Configuraciones/ConfiguracionesHeader';
import { useAuth } from '../../../providers/AuthProvider';
import { cambiarFotoPerfilEstudiante, obtenerEstudiantePorId } from '../../../services/EstudianteService';
import { bibliotecaria, user } from '../../../types';
import * as ImagePicker from 'expo-image-picker';

function FotoPerfilScreen() {
  const { session, setSession } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [userPic, setUserPic] = useState<string | null>(null);
  const usuarioPic = 'https://firebasestorage.googleapis.com/v0/b/uamlibrary-b1bf8.appspot.com/o/Usuariodeafult.png?alt=media&token=269530ac-2118-404c-a6b3-c198d5155210&_gl=1*177w5p9*_ga*NDY3OTM0Mzk2LjE2ODM4NDE3NDk.*_ga_CW55HF8NVT*MTY4NTQyNzE4MC4xNC4xLjE2ODU0MjgyNTMuMC4wLjA.'
  const usuariaPic = 'https://firebasestorage.googleapis.com/v0/b/uamlibrary-b1bf8.appspot.com/o/Usuariodefault.png?alt=media&token=3eb4b518-742a-4362-aa22-a8c63ab86399&_gl=1*tt5zuz*_ga*NDY3OTM0Mzk2LjE2ODM4NDE3NDk.*_ga_CW55HF8NVT*MTY4NTQyNzE4MC4xNC4xLjE2ODU0MjgzMzkuMC4wLjA.'

  useEffect(() => {
    const fetchUserData = async () => {
      if(session && 'cif' in session){
          const response = await obtenerEstudiantePorId(session.cif)
          setSession(response.data);
          setLoading(false)
      }
    }
    fetchUserData();
  },[])

  const imageToBase64 = async (uri: any) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  };
  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setUserPic(result.assets[0].uri);
      handleChangeImage(result.assets[0].uri);
    }
  };
  
  const handleChangeImage = async (uri : any) => {
    if (!uri.startsWith('file://')) {
      return;
    }
  
    try {
      setIsUploading(true);
      const base64 = await imageToBase64(uri);
  
      // Guardar base64 en la base de datos y actualizar sesión
      if(session && 'cif' in session){
        await cambiarFotoPerfilEstudiante(session.cif, base64);
        setSession((prevSession: user | bibliotecaria | null) => ({
          ...(prevSession as any), // Asegúrate de que prevSession sea de tipo user o bibliotecaria
          userPic: base64
        }));        
      }

    } catch (error) {
      console.error('Error converting image to base64:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  

    
  const handleDeletePicture = async () => {
    try{
      setIsUploading(true)
      if(session?.sexo === 'M' && session.role === 'user'){
        await cambiarFotoPerfilEstudiante('cif' in session && session.cif, usuarioPic);
        setSession((prevSession: user | bibliotecaria | null) => ({
          ...(prevSession as user | bibliotecaria), // Asegúrate de que prevSession sea de tipo user o bibliotecaria
          userPic: usuarioPic,
        }));
      }
      if(session?.sexo === 'F' && session.role === 'user'){
        await cambiarFotoPerfilEstudiante('cif' in session && session.cif, usuariaPic);
        setSession((prevSession: user | bibliotecaria | null) => ({
          ...(prevSession as user | bibliotecaria), // Asegúrate de que prevSession sea de tipo user o bibliotecaria
          userPic: usuariaPic,
        }));
      }
      setIsUploading(false)
    }catch(e: any){
      console.warn(e.message)
    }

  }
  if(loading){
    <View style={{
      flex:1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: Colors.light.pureWhite}}
    >
      <ActivityIndicator/>
    </View>
  }else{
    return (
      <View style={styles.container}>
          <ConfiguracionesHeader title={'Foto de Perfil'}/>
          <View style={styles.imageContainer}>
            {isUploading ? (
              <View style={[styles.profilePicture, 
                {backgroundColor: Colors.light.clearGray, 
                justifyContent: 'center', 
                alignItems: 'center'
                }]}>
                <ActivityIndicator color={Colors.light.primary}/>
              </View>
            ): (
              <Image source={{ uri: session?.userPic}} style={styles.profilePicture} />
            )
            }
          </View>
            <TouchableOpacity style={styles.changeBtn} onPress={pickImage} disabled={isUploading}>
              <Text style={styles.changeBtnText}>
              {session?.userPic === usuarioPic || session?.userPic === usuariaPic ? isUploading ? 'Añadiendo Foto...' : 'Añadir Foto' : isUploading ? 'Cambiando Foto...' : 'Cambiar Foto'}
              </Text>
            </TouchableOpacity>
            {session?.userPic === usuarioPic || session?.userPic === usuariaPic ? '' : <Text style={styles.deleteBtn} onPress={handleDeletePicture}>Borrar Foto</Text> }
      </View>
    )
  }
}

export default FotoPerfilScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.pureWhite,
    },
    profilePicture: {
      width: 200, 
      height: 200,
      borderRadius: 100
    },
    imageContainer: {
      marginTop: 22,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000', // Sombras en iOS
      shadowOffset: { width: 1, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    changeBtn: {
      backgroundColor: Colors.light.primary,
      width: '80%',
      padding: 11,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 22,
      marginTop: 50
    },
    changeBtnText: {
      color: Colors.light.pureWhite,
      fontSize: 18,
      fontWeight: '600'
    },
    deleteBtn: {
      color: Colors.light.primary,
      fontSize: 15,
      fontWeight: '600',
      alignSelf: 'center',
      marginTop: 11
    }
})