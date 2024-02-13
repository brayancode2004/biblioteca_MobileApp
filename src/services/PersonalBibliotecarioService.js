import axios from "axios";
import { REACT_NATIVE_APP_API_URL } from '@env';

const API_URL = `http://192.168.1.232:8181/api/personalbibliotecario`;

export const loginPersonalBibliotecario = (credenciales) => {
    return axios.post(`${API_URL}/login`,credenciales)
}   

export const obtenerPersonalBibliotecarioPorCorreo = (correo) => {
    return axios.get(`${API_URL}/findByCorreo`, {params: { correo: correo} })
}