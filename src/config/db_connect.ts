import mongoose from "mongoose";

async function conectaNaDatabase(): Promise<typeof mongoose.connection>{

    const dbURI = process.env.DB_CONNECTION_STRING;

    if (!dbURI){
        throw new Error(
            "Variável não encontrada no arquivo .env: DB_CONNECTION_STRING"
        )
    }

    await mongoose.connect(dbURI);
    return mongoose.connection;

}

export default conectaNaDatabase;