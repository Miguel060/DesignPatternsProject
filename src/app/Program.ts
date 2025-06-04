import Database from "../database/Database.js";
import dotenv from 'dotenv-flow';
dotenv.config();
try {
    const db = Database.getInstance();
    console.log('Conexão criada com sucesso!');
    await db.close(); 
} catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
}