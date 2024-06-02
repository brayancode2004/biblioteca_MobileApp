import axios from "axios";
import { EXPO_PUBLIC_API_URL } from '@env';

const API_URL = `${EXPO_PUBLIC_API_URL}/categorias`;
console.log(EXPO_PUBLIC_API_URL)


// Obtener todos los autores
export const obtenerTodasLasCategorias = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};