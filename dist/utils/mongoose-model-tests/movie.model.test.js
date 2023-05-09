"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_core_1 = require("mongodb-memory-server-core");
const mongoose_1 = __importDefault(require("mongoose"));
const movieModel_1 = __importDefault(require("../../model/movieModel"));
let mongoServer;
beforeAll(async () => {
    mongoServer = new mongodb_memory_server_core_1.MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose_1.default.connect(mongoUri);
});
afterAll(async () => {
    await mongoose_1.default.disconnect();
    await mongoServer.stop();
});
afterEach(async () => {
    await mongoose_1.default.connection.dropDatabase();
});
describe("Movie Model", () => {
    it("should create a movie successfully", async () => {
        const validMovie = {
            title: "The Matrix",
            description: "Lana Wachowski and the Council of Agents",
            image: "www.image.jpg",
            price: 20,
        };
        const newMovie = await movieModel_1.default.create(validMovie);
        expect(newMovie._id).toBeDefined();
        expect(newMovie.title).toBe(validMovie.title);
        expect(newMovie.description).toBe(validMovie.description);
        expect(newMovie.image).toBe(validMovie.image);
        expect(newMovie.price).toBe(validMovie.price);
    });
    it("should fail for movie without required fields", async () => {
        const invalidMovie = {
            title: "The Matrix",
            director: "Lana Wachowski",
            genre: "Science Fiction",
        };
        try {
            const newMovie = await movieModel_1.default.create(invalidMovie);
            fail("Movie should not be created without required fields.");
        }
        catch (error) {
            expect(error).toBeInstanceOf(mongoose_1.default.Error.ValidationError);
            expect(error.errors.description).toBeDefined();
            expect(error.errors.image).toBeDefined();
            expect(error.errors.price).toBeDefined();
        }
    });
    it("should fail for movie with fields of wrong type", async () => {
        const invalidMovie = {
            title: "The Matrix",
            director: "Lana Wachowski",
            genre: "Science Fiction",
            year: "1999",
            rating: "8.7",
        };
        try {
            const newMovie = await movieModel_1.default.create(invalidMovie);
            fail("Movie should not be created with fields of wrong type.");
        }
        catch (error) {
            expect(error).toBeInstanceOf(mongoose_1.default.Error.ValidationError);
            expect(error.errors.year).toBeDefined();
            expect(error.errors.rating).toBeDefined();
        }
    });
});
//# sourceMappingURL=movie.model.test.js.map