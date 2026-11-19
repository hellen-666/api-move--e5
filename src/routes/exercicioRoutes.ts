//IMPORTA O METODO ROUTER DO EXPRESS (GERENCIAR ROTAS)
import { Router } from "express";

//IMPORTA O CONTROLLER DE EXERCICIOS
import ExercicioController from "../controllers/exercicioControler.js"

//IMPORTA O MIDDLEWARE (VALIDAÇÃO DE DADOS)
import { validarDados } from "../middlewares/dataValidator.js";

//IMPORTA OS SCHEMAS DO ZOD (VALIDADOR)
import { criarExercicioValidator, atualizarExercicioValidator } from "../validators/exercicioValidator.js";

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//1º ROTAS ESTÁTICAS DE BUSCA
router.get("/exercicio", ExercicioController.listar);
router.get("/exercicio/busca", ExercicioController.buscaPorFiltro);

//2º ROTA DINÂMICA DE BUSCA
router.get("/exercicio/:id", ExercicioController.buscarPorId);

//2º ROTAS ESTÁTICA/DINÂMICAS DE ESCRITA E REMOÇÃO
router.post("/exercicio", validarDados(criarExercicioValidator), ExercicioController.cadastrar);
router.put("/exercicio/:id", validarDados(criarExercicioValidator), ExercicioController.atualizar);
router.patch("/exercicio/:id", validarDados(atualizarExercicioValidator), ExercicioController.atualizarParcial);
router.delete("/exercicio/:id", ExercicioController.deletar);

//EXPORTAR
export default router;

