"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitaService = void 0;
// src/services/CitaService.ts
const Cita_1 = require("../models/Cita");
const Horario_1 = require("../models/Horario");
const uuid_1 = require("uuid"); //  instalamos uuid: npm install uuid @types/uuid
// --- SIMULACIÓN DE BASE DE DATOS ---
// En un proyecto real, esto sería reemplazado por llamadas a una base de datos como PostgreSQL.
const horariosDB = [
    { id: "h1", fechaHoraInicio: new Date("2025-10-28T14:00:00Z"), estado: Horario_1.EstadoHorario.DISPONIBLE },
    { id: "h2", fechaHoraInicio: new Date("2025-10-28T15:00:00Z"), estado: Horario_1.EstadoHorario.DISPONIBLE },
];
const pacientesDB = [];
const citasDB = [];
// --- FIN DE LA SIMULACIÓN ---
// Esta clase implementa la lógica de negocio pura, sin saber nada de la web.
// Es el corazón de nuestra aplicación.
class CitaService {
    /**
     * Implementa la lógica del Diagrama de Secuencia para agendar una cita.
     * @param datosPaciente Datos del paciente que agenda.
     * @param idHorario El ID del horario que se desea agendar.
     * @returns La cita recién creada.
     * @throws Error si el horario no está disponible.
     */
    agendarNuevaCita(datosPaciente, idHorario) {
        console.log(`[Servicio] Intentando agendar horario ${idHorario}...`);
        // 1. Verificar y Bloquear Horario (Paso 4-5 del Diagrama de Secuencia)
        const horario = horariosDB.find(h => h.id === idHorario);
        if (!horario || horario.estado !== Horario_1.EstadoHorario.DISPONIBLE) {
            throw new Error("El horario seleccionado ya no está disponible.");
        }
        // Bloqueo del horario (Paso 6)
        horario.estado = Horario_1.EstadoHorario.OCUPADO;
        console.log(`[Servicio] Horario ${idHorario} bloqueado.`);
        // 2. Crear o actualizar Paciente (Paso 7)
        let paciente = pacientesDB.find(p => p.correoElectronico === datosPaciente.correoElectronico);
        if (!paciente) {
            paciente = { id: (0, uuid_1.v4)(), ...datosPaciente };
            pacientesDB.push(paciente);
            console.log(`[Servicio] Nuevo paciente creado con ID ${paciente.id}.`);
        }
        // 3. Crear Cita (Paso 8)
        const nuevaCita = {
            id: (0, uuid_1.v4)(),
            fechaHora: horario.fechaHoraInicio,
            estado: Cita_1.EstadoCita.AGENDADA,
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
    programarRecordatorio(cita) {
        // En un sistema real, esto publicaría un mensaje en una cola (RabbitMQ/SQS).
        console.log(`[Servicio] Recordatorio programado para la cita ${cita.id} del paciente ${cita.paciente.nombre}.`);
    }
}
exports.CitaService = CitaService;
