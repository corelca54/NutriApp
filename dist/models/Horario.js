// src/models/Horario.ts
// El 'enum' es la implementación del enum del diagrama de clases.
// Asegura que un horario solo puede tener estos estados.
export var EstadoHorario;
(function (EstadoHorario) {
    EstadoHorario["DISPONIBLE"] = "DISPONIBLE";
    EstadoHorario["OCUPADO"] = "OCUPADO";
})(EstadoHorario || (EstadoHorario = {}));
