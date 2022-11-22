import express from "express";
import registerUser from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

export default usersRouter;
