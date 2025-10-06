// src/server.ts
import express from 'express';
import { CitasController } from './controllers/CitasController';

// 1. Inicialización
const app = express();
const port = 3000;

// 2. Middlewares
// Este middleware es crucial para que Express pueda entender el JSON que envía el cliente.
app.use(express.json());

// 3. Controladores
const citasController = new CitasController();

// 4. Rutas (Endpoints REST)
// Aquí definimos que las peticiones POST a la URL '/citas' serán manejadas
// por el método 'agendar' de nuestro controlador.
app.post('/citas', citasController.agendar);

// 5. Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor de NutriApp escuchando en http://localhost:${port}`);
    console.log(`✅ Endpoint listo: POST http://localhost:${port}/citas`);
});
