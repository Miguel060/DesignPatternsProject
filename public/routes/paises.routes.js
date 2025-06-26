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
router.get("/buscar", async (req, res) => {
    const { nome } = req.query;
    if (!nome || typeof nome !== "string") {
        return res.status(400).json({ error: "Parâmetro 'nome' é obrigatório." });
    }
    try {
        const viagens = await paisRepository.listarViagens(nome);
        res.json(viagens);
    }
    catch (error) {
        console.error("Erro ao buscar viagens:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
router.post("/adicionar", async (req, res) => {
    const { pais, hotel, pessoas, dtviagem } = req.body;
    if (!pais || !hotel || !pessoas || !dtviagem) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    try {
        await paisRepository.adicionarViagem({ pais, hotel, pessoas, dtviagem });
        res.status(201).json({ message: "Viagem adicionada com sucesso!" });
    }
    catch (error) {
        console.error("Erro ao adicionar viagem:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
export { router as paisesRouter };
