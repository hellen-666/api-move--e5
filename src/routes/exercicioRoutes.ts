//IMPORTA O METODO ROUTER DO EXPRESS (GERENCIAR ROTAS)
import { Router } from "express";

//IMPORTA O CONTROLLER DE EXERCICIOS
import ExercicioController from "../controllers/exercicioControler.js"

//INICIALIZAR O GERENCIADOR DE ROTAS DO EXPRESS
const router = Router();

//CRIAÇÃO DE ROTAS DA ENTIDADE EXERCICIO
router.get("/exercicio", ExercicioController.listar);