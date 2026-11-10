import mongoose, {Schema, Document} from "mongoose";

//INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS
export interface InterfaceExercicio extends Document {
    nome: string;
    categoria: string;
    dificuldade: string;
}

//DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
