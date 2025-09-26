import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Configurar  variables de entorno
dotenv.config();

const PORT = process.env.PORT || 3000;

// Funcion para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Iniciar el servidor express
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🕒 Started at: ${new Date().toISOString()}`);
    });

  } catch (error) {
    console.log('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Iniciar la aplicacion
startServer();

// Manejar cierre del servidor
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully');
  process.exit(0);
});

process.on('unhandledRejection', (reason: Error, promise) => {
  console.error('⚠️ Unhandled Rejection at:', promise, 'reason:', reason);
});