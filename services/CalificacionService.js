import axios from "axios";


const API_URL = `${process.env.REACT_NATIVE_APP_API_URL}/calificaciones`;

// Suponiendo que tu archivo se llama "LibrosService.js" o algo similar

export const enviarCalificacion = (cifEstudiante, idLibro, puntuacion) => {
    return axios.post(`${API_URL}/guardar`, {
        cifEstudiante,
        idLibro,
        puntuacion
    });
};

export const verificarCalificacion = async (cifEstudiante, idLibro) => {
    try {
        const response = await axios.get(`${API_URL}/yaCalificado`, {
            params: {
                cifEstudiante: cifEstudiante,
                idLibro: idLibro
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al verificar la calificación', error);
        // Manejar el error según sea necesario
    }
};

export const obtenerCalificacionDeUsuario = async (cifEstudiante, idLibro) => {
    try {
        const response = await axios.get(`${API_URL}/obtenerCalificacion`, {
            params: {
                cifEstudiante: cifEstudiante,
                idLibro: idLibro
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener la calificación del usuario:', error);
        // Aquí puedes manejar el error como prefieras
    }
};