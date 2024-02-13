import axios from "axios";
import { REACT_NATIVE_APP_API_URL } from '@env';


const API_URL = `http://192.168.1.232:8181/api/estudiante`;

export const obtenerEstudiantes = () => {
    return axios.get(`${API_URL}/all`);
};

export const obtenerEstudiantePorId = (cif) => {
    return axios.get(`${API_URL}/findByCif`, { params: {cif: cif} })
}

export const registerEstudiante = (estudiante) => {
    return axios.post(`${API_URL}/register`,estudiante)
}

export const loginEstudiante = (credenciales) => {
    return axios.post(`${API_URL}/login`,credenciales)
}

export const actualizarInfoEstudiante = (estudiante) => {
    return axios.put(`${API_URL}/update`,estudiante)
}

export const cambiarPasswordEstudiante = (passwords) => {
    return axios.put(`${API_URL}/changePassword`, passwords)
}

export const cambiarFotoPerfilEstudiante = (cif, imagenBase64) => {
    return axios.put(`${API_URL}/changeProfilePicture/${cif}`, imagenBase64, {
        headers: {
            'Content-Type': 'text/plain' // Ajusta el tipo de contenido a texto plano
        }
    });
}

export const inhabilitarEstudiante = async (cif) => {
    const response = await axios.put(`${API_URL}/inhabilitar/${cif}`);
    return response.data;
};

export const habilitarEstudiante = async (cif) => {
    const response = await axios.put(`${API_URL}/habilitar/${cif}`);
    return response.data;
};

export const verificarSolvenciaEstudiante = async (cif) => {
    const response = await axios.get(`${API_URL}/verificarSolvencia`, { params: { cif } });
    return response.data;
};