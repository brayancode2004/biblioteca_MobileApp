import axios from "axios";
import { REACT_NATIVE_APP_API_URL } from '@env';

const API_URL = `${REACT_NATIVE_APP_API_URL}/multas`;

export const obtenerMultaPorPrestamo = async (idPrestamo) => {
    const response = await axios.get(`${API_URL}/obtenerPorPrestamo`, {
        params: { idPrestamo }
    });
    return response.data;
};

// Función para desactivar la multa asociada a un préstamo
export const desactivarMultaPorPrestamo = async (idPrestamo) => {
    const response = await axios.put(`${API_URL}/desactivarPorPrestamo/${idPrestamo}`);
    return response.data;
};