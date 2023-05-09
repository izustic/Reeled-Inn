import mongoose, { ConnectOptions } from "mongoose"; 
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

interface MongooseOpts { 
    useNewUrlParser?: boolean; 
    useUnifiedTopology?: boolean; 
}

export const dbConnect = async () => { 
    const mongo = await MongoMemoryServer.create(); 
    const uri = mongo.getUri();

    const mongooseOpts: ConnectOptions & Partial<MongooseOpts> = { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    };

    await mongoose.connect(uri, mongooseOpts); 
};

export const dbDisconnect = async () => { 
    await mongoose.connection.dropDatabase(); 
    await mongoose.connection.close(); 
    await mongoServer.stop(); 
};

export const dbDropCollection = async () => { 
    const collections = await mongoose.connection.db.collections(); 
    for (let collection of collections) { 
        await collection.drop(); 
    } 
};