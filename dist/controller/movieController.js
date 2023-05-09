"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMovie = exports.GetMovies = void 0;
const movieModel_1 = __importDefault(require("../model/movieModel"));
const utils_1 = require("../utils/utils");
const GetMovies = async (req, res) => {
    try {
        // /movies/get-movies?limit=3&offset
        const limit = parseInt(req.query?.limit) || 0;
        const offset = parseInt(req.query?.offset) || 0;
        //mongoose find() with countDocuments()
        const getAllMovies = await movieModel_1.default.find({})
            .limit(limit)
            .skip(offset)
            .lean()
            .exec();
        const count = await movieModel_1.default.countDocuments({});
        return res.status(200).json({
            msg: "You have successfully gotten all movies",
            count: count,
            movie: getAllMovies,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.GetMovies = GetMovies;
const UpdateMovie = async (req, res) => {
    try {
        //movies/update-movie/:id
        const { id } = req.params;
        const { title, description, image, price } = req.body;
        //validate with Joi
        const validationResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        const updateMovie = await movieModel_1.default.findOne({ _id: id });
        if (!updateMovie) {
            res.status(400).json({
                err: "Cannot find existing movie",
            });
        }
        const updatedRecord = await updateMovie?.updateOne({
            title,
            description,
            image,
            price,
        });
        return res.status(200).json({
            msg: "You have successfully updated a movie",
            updatedRecord,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.UpdateMovie = UpdateMovie;
//# sourceMappingURL=movieController.js.map