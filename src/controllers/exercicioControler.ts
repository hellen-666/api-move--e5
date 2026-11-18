import { type Request, type Response } from "express";
import Exercicio, { type InterfaceExercicio } from "../models/exercicio.js"

class ExercicioController{

    //GET - LISTAR TODOS OS EXERCÍCIOS DO BANCO
    static async listar (req: Request, res: Response){
        try{
            const listaExercicios = await Exercicio.find({})
            res.status(200).json(listaExercicios);
        }catch (error){
            res.status(500).json({mensagem: "Erro ao buscar exercício"});
        }
    }

    //GET - BUSCAR UM EXERCÍCIO ESPECÍFICO PELO ID - REQ PARAMS
    static async buscarPorId (req: Request<{id: string}>, res: Response ){
        try{
            const { id } = req.params;
            const exercicioEncontrado = await Exercicio.findById(id);

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
    static async buscaPorFiltro (req: Request, res: Response){
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
            
            const exerciciosFiltrados = await Exercicio.find(filtro);

            res.status(200).json(exerciciosFiltrados)
        }catch (error){
            res.status(500).json({mensagem: "Erro ao filtrar."})
        }
    }

    //POST - CADASTRAR UM NOVO LIVRO NO BANCO
    static async cadastrar (req: Request<{},{},InterfaceExercicio>, res: Response){
        try{
            const { nome, categoria, dificuldade, equipamento, grupo_muscular, descricao, series, repeticoes, cover } = req.body;
            const novoExercicio = await Exercicio.create({
                nome,
                categoria,
                dificuldade,
                equipamento,
                grupo_muscular,
                descricao,
                series: Number(series),
                repeticoes: Number(repeticoes),
                cover
            });
            res.status(201).json({
                mensagem: "Exercício cadastrado com sucesso!",
                exercicio: novoExercicio
            });
        }catch (error){
            res.status(500).json({mensagem: "Erro ao cadastrar exercício."})
        }
    }

    //PUT - ATUALIZAÇÃO COMPLETA
    static async atualizar (req: Request<{id: string},{},InterfaceExercicio>, res: Response ){
        try{
            const { id } = req.params;
            const { nome, categoria, dificuldade, equipamento, grupo_muscular, descricao, series, repeticoes, cover } = req.body;
            const exercicioAtualizado = await Exercicio.findByIdAndUpdate(
                id,
                {
                    nome,
                    categoria,
                    dificuldade,
                    equipamento,
                    grupo_muscular,
                    descricao,
                    series,
                    repeticoes,
                    cover
                },
                {new: true}
            );

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

    //  PATCH  - ATUALIZAÇÃO PARCIAL
    static async atualizarParcial (req: Request <{id: string}, {}, InterfaceExercicio>, res: Response){
        try{
            const { id } = req.params;

            const exercicioAtualizado = await Exercicio.findByIdAndUpdate(
                id,
                { $set: req.body },
                { returnDocument: "after" }
            );

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
    static async deletar (req: Request<{id: string}>, res: Response ){
        try{
            const { id } = req.params;
            
            const exercicioDeletado = await Exercicio.findByIdAndDelete(id);


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