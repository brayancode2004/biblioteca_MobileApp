import axios from "axios";
import { REACT_NATIVE_APP_API_URL } from '@env';

const API_URL = `${REACT_NATIVE_APP_API_URL}/categorias`;

// Obtener todos los autores
export const obtenerTodasLasCategorias = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};