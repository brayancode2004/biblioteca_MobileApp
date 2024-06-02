import axios from "axios";
import { EXPO_PUBLIC_API_URL } from '@env';


const API_URL = `${EXPO_PUBLIC_API_URL}/prestamos`;
console.log(EXPO_PUBLIC_API_URL)

export const comprobarElegibilidad = async (cif, idLibro) => {
    const response = await axios.post(`${API_URL}/comprobarElegibilidad`, null, {
        params: {
            cif: cif,
            idLibro: idLibro
        }
    });
    return response.data;
};

export const solicitarPrestamo = async (cif, idLibro) => {
    const response = await axios.post(`${API_URL}/solicitar`, null, {
        params: {
            cif: cif,
            idLibro: idLibro
        }
    });
    return response.data;
};

export const verificarPrestamo = async (cif, idLibro) => {
    const response = await axios.get(`${API_URL}/yaPrestado`, {
         params: {
            cif: cif, 
            idLibro: idLibro
        }
     });
    return response.data;
};

export const obtenerPrestamosPorEstudiante = async (cif) => {
    const response = await axios.get(`${API_URL}/prestamosPorEstudiante`, { params: { cif } });
    return response.data;
};
export const obtenerPrestamosPorEstudiantePaginados = async (cif, page = 0, size = 5) => {
    try{        
        const response = await axios.get(`${API_URL}/prestamosPorEstudiantePaginados`, {
             params: { 
                cif: cif,
                page: page,
                size: size
             } 
            });
        return response.data;
    }catch(error){
        Alert.alert('Error al obtener tus préstamos:', error);
    }
};

export const renovarPrestamo = async (cif, idPrestamo) => {
    const response = await axios.post(`${API_URL}/renovarPrestamo`, null, {
        params: {
            cif: cif,
            idPrestamo: idPrestamo
        }
    });
    return response.data;
};

// Obtener un préstamo por código de retiro
export const obtenerPrestamoPorCodigoRetiro = async (codigoRetiro) => {
    const response = await axios.get(`${API_URL}/buscarPorCodigoRetiro`, {
        params: { codigoRetiro }
    });
    return response.data;
};

export const entregarLibro = async (idPrestamo, idPersonalEntrega) => {
    const response = await axios.put(`${API_URL}/entregar/${idPrestamo}?idPersonalEntrega=${idPersonalEntrega}`);
    return response.data;
};

export const recibirLibro = async (idPrestamo, idPersonalRecepcion) => {
    const response = await axios.put(`${API_URL}/recibir/${idPrestamo}?idPersonalRecepcion=${idPersonalRecepcion}`);
    return response.data;
};


export const obtenerTodosLosPrestamos = async () => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
};

export const obtenerTop10LibrosMasPrestados = async () => {
    try {
        const response = await axios.get(`${API_URL}/top10LibrosMasPrestados`);
        return response.data;
    } catch (error) {
        // Manejar el error aquí si es necesario
        console.error("Error al obtener los top 10 libros más prestados:", error);
        throw error; // Puedes relanzar el error para que el componente que llama a esta función lo maneje
    }
};
