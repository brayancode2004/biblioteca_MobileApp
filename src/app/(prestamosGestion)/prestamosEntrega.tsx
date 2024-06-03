import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, Camera, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { prestamoDTO } from '../../types';

const { width, height } = Dimensions.get('window');
const qrSize = 300;

function PrestamosEntrega() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [mode, setMode] = useState('scan'); // 'scan' or 'enter'
  const [codigoRetiro, setCodigoRetiro] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert('Código QR Escaneado', `Código: ${data}`);
    // Aquí debes consumir el servicio de búsqueda de préstamo con el código de retiro
    // fetchLoanDetails(data);
  };

  const fetchLoanDetails = async (codigoRetiro : string) => {
    try {
      const response = await fetch(`YOUR_API_ENDPOINT_HERE/${codigoRetiro}`);
      const loanDetails = await response.json();
      // Manejar los detalles del préstamo aquí
      console.log(loanDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleManualEntry = () => {
    if (codigoRetiro) {
     Alert.alert('Código de Retiro Ingresado', `Código: ${codigoRetiro}`);
    //   fetchLoanDetails(codigoRetiro);
    } else {
      Alert.alert('Error', 'Por favor, ingrese un código de retiro.');
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Necesitamos permiso para usar la cámara</Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name='arrow-back-outline' size={24} color={Colors.light.primary} />
      </TouchableOpacity>
      {mode === 'scan' && (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        >
          <View style={styles.overlay}>
            <View style={[styles.mask, styles.maskTop]} />
            <View style={[styles.mask, styles.maskBottom]} />
            <View style={[styles.mask, styles.maskLeft]} />
            <View style={[styles.mask, styles.maskRight]} />
            <Text style={styles.title}>Escanea el Código QR</Text>
            <Text style={styles.subtitle}>Pídele al usuario que te lo muestre desde su dispositivo</Text>
            <View style={styles.qrArea} />
          </View>
        </CameraView>
      )}
      {mode === 'enter' && (
        <KeyboardAwareScrollView contentContainerStyle={styles.inputContainer}>
          <Text style={styles.titleTwo}>Ingresa el código de Retiro</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el código de retiro"
            value={codigoRetiro}
            onChangeText={setCodigoRetiro}
          />
          <TouchableOpacity onPress={handleManualEntry} style={styles.ingresarBtn}>
            <Text style={styles.ingresarBtnText}>Entregar/Recibir</Text>
          </TouchableOpacity>
          {/* <Button title="Entregar/Recibir" onPress={handleManualEntry} color={Colors.light.secondary} /> */}
        </KeyboardAwareScrollView>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'scan' && styles.activeModeButton]}
          onPress={() => {
            setMode('scan');
            setScanned(false); // Restablecer el estado de escaneo
          }}
        >
          <Text style={styles.modeButtonText}>Escanear código</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'enter' && styles.activeModeButton]}
          onPress={() => setMode('enter')}
        >
          <Text style={styles.modeButtonText}>Ingresar código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PrestamosEntrega;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 22,
    padding: 8,
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mask: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  maskTop: {
    top: 0,
    left: 0,
    right: 0,
    height: (height-40 - qrSize) / 2,
  },
  maskBottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: (height-140 - qrSize) / 2,
  },
  maskLeft: {
    top: (height-40 - qrSize) / 2,
    bottom: (height-140 - qrSize) / 2,
    left: 0,
    width: (width - qrSize) / 2,
  },
  maskRight: {
    top: (height-40 - qrSize) / 2,
    bottom: (height-140 - qrSize) / 2,
    right: 0,
    width: (width - qrSize) / 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primary,
    position: 'absolute',
    top: '20%',
    textAlign: 'center',
  },
  titleTwo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primary, // Cambiado a negro para visibilidad en fondo blanco
    textAlign: 'center',
    marginBottom: 10, // Espacio entre el título y el subtítulo
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.light.white,
    marginBottom: 40,
  },
  qrArea: {
    width: qrSize,
    height: qrSize,
    backgroundColor: 'transparent',
    borderRadius: 20
  },
  inputContainer: {
    flex: 1, // Para centrar verticalmente
    justifyContent: 'center', // Para centrar verticalmente
    alignItems: 'center', // Para centrar horizontalmente
    gap: 5
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 20,
  },
  ingresarBtn: {
    width: 150,
    padding: 8,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
  },
  ingresarBtnText: {
    alignSelf: 'center',
    color: Colors.light.clearGray,
    fontWeight: '600',
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    paddingBottom: 26,
  },
  modeButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#ccc',
  },
  activeModeButton: {
    backgroundColor: Colors.light.primary,
  },
  modeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


