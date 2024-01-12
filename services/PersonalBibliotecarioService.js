import axios from "axios";

const API_URL = `${process.env.REACT_NATIVE_APP_API_URL}/personalbibliotecario`;

export const loginPersonalBibliotecario = (credenciales) => {
    return axios.post(`${API_URL}/login`,credenciales)
}   

export const obtenerPersonalBibliotecarioPorCorreo = (correo) => {
    return axios.get(`${API_URL}/findByCorreo`, {params: { correo: correo} })
}