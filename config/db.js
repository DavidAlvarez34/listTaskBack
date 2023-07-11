import mongoose from "mongoose";

const conectDb=async()=>{
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        }
        )
        console.log(`Mongo connect in: ${connection.connection.host}: ${connection.connection.port}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        //Forzar el error
        process.exit(1);
    }
}

export default conectDb;