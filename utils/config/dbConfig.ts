import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB")
        });

        mongoose.connection.on("error", (err) =>{
            console.log("MongoDB error"+err)
            process.exit();
        })

    } catch (error:any){
        console.log(error);
    }
}