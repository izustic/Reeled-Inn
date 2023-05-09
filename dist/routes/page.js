"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const movieModel_1 = __importDefault(require("../model/movieModel"));
const utils_1 = require("../utils/utils");
const router = express_1.default.Router();
// Render All Movies in Database
router.get("/", async (req, res, next) => {
    try {
        console.log("ALL MOVIES IN DB FETCHED NON USERS!!!!");
        const page = parseInt(req.query.page, 10) || 1; // default to first page
        const limit = 8; // number of results per page
        const skip = (page - 1) * limit; // calculate offset based on page number
        const count = await movieModel_1.default.countDocuments({});
        const movies = await movieModel_1.default.find({})
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .exec();
        const totalPages = Math.ceil(count / limit); // calculate total number of pages
        return res.render("home", {
            movielist: movies,
            totalPages,
            currentPage: page,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
});
//Render All Movies in Database for User Home Page
router.get("/userhome", async (req, res, next) => {
    try {
        console.log("ALL MOVIES IN DB FETCHED SIGNED USERS!!!!");
        const page = parseInt(req.query.page, 10) || 1; // default to first page
        const limit = 8; // number of results per page
        const skip = (page - 1) * limit; // calculate offset based on page number
        const count = await movieModel_1.default.countDocuments({});
        const movies = await movieModel_1.default.find({})
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .exec();
        const totalPages = Math.ceil(count / limit); // calculate total number of pages
        return res.render("userHome", {
            movielist: movies,
            totalPages,
            currentPage: page,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
});
//Render sign up page
router.get("/register", (req, res, next) => {
    res.render("register");
});
// Render login page
router.get("/login", (req, res, next) => {
    res.render("login");
});
// Render Only User Movies
// Render Only User Movies with Pagination
router.get("/dashboard", auth_1.auth, async (req, res) => {
    try {
        const { id } = req.user;
        const page = parseInt(req.query.page, 10) || 1; // default to first page
        const limit = 8; // number of results per page
        const skip = (page - 1) * limit; // calculate offset based on page number
        const count = await movieModel_1.default.countDocuments({ userId: id });
        const movies = await movieModel_1.default.find({ userId: id })
            .limit(limit)
            .skip(skip)
            .sort({ createdAt: -1 })
            .exec();
        const totalPages = Math.ceil(count / limit); // calculate total number of pages
        return res.render("Dashboard", {
            movielist: movies,
            totalPages,
            currentPage: page,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
});
// Create Movie With EJS
router.post("/dashboard", auth_1.auth, async (req, res) => {
    try {
        const verified = req.user;
        // Validate with Joi. Ensure you're getting string for all the inputs
        const validationResult = utils_1.createMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        // Check if image url already exists for user
        const movies = await movieModel_1.default.find({ userId: verified.id });
        console.log(movies);
        for (const movie of movies) {
            if (movie.image === req.body.image) {
                return res
                    .status(400)
                    .json({ Error: "Image url already exists for user" });
            }
        }
        // Create movie
        const movieRecord = await movieModel_1.default.create({
            ...req.body,
            userId: verified.id,
        });
        return res.redirect("/dashboard");
    }
    catch (err) {
        console.log(err);
    }
});
// Delete movie
router.get("/dashboard/:id", async (req, res) => {
    try {
        console.log("Movie deleted");
        const { id } = req.params;
        await movieModel_1.default.deleteOne({ _id: id });
        return res.redirect("/dashboard");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
});
//Update Movie
router.post("/update/:id", async (req, res) => {
    try {
        console.log("MOVIE UPDATED!!!");
        const { title, description, image, price } = req.body;
        const { id } = req.params; // extract id from the URL
        const validationResult = utils_1.updateMovieSchema.validate({ title, description, image, price }, // pass only the relevant properties to the schema validator
        utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        const movielist = await movieModel_1.default.findById(id);
        if (!movielist) {
            return res.render("Dashboard", { message: "Movie not found" });
        }
        movielist.title = title;
        movielist.description = description;
        movielist.image = image;
        movielist.price = price;
        await movielist.save();
        return res.redirect("/dashboard");
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
//# sourceMappingURL=page.js.map