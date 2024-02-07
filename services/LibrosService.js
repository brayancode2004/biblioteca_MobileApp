import axios from "axios";
import { REACT_NATIVE_APP_API_URL } from '@env';

const API_URL = 'http://192.168.1.232:8181/api/libros';

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