import axios from "axios";

const API_URL = `${process.env.REACT_NATIVE_APP_API_URL}/categorias`;

// Obtener todos los autores
export const obtenerTodasLasCategorias = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};