import axios, {AxiosPromise} from "axios";
import { EXPO_PUBLIC_API_URL } from '@env';
import { Alert } from "react-native";

const API_URL = `${EXPO_PUBLIC_API_URL}/estudiante`;
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


export const marcarComoFavorito = async (cifEstudiante, idLibro) => {
    try {
        await axios.post(`${API_URL}/marcarFavorito`, null, {
            params: {
                cifEstudiante: cifEstudiante,
                idLibro: idLibro
            }
        });
        return true; // Marcar como favorito fue exitoso
    } catch (error) {
        Alert.alert(error.response.data); // Lanzar el error recibido desde el servidor
    }
};


export const quitarFavorito = async (cifEstudiante, idLibro) => {
    try {
        const response = await axios.delete(`${API_URL}/quitarFavorito`, {
            params: {
                cifEstudiante: cifEstudiante,
                idLibro: idLibro
            }
        });
        return response.data;
    }catch (error) {
        Alert.alert('Error al quitar de favoritos:', error);
    }
};

export const obtenerFavoritos = async (cifEstudiante, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/favoritos`, {
            params: {
                cifEstudiante: cifEstudiante, 
                page: page,
                size: size
            }
        });
        return response.data;
    } catch (error) {
        Alert.alert('Error al obtener tus libros favoritos:', error);
    }
}; 

export const esFavorito = async (cifEstudiante, idLibro) => {
    try {
        const response = await axios.get(`${API_URL}/esFavorito`, {
            params: {
                cifEstudiante: cifEstudiante,
                idLibro: idLibro
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al verificar si es favorito:', error);
        throw error; // O maneja el error según tu lógica de la aplicación
    }
};


