"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const setuptestdb_1 = require("./setuptestdb");
const globals_1 = require("@jest/globals");
const globals_2 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const movieModel_1 = __importDefault(require("../../model/movieModel"));
(0, globals_1.beforeAll)(async () => await (0, setuptestdb_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, setuptestdb_1.dbDisconnect)());
(0, globals_1.describe)("User Model Test Suite", () => {
    (0, globals_1.test)("should create a User data successfully", async () => {
        const UserData = {
            email: "izustix@gmail.com",
            fullname: "Izu",
            username: "izustic",
            password: "12345",
        };
        const newUserData = new userModel_1.default(UserData);
        await newUserData.save();
        (0, globals_2.expect)(newUserData._id).toBeDefined();
        (0, globals_2.expect)(newUserData.email).toBe(UserData.email);
        (0, globals_2.expect)(newUserData.fullname).toBe(UserData.fullname);
        (0, globals_2.expect)(newUserData.username).toBe(UserData.username);
        (0, globals_2.expect)(newUserData.password).toBe(UserData.password);
    });
    (0, globals_1.test)("should fail for User data without required fields", async () => {
        const invalidUserData = {};
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors?.email).toBeDefined();
            (0, globals_2.expect)(err.errors?.fullname).toBeDefined();
            (0, globals_2.expect)(err.errors?.username).toBeDefined();
            (0, globals_2.expect)(err.errors?.password).toBeDefined();
        }
    });
});
(0, globals_1.describe)("Movie Model Test Suite", () => {
    (0, globals_1.test)("should create a Movie data successfully", async () => {
        const MovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "Paterson",
            description: "Driver plays a driver named Paterson",
            image: "https://cdn.theplaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg",
            price: "2000",
        };
        const newMovieData = new movieModel_1.default(MovieData);
        await newMovieData.save();
        (0, globals_2.expect)(newMovieData._id).toBeDefined();
        (0, globals_2.expect)(newMovieData.userId).toEqual(MovieData.userId);
        (0, globals_2.expect)(newMovieData.title).toEqual(MovieData.title);
        (0, globals_2.expect)(newMovieData.description).toEqual(MovieData.description);
        (0, globals_2.expect)(newMovieData.image).toEqual(MovieData.image);
        (0, globals_2.expect)(newMovieData.price).toEqual(MovieData.price);
    });
    (0, globals_1.test)("should update a Movie data successfully", async () => {
        const existingMovieData = await movieModel_1.default.findOne({ title: "Paterson" });
        if (!existingMovieData) {
            throw new Error("Could not find movie to update");
        }
        const updatedMovieData = {
            title: "New Paterson Title",
            price: "2500",
        };
        const updatedMovie = await movieModel_1.default.findByIdAndUpdate(existingMovieData._id, updatedMovieData, { new: true });
        (0, globals_2.expect)(updatedMovie?.title).toEqual(updatedMovieData.title);
        (0, globals_2.expect)(updatedMovie?.price).toEqual(updatedMovieData.price);
    });
    (0, globals_1.test)("should fail to update a non-existent Movie", async () => {
        const nonExistentMovieId = new mongoose_1.default.Types.ObjectId();
        const updatedData = {
            title: "New Paterson Title",
            description: "Updated description",
            image: "https://cdn.theplaaaaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg",
            price: '2500',
        };
        const updatedMovie = await movieModel_1.default.findByIdAndUpdate(nonExistentMovieId, updatedData);
        (0, globals_2.expect)(updatedMovie).toBeNull();
    });
    (0, globals_1.test)("should delete a Movie successfully", async () => {
        // Delete existing movie with the same image URL
        await movieModel_1.default.deleteOne({ image: "https://cdn.theplaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg" });
        const MovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "Paterson",
            description: "Driver plays a driver named Paterson",
            image: "https://cdn.theplaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg",
            price: "2000",
        };
        const newMovieData = new movieModel_1.default(MovieData);
        await newMovieData.save();
        (0, globals_2.expect)(newMovieData._id).toBeDefined();
        (0, globals_2.expect)(newMovieData.userId).toEqual(MovieData.userId);
        (0, globals_2.expect)(newMovieData.title).toEqual(MovieData.title);
        (0, globals_2.expect)(newMovieData.description).toEqual(MovieData.description);
        (0, globals_2.expect)(newMovieData.image).toEqual(MovieData.image);
        (0, globals_2.expect)(newMovieData.price).toEqual(MovieData.price);
    });
    (0, globals_1.test)("should fail to delete a non-existent Movie", async () => {
        const nonExistentMovieId = new mongoose_1.default.Types.ObjectId();
        const deleteResult = await movieModel_1.default.deleteOne({ _id: nonExistentMovieId });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(0);
    });
});
//# sourceMappingURL=crud.test.js.map