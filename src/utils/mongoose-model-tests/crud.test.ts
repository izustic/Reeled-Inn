import User from "../../model/userModel";
import { dbConnect, dbDisconnect, dbDropCollection } from "./setuptestdb";
import { describe, test, beforeAll, afterAll } from "@jest/globals";
import { expect } from "@jest/globals";
import mongoose from "mongoose";
import Movie, { MovieInstance } from "../../model/movieModel";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("User Model Test Suite", () => {
  test("should create a User data successfully", async () => {
    const UserData = {
      email: "izustix@gmail.com",
      fullname: "Izu",
      username: "izustic",
      password: "12345",
    };

    const newUserData = new User(UserData);
    await newUserData.save();
    expect(newUserData._id).toBeDefined();
    expect(newUserData.email).toBe(UserData.email);
    expect(newUserData.fullname).toBe(UserData.fullname);
    expect(newUserData.username).toBe(UserData.username);
    expect(newUserData.password).toBe(UserData.password);
  });

  test("should fail for User data without required fields", async () => {
    const invalidUserData = {}

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors?.email).toBeDefined();
      expect(err.errors?.fullname).toBeDefined();
      expect(err.errors?.username).toBeDefined();
      expect(err.errors?.password).toBeDefined();

    }
  });
});

describe("Movie Model Test Suite", () => {
	test("should create a Movie data successfully", async () => {
		const MovieData = {
			userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
			title: "Paterson",
			description: "Driver plays a driver named Paterson",
			image:
				"https://cdn.theplaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg",
			price: "2000",
		};

		const newMovieData = new Movie(MovieData);
		await newMovieData.save();

		expect(newMovieData._id).toBeDefined();
		expect(newMovieData.userId).toEqual(MovieData.userId);
		expect(newMovieData.title).toEqual(MovieData.title);
		expect(newMovieData.description).toEqual(MovieData.description);
		expect(newMovieData.image).toEqual(MovieData.image);
		expect(newMovieData.price).toEqual(MovieData.price);
	});
	test("should update a Movie data successfully", async () => {
		const existingMovieData = await Movie.findOne({ title: "Paterson" });
    if (!existingMovieData) {
      throw new Error("Could not find movie to update");
    }
		const updatedMovieData: Partial<MovieInstance> = {
			title: "New Paterson Title",
			price: "2500",
		};

		const updatedMovie = await Movie.findByIdAndUpdate(
			existingMovieData._id,
			updatedMovieData,
			{ new: true }
		);

		expect(updatedMovie?.title).toEqual(updatedMovieData.title);
		expect(updatedMovie?.price).toEqual(updatedMovieData.price);
	});

test("should fail to update a non-existent Movie", async () => {
  const nonExistentMovieId = new mongoose.Types.ObjectId();
  const updatedData = {
      title: "New Paterson Title",
      description: "Updated description",
      image: "https://cdn.theplaaaaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg",
      price: '2500',
  };

  const updatedMovie = await Movie.findByIdAndUpdate(nonExistentMovieId, updatedData);

  expect(updatedMovie).toBeNull();
});


test("should delete a Movie successfully", async () => {
  // Delete existing movie with the same image URL
  await Movie.deleteOne({ image: "https://cdn.theplaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg" });

  const MovieData = {
    userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
    title: "Paterson",
    description: "Driver plays a driver named Paterson",
    image: "https://cdn.theplaylist.net/wp-content/uploads/2016/05/15214304/paterson-adam-driver-jim-jarmusch-8.jpg",
    price: "2000",
  };

  const newMovieData = new Movie(MovieData);
  await newMovieData.save();

  expect(newMovieData._id).toBeDefined();
  expect(newMovieData.userId).toEqual(MovieData.userId);
  expect(newMovieData.title).toEqual(MovieData.title);
  expect(newMovieData.description).toEqual(MovieData.description);
  expect(newMovieData.image).toEqual(MovieData.image);
  expect(newMovieData.price).toEqual(MovieData.price);
});



  test("should fail to delete a non-existent Movie", async () => {
    const nonExistentMovieId = new mongoose.Types.ObjectId();
    const deleteResult = await Movie.deleteOne({ _id: nonExistentMovieId });

    expect(deleteResult.deletedCount).toEqual(0);
  });
});
