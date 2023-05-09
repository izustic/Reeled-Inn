import express from 'express';
import {
  // CreateMovie, 
  GetMovies, 
  UpdateMovie, 
  // DeleteMovie
} from '../controller/movieController'
import {auth} from "../middlewares/auth"
const router = express.Router();

/* CREATE new movie. */
// router.post('/create', auth, CreateMovie);
router.get('/get-movies', auth, GetMovies);
router.patch('/update-movie/:id', auth, UpdateMovie);
// router.delete('/delete-movie/:id', auth, DeleteMovie);

export default router
