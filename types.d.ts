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


  