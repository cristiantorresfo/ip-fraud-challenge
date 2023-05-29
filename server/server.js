import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
import cors from 'cors';

export const app = express();
const PORT = 3000;

async function startServer() {
    try {
        await mongoose.connect('mongodb://mongodb-container/fraud_context', { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        app.use(express.json());
        // Configurar CORS
        app.use(cors());
        app.use('/', apiRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}

startServer();

