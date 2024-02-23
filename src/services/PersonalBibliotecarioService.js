import axios from "axios";
import { EXPO_PUBLIC_API_URL } from '@env';

const API_URL = `${EXPO_PUBLIC_API_URL}/personalbibliotecario`;

export const loginPersonalBibliotecario = (credenciales) => {
    return axios.post(`${API_URL}/login`,credenciales)
}   

export const obtenerPersonalBibliotecarioPorCorreo = (correo) => {
    return axios.get(`${API_URL}/findByCorreo`, {params: { correo: correo} })
}