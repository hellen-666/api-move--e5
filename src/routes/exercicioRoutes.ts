//IMPORTA O METODO ROUTER DO EXPRESS (GERENCIAR ROTAS)
import { Router } from "express";

//IMPORTA O CONTROLLER DE EXERCICIOS
import ExercicioController from "../controllers/exercicioControler.js"

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//1º ROTAS ESTÁTICAS DE BUSCA
router.get("/exercicio", ExercicioController.listar);
router.get("/exercicio/busca", ExercicioController.buscaPorFiltro);

//2º ROTA DINÂMICA DE BUSCA
router.get("/exercicio/:id", ExercicioController.buscarPorId);

//2º ROTAS ESTÁTICA/DINÂMICAS DE ESCRITA E REMOÇÃO
router.post("/exercicio", ExercicioController.cadastrar);
router.put("/exercicio/:id", ExercicioController.atualizar);
router.patch("/exercicio/:id", ExercicioController.atualizarParcial);
router.delete("/exercicio/:id", ExercicioController.deletar);

//EXPORTAR
export default router;

