import axios from "axios";
import { EXPO_PUBLIC_API_URL } from '@env';
import { Alert } from "react-native";


const API_URL = `${EXPO_PUBLIC_API_URL}/calificaciones`;

// Suponiendo que tu archivo se llama "LibrosService.js" o algo similar

export const enviarCalificacion = (cifEstudiante, idLibro, puntuacion) => {
    return axios.post(`${API_URL}/guardar`, {
        cifEstudiante,
        idLibro,
        puntuacion
    });
};

export const verificarCalificacion = async (cifEstudiante, idLibro) => {
    try {
        const response = await axios.get(`${API_URL}/yaCalificado`, {
            params: {
                cifEstudiante: cifEstudiante,
                idLibro: idLibro
            }
        });
        return response.data;
    } catch (error) {
        Alert.alert('Error al verificar la calificación', error);
    }
};

export const obtenerCalificacionDeUsuario = async (cifEstudiante, idLibro) => {
    try {
        const response = await axios.get(`${API_URL}/obtenerCalificacion`, {
            params: {
                cifEstudiante: cifEstudiante,
                idLibro: idLibro
            }
        });
        return response.data;
    } catch (error) {
        Alert.alert('Error al obtener la calificación del usuario:', error);
    }
};


export const obtenerCalificacionesPorLibro = async (idLibro, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/calificacionesPorLibro`, {
            params: {
                idLibro: idLibro,
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        Alert.alert('Error al obtener las calificaciones del libro:', error);
    }
};