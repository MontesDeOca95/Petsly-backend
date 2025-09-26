import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI no esta definida en el archivo .env");
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB', error);
    process.exit(1); // Detener la aplicacion si hay error
  }
};

// Manejar eventos de conexion
mongoose.connection.on('connected', () => {
    console.log('🟢 Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', () => {
    console.log('🔴 Error de Mongoose');
});

mongoose.connection.on('disconnected', () => {
    console.log('🟡 Mongoose desconectado de MongoDB');
});

// Cerrar conexion cuando la aplicacion termine
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('⏹️ Conexion a MongoDB cerrada por terminacion de la app');
    process.exit(0);
});