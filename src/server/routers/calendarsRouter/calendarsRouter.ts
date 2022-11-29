import express from "express";
import { getCalendar } from "../../controllers/calendarsControllers/calendarsControllers.js";
import { auth } from "../../middlewares/auth/auth.js";

import routes from "../routes.js";

const { getCalendarRouter } = routes;

const calendarsRouter = express.Router();

calendarsRouter.get(getCalendarRouter, auth, getCalendar);

export default calendarsRouter;
