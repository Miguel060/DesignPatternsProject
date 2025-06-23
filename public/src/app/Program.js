import dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import { logger } from "../middlewares/Logger.js";
import { paisesRouter } from "../routes/paises.routes.js";
import path from "path";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(express.static(path.resolve('public')));
app.use("/api/paises", paisesRouter);
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
