"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controller/movieController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
/* CREATE new movie. */
// router.post('/create', auth, CreateMovie);
router.get('/get-movies', auth_1.auth, movieController_1.GetMovies);
router.patch('/update-movie/:id', auth_1.auth, movieController_1.UpdateMovie);
// router.delete('/delete-movie/:id', auth, DeleteMovie);
exports.default = router;
//# sourceMappingURL=movie.js.map