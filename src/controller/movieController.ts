import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Movie, { MovieInstance } from "../model/movieModel";
import { createMovieSchema, options, updateMovieSchema } from "../utils/utils";
import { Query } from "mongoose";

export const GetMovies = async (req: Request | any, res: Response) => {
  try {
    // /movies/get-movies?limit=3&offset
    const limit: number = parseInt(req.query?.limit as string) || 0;
    const offset: number = parseInt(req.query?.offset as string) || 0;

    //mongoose find() with countDocuments()
    const getAllMovies = await Movie.find({})
      .limit(limit)
      .skip(offset)
      .lean()
      .exec();
    const count = await Movie.countDocuments({});

    return res.status(200).json({
      msg: "You have successfully gotten all movies",
      count: count,
      movie: getAllMovies,
    });
  } catch (err) {
    console.log(err);
  }
};



export const UpdateMovie = async (req: Request, res: Response) => {
  try {
    //movies/update-movie/:id
    const { id } = req.params;
    const { title, description, image, price } = req.body;

    //validate with Joi
    const validationResult = updateMovieSchema.validate(req.body, options);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message });
    }

    const updateMovie = await Movie.findOne({ _id: id });

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
  } catch (err) {
    console.log(err);
  }
};
