"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitasController = void 0;
const CitaService_1 = require("../services/CitaService");
// El controlador es el puente entre el mundo de la web (HTTP) y nuestra lógica de negocio.
class CitasController {
    constructor() {
        /**
         * Maneja la petición POST /citas.
         * Extrae los datos de la petición, llama al servicio y envía una respuesta HTTP.
         */
        this.agendar = (req, res) => {
            try {
                // Extraemos los datos del cuerpo de la petición.
                // En una app real, aquí habría una validación robusta de los datos de entrada.
                const { nombre, correoElectronico, telefono, idHorario } = req.body;
                if (!nombre || !correoElectronico || !telefono || !idHorario) {
                    res.status(400).json({ error: "Faltan datos obligatorios." });
                    return;
                }
                // Llamamos a nuestra lógica de negocio.
                const nuevaCita = this.citaService.agendarNuevaCita({ nombre, correoElectronico, telefono }, idHorario);
                // Enviamos una respuesta exitosa (201 Created), como en el Diagrama de Secuencia.
                res.status(201).json(nuevaCita);
            }
            catch (error) {
                // Si el servicio lanza una excepción (ej. horario no disponible), la capturamos.
                if (error.message.includes("no está disponible")) {
                    // Enviamos una respuesta de Conflicto (409), como en el Diagrama de Secuencia.
                    res.status(409).json({ error: error.message });
                }
                else {
                    // Para cualquier otro error inesperado.
                    res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
                }
            }
        };
        this.citaService = new CitaService_1.CitaService();
    }
}
exports.CitasController = CitasController;
