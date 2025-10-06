// src/models/Horario.ts

// El 'enum' es la implementación del enum del diagrama de clases.
// Asegura que un horario solo puede tener estos estados.
export enum EstadoHorario {
    DISPONIBLE = "DISPONIBLE",
    OCUPADO = "OCUPADO"
}

export interface Horario {
    id: string;
    fechaHoraInicio: Date;
    estado: EstadoHorario;
}
