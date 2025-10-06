// src/models/Cita.ts
import { Horario } from './Horario';
import { Paciente } from './Paciente';

export enum EstadoCita {
    AGENDADA = "AGENDADA",
    CONFIRMADA = "CONFIRMADA",
    CANCELADA = "CANCELADA"
}

export interface Cita {
    id: string;
    fechaHora: Date;
    estado: EstadoCita;
    paciente: Paciente; // Relación de Asociación
    horario: Horario;   // Relación de Composición
}
