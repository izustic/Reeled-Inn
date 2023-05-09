"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbDropCollection = exports.dbDisconnect = exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
const dbConnect = async () => {
    const mongo = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongo.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    await mongoose_1.default.connect(uri, mongooseOpts);
};
exports.dbConnect = dbConnect;
const dbDisconnect = async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.connection.close();
    await mongoServer.stop();
};
exports.dbDisconnect = dbDisconnect;
const dbDropCollection = async () => {
    const collections = await mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        await collection.drop();
    }
};
exports.dbDropCollection = dbDropCollection;
//# sourceMappingURL=setuptestdb.js.map