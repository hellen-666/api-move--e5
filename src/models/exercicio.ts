import mongoose, {Schema, Document, type InferSchemaType} from "mongoose";

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
export interface InterExercicio extends Document {
    nome: string;
    categoria: string;
    dificuldade: string;
}

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const ExercicioSchema: Schema = new Schema({
    nome: { type: String, required: true },
    categoria: { type: String, required: true },
    dificuldade: { type: String, required: true }
},

{ versionKey: false },
);

//EXTRAÇÃO AUTOMATICA DO EXERCICIO
export type InterfaceExercicio = InferSchemaType <typeof ExercicioSchema>;

//CRIAÇÃO DO MODEL (MONGOOSE)
const Exercicio = mongoose.model("Exercicio", ExercicioSchema);

//DISPONIBILIZA MODULO PARA SER IMPORT EM OUTROS ARQUIVOs
export default Exercicio;
