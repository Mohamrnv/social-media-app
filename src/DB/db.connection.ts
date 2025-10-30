import mongoose from 'mongoose';
export async function dbConnection() {
    try {

        await mongoose.connect("mongodb+srv://mohamedsamirrrrrr:oSwPavil69GixLCN@cluster0.9dtw3jp.mongodb.net/Social_Media_App?retryWrites=true&w=majority");

        console.log("connected");
    }
    catch (error) {
        console.log({ message: error });
    }
}