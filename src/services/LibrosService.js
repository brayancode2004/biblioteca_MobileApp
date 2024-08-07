import axios from "axios";
import { EXPO_PUBLIC_API_URL } from '@env';
import { Alert } from "react-native";

const API_URL = `${EXPO_PUBLIC_API_URL}/libros`;
console.log(API_URL)

export const obtenerLibrosPorCategorias = (categoria1, categoria2) => {
    return axios.get(`${API_URL}/buscarPorCategorias`, {
        params: {
            categoria1: categoria1,
            categoria2: categoria2
        }
    });
};

export const obtenerLibroPorId = async (idLibro) => {
    const response = await axios.get(`${API_URL}/findById`, { params: {id: idLibro} })
    return response.data
}

export const obtenerTodosLosLibros = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};


export const crearLibroConAutoresYUbicacion = async (libroDto) => {
    const response = await axios.post(`${API_URL}/crearConAutores`, libroDto);
    return response.data;
};

// Método para deshabilitar un libro
export const deshabilitarLibro = async (idLibro) => {
    const response = await axios.put(`${API_URL}/deshabilitar/${idLibro}`);
    return response.data;
};

// Método para actualizar un libro
export const actualizarLibro = async (idLibro, libroDto) => {
    const response = await axios.put(`${API_URL}/actualizar/${idLibro}`, libroDto);
    return response.data;
};

export const buscarLibros = (keyword) => {
    return axios.get(`${API_URL}/buscar`, {
        params: {
            query: keyword
        }
    });
};

export const obtenerLibrosPaginados = async ( page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/allPaginados`, {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        Alert.alert('Error al obtener el inventario de los libros:', error.message);
    } 
}; 