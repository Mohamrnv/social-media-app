import mongoose from 'mongoose';
export async function dbConnection(){
    try{
        
        await mongoose.connect(process.env.DB_URI as string)
        console.log("connected");
    }
    catch(error){
        console.log({message:error});
    }
}