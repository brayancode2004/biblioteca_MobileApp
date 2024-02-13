// Autor.ts
  export interface Autor {
    idAutor: number;
    nombreAutor: string;
    descripcion: string;
    numLibros: number;
    autorPic: string;
    estado: boolean;
  }
  
  // Categoria.ts
  export interface Categoria {
    idCategoria: number;
    nombreCategoria: string;
  }
  
  // Ubicacion.ts
  export interface Ubicacion {
    idUbicacion: number;
    numEstante: number;
    numRepisa: number;
  }
  
  export interface book {
    idLibro: number;
    titulo: string;
    sinopsis: string;
    imagen: string;
    isbn: string;
    numCopiasTotales: number;
    numCopiasDisponibles: number;
    añoPublicacion: number;
    calificacionPromedio: number;
    numCalificaciones: number;
    estado: boolean;
    ubicacion: Ubicacion;
    autores: Autor[];
    categorias: Categoria[];
  }

  // User.ts
  export interface user {
    cif: string;
    nombreCompleto: string;
    password: string;
    correoInstitucional: string;
    userPic: string;
    telefonoCelular: string;
    descripcion: string;
    sexo: string; 
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    prestamosNotificaciones: boolean;
    eventosNotificaciones: boolean;
    role: string;
    estado: boolean;
  }

  export interface bibliotecaria {
    id: number;
    nombreCompleto: string;
    userPic: string;
    password: string;
    correoInstitucional: string;
    sexo: string; // O podrías usar 'M' | 'F' si solo admite esos valores
    role: string;
    estado: boolean;
  }
  



  