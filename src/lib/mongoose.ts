import mongoose, { Mongoose } from "mongoose";

export function mongooseConnect(): Promise<Mongoose | mongoose.Connection>{
    // if there's already a connection, returns it
    if(mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        const uri: string | undefined = process.env.MONGODB_URI;
        if(!uri) throw Error('No MONGODB_URI is set!')
        return mongoose.connect(uri);
    }
}