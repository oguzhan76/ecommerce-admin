import mongoose, { Mongoose } from "mongoose";

export function mongooseConnect(): Promise<Mongoose | mongoose.Connection>{
    
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        const uri: string = process.env.MONGODB_URI || '';
        return mongoose.connect(uri);
    }
}