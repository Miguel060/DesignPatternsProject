import { Router, Request, Response } from "express";
import { PostgresPaisRepository } from "../repositories/PostgresPaisRepository.js";

const router = Router();
const paisRepository = new PostgresPaisRepository();

router.get("/", async (req: Request, res: Response) => {
  try {
    const paises = await paisRepository.listar();
    res.json(paises);
  } catch (error) {
    console.error("Erro ao listar países:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/buscar", async (req: Request, res: Response): Promise<any>=> {
  const { nome } = req.query;

  if (!nome || typeof nome !== "string") {
    return res.status(400).json({ error: "Parâmetro 'nome' é obrigatório." });
  }

  try {
    const viagens = await paisRepository.listarViagens(nome);
    res.json(viagens);
  } catch (error) {
    console.error("Erro ao buscar viagens:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export { router as paisesRouter };
