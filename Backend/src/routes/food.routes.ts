import express from "express";
import * as foodController from "../controllers/food.controller";


const router = express.Router();
//http://localhost:3000/api/food/ - get
//http://localhost:3000/api/food/id  - get method
//http://localhost:3000/api/food/  -post method
//http://localhost:3000/api/food/id ->put method
//http://localhost:3000/api/food/id -> delete method
debugger
http: router.get("/", foodController.getAllFoods);
router.get("/:id", foodController.getFoodById);
router.post("/", foodController.createFood);
router.put("/:id", foodController.updateFood);
router.delete("/:id", foodController.deleteFood);


export default router;