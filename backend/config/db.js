import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connectionToDb = await mongoose.connect(process.env.MONGOODB_URL)
        
        if(connectionToDb){
            console.log(`Db is Connected:${connectionToDb.connection.host}`)
        }
    }  
    catch (error) {
        console.log(`Db is not connected:${error}`)
        process.exit(1)
    }
}

export default connectToDB;