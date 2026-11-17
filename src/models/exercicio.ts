import mongoose, {Schema, Document, type InferSchemaType} from "mongoose";

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const ExercicioSchema: Schema = new Schema({
    nome: { type: String, required: true },
    categoria: { type: String, required: true },
    dificuldade: { type: String, required: true },
    equipamento: { type: String, required: true },
    grupo_muscular: { type: String, required: true },
    descricao: { type: String, required: true },
    series: { type: Number, required: true },
    repeticoes: { type: Number, required: true },
    cover: { type: String, default: "https://placehold.co/300x450?text=No+Cover"}
},

{ versionKey: false },
);

//EXTRAÇÃO AUTOMATICA DO EXERCICIO
export type InterfaceExercicio = InferSchemaType <typeof ExercicioSchema>;

//CRIAÇÃO DO MODEL (MONGOOSE)
const Exercicio = mongoose.model("Exercicio", ExercicioSchema);

//DISPONIBILIZA MODULO PARA SER IMPORT EM OUTROS ARQUIVOS
export default Exercicio;
