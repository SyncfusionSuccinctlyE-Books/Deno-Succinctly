// routes.ts

import { Router } from "./deps.ts";
import {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  showWelcome,
  updateDinosaur,
} from "./handlers.ts";

const router = new Router();

router
  .get("/", showWelcome)
  .get("/dinosaurs", getDinosaurs)
  .get("/dinosaurs/:id", getDinosaur)
  .put("/dinosaurs/:id", updateDinosaur)
  .post("/dinosaurs", addDinosaur)
  .delete("/dinosaurs/:id", deleteDinosaur);

export { router };
