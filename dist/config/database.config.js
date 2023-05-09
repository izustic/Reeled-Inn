"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = 'mongodb+srv://izustic:12345@reeledinn.ila2lwt.mongodb.net/test';
mongoose_1.default.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose_1.default.connection.on('connected', () => {
    console.log('Connected to database successfully');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error(`Error connecting to database: ${err}`);
});
exports.default = mongoose_1.default.connection;
//# sourceMappingURL=database.config.js.map