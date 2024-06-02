import axios from "axios";
import { EXPO_PUBLIC_API_URL } from '@env';

const API_URL = `${EXPO_PUBLIC_API_URL}/autores`;
console.log(EXPO_PUBLIC_API_URL)

// Obtener todos los autores
export const obtenerTodosLosAutores = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};

// Obtener un autor por ID
export const obtenerAutorPorId = async (idAutor) => {
    const response = await axios.get(`${API_URL}/findById`, { params: { id: idAutor } });
    return response.data;
};

// Agregar un nuevo autor
export const agregarAutor = async (autor) => {
    const response = await axios.post(`${API_URL}/save`, autor);
    return response.data;
};

// Buscar autores por nombre (basado en el nuevo endpoint que has añadido)
export const buscarAutoresPorNombre = async (nombre) => {
    const response = await axios.get(`${API_URL}/buscarPorNombre`, { params: { nombre } });
    return response.data;
};

// Actualizar un autor
export const actualizarAutor = async (idAutor, autor) => {
    const response = await axios.put(`${API_URL}/update/${idAutor}`, autor);
    return response.data;
};

// Deshabilitar (eliminar lógicamente) un autor
export const deshabilitarAutor = async (idAutor) => {
    const response = await axios.put(`${API_URL}/deshabilitar/${idAutor}`);
    return response.data;
};

// Nueva función para obtener libros por autor
export const obtenerLibrosPorAutor = async (idAutor) => {
    const response = await axios.get(`${API_URL}/librosAutor/${idAutor}`);
    return response.data;
};

export const obtenerAutoresPaginados = async ( page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/allPaginados`, {
            params: {
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        Alert.alert('Error al obtener el inventario de los autores:', error.message);
    } 
};


