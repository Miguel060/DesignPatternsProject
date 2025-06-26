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
router.get("/hoteis/:idpais", async (req, res) => {
    const { idpais } = req.params;
    try {
        const hoteis = await paisRepository.listarHoteisPorPais(Number(idpais));
        res.json(hoteis);
    }
    catch (error) {
        console.error("Erro ao buscar hotéis:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
router.post("/", async (req, res) => {
    const { idpais, idhotel, qntpessoas, vlviagem, dtviagem, idgrupo, idagencia } = req.body;
    if (!idpais || !idhotel || !qntpessoas || !vlviagem || !dtviagem) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }
    try {
        await paisRepository.adicionarViagem({
            idpais,
            idhotel,
            qntpessoas,
            vlviagem,
            dtviagem,
            idgrupo: idgrupo || 0,
            idagencia: idagencia || 1
        });
        res.status(201).json({ message: "Viagem adicionada com sucesso." });
    }
    catch (err) {
        console.error("Erro ao adicionar viagem:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
router.delete("/viagens/:idviagem", async (req, res) => {
    try {
        await paisRepository.removerViagem(Number(req.params.idviagem));
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Erro ao remover viagem:", error);
        res.status(500).json({ error: "Erro ao remover viagem" });
    }
});
export { router as paisesRouter };
