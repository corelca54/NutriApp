// src/models/Paciente.ts

// Esta interfaz es la traducción directa de la clase Paciente en nuestro UML.
// Define la "forma" que deben tener los datos de un paciente.
export interface Paciente {
    id: string; // Usamos string para UUIDs
    nombre: string;
    correoElectronico: string;
    telefono: string;
}