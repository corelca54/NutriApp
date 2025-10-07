// src/services/CitaService.ts
import { Cita, EstadoCita } from '../models/Cita.js';      
import { Horario, EstadoHorario } from '../models/Horario.js';  
import { Paciente } from '../models/Paciente.js';          
import { v4 as uuidv4 } from 'uuid';
// --- SIMULACIÓN DE BASE DE DATOS ---
// En un proyecto real, esto sería reemplazado por llamadas a una base de datos como PostgreSQL.
const horariosDB: Horario[] = [
    { id: "h1", fechaHoraInicio: new Date("2025-10-28T14:00:00Z"), estado: EstadoHorario.DISPONIBLE },
    { id: "h2", fechaHoraInicio: new Date("2025-10-28T15:00:00Z"), estado: EstadoHorario.DISPONIBLE },
];
const pacientesDB: Paciente[] = [];
const citasDB: Cita[] = [];
// --- FIN DE LA SIMULACIÓN ---


// Esta clase implementa la lógica de negocio pura, sin saber nada de la web.
// Es el corazón de nuestra aplicación.
export class CitaService {

    /**
     * Implementa la lógica del Diagrama de Secuencia para agendar una cita.
     * @param datosPaciente Datos del paciente que agenda.
     * @param idHorario El ID del horario que se desea agendar.
     * @returns La cita recién creada.
     * @throws Error si el horario no está disponible.
     */
    public agendarNuevaCita(datosPaciente: { nombre: string, correoElectronico: string, telefono: string }, idHorario: string): Cita {
        console.log(`[Servicio] Intentando agendar horario ${idHorario}...`);

        // 1. Verificar y Bloquear Horario (Paso 4-5 del Diagrama de Secuencia)
        const horario = horariosDB.find(h => h.id === idHorario);
        if (!horario || horario.estado !== EstadoHorario.DISPONIBLE) {
            throw new Error("El horario seleccionado ya no está disponible.");
        }

        // Bloqueo del horario (Paso 6)
        horario.estado = EstadoHorario.OCUPADO;
        console.log(`[Servicio] Horario ${idHorario} bloqueado.`);

        // 2. Crear o actualizar Paciente (Paso 7)
        let paciente = pacientesDB.find(p => p.correoElectronico === datosPaciente.correoElectronico);
        if (!paciente) {
            paciente = { id: uuidv4(), ...datosPaciente };
            pacientesDB.push(paciente);
            console.log(`[Servicio] Nuevo paciente creado con ID ${paciente.id}.`);
        }

        // 3. Crear Cita (Paso 8)
        const nuevaCita: Cita = {
            id: uuidv4(),
            fechaHora: horario.fechaHoraInicio,
            estado: EstadoCita.AGENDADA,
            paciente: paciente,
            horario: horario
        };
        citasDB.push(nuevaCita);
        console.log(`[Servicio] Nueva cita creada con ID ${nuevaCita.id}.`);
        
        // 4. Lógica de notificación (Paso 11) - Simulada
        this.programarRecordatorio(nuevaCita);

        // 5. Retornar Cita creada (Paso 13)
        return nuevaCita;
    }

    private programarRecordatorio(cita: Cita): void {
        // En un sistema real, esto publicaría un mensaje en una cola (RabbitMQ/SQS).
        console.log(`[Servicio] Recordatorio programado para la cita ${cita.id} del paciente ${cita.paciente.nombre}.`);
    }
}