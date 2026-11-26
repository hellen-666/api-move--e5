import { type Request, type Response } from "express";
import Exercicio, { type InterfaceExercicio } from "../models/exercicio.js"
import type { IExercicioRepository, ExercicioDTO, FiltroExercicioDTO } from "../repositories/IExercicioRepository.js";

class ExercicioController{

    private exercicioRepository: IExercicioRepository;

    constructor(exercicioRepository: IExercicioRepository){
        this.exercicioRepository = exercicioRepository;
    }

    //GET - LISTAR TODOS OS EXERCÍCIOS DO BANCO
    async listar (req: Request, res: Response){
        try{
            const listaExercicios = await this.exercicioRepository.listar();
            res.status(200).json(listaExercicios);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar exercício"});
        }
    }

    //GET - BUSCAR UM EXERCÍCIO ESPECÍFICO PELO ID - REQ PARAMS
    async buscarPorId (req: Request<{id: string}>, res: Response ){
        try{
            const { id } = req.params;
            const exercicioEncontrado = await this.exercicioRepository.buscarPorId(id);

            if(!exercicioEncontrado){
                res.status(404).json({mensagem: "Exercício não encontrado."});
                return;
            }
            res.status(200).json(exercicioEncontrado);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar o exercício por ID."})
        }
    }

    //GET - FILTRAR EXERCÍCIOS POR CRITÉRIOS OPCIONAIS - REQ QUERY
    async buscaPorFiltro (req: Request, res: Response){
        try{
            //Extrair os possíveis filtros enviados após o "?" na URL
            const { name, category, muscle_group, difficulty } = req.query;

            //Criar um objeto vazio para receber apenas os filtros preenchidos
            const filtro: Record<string, any> = {};

            if(name){
                filtro.nome = String(name); //Busca exata
            }

            if(category){
                filtro.categoria = String(category); //Busca exata
            }

            if(muscle_group){
                filtro.grupo_muscular = { $regex: String(muscle_group), $options: "i" }
            }

            if(difficulty){
                filtro.dificuldade = { $regex: String(difficulty), $options: "i"}
            }
            
            const exerciciosFiltrados = await this.exercicioRepository.buscarPorFiltro(filtro);
            res.status(200).json(exerciciosFiltrados)

        }catch (error){
            res.status(500).json({mensagem: "Erro ao filtrar."})
        }
    }

    //POST - CADASTRAR UM NOVO LIVRO NO BANCO
    async cadastrar (req: Request<{},{},ExercicioDTO>, res: Response){
        try{
            const novoExercicio = await this.exercicioRepository.cadastrar(req.body);

            res.status(201).json({
                mensagem: "Exercício cadastrado com sucesso!",
                exercicio: novoExercicio
            });
        }catch (error){
            res.status(500).json({mensagem: "Erro ao cadastrar exercício."})
        }
    }

    //PUT - ATUALIZAÇÃO COMPLETA
    async atualizar (req: Request<{id: string},{},ExercicioDTO>, res: Response ){
        try{
            const { id } = req.params;
            const exercicioAtualizado = await this.exercicioRepository.atualizar(id, req.body);

            if(!exercicioAtualizado){
                res.status(404).json({mensagem: "Exercício não encontrado."});
                return;
            }

            res.status(200).json({
                mensagem: "Exercício atualizado com sucesso!",
                exercicio: exercicioAtualizado
            });
        }catch (error){
            res.status(500).json({mensagem: "Erro ao atualizar exercício."})
        }
    }

    //PATCH  - ATUALIZAÇÃO PARCIAL
    async atualizarParcial (req: Request <{id: string}, {}, ExercicioDTO>, res: Response){
        try{
            const { id } = req.params;
            const exercicioAtualizado = await this.exercicioRepository.atualizarParcial(id, req.body);

            if(!exercicioAtualizado){
                res.status(404).json({mensagem: "Exercício não encontrado!"});
                return;
            }

            res.status(200).json({
                mensagem: "Exercício atualizado com sucesso!",
                exercicio: exercicioAtualizado
            });
        }catch (error){
            res.status(500).json({ mensagem: "Erro ao atualizar parcialmente o exercício."})
        }
    }

    //DELETE - REMOVER EXERCÍCIO
    async deletar (req: Request<{id: string}>, res: Response ){
        try{
            const { id } = req.params;
            const exercicioDeletado = await this.exercicioRepository.deletar(id);

            if (!exercicioDeletado) {
                res.status(404).json({mensagem: "Exercício não encontrado!"});
                return;
            }

            res.status(200).json({
                mensagem: "Exercício removido com sucesso!",
            });
        }catch (error){
            res.status(500).json({mensagem: "Erro ao remover exercício."})
        }
    }
};

export default ExercicioController;