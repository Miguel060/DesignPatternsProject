import { Router } from "express";
import { PostgresPaisRepository } from "../repositories/PostgresPaisRepository.js";
const router = Router();
const paisRepository = new PostgresPaisRepository();
router.get("/", async (req, res) => {
    try {
        const paises = await paisRepository.listar();
        res.json(paises);
    }
    catch (error) {
        console.error("Erro ao listar países:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
export { router as paisesRouter };
