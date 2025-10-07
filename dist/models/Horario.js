"use strict";
// src/models/Horario.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoHorario = void 0;
// El 'enum' es la implementación del enum del diagrama de clases.
// Asegura que un horario solo puede tener estos estados.
var EstadoHorario;
(function (EstadoHorario) {
    EstadoHorario["DISPONIBLE"] = "DISPONIBLE";
    EstadoHorario["OCUPADO"] = "OCUPADO";
})(EstadoHorario || (exports.EstadoHorario = EstadoHorario = {}));
