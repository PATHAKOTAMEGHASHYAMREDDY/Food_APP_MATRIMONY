import { Request, Response } from "express";
import * as foodService from "../services/food.services"


export const getAllFoods = async (req: Request, res: Response) => {
  debugger
  try {
    const foods = await foodService.getAllFoods();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};


export const getFoodById = async (
  
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("get food by id in backend")
    console.log(req.params.id)
    const food = await foodService.getFoodById(req.params.id);
    if (!food) {
      res.status(404).json({ message: "Food item not found" });
      return;
    }
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
 


export const createFood = async (req: Request, res: Response) => {
  try {
    await foodService.createFood(req.body);
    res.status(201).json({ message: "Food created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
//http://localhost:3000/api/food/1
export const updateFood = async (req: Request, res: Response) => {
  try {
    await foodService.updateFood(Number(req.params.id), req.body);
    res.json({ message: "Food updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};


export const deleteFood = async (req: Request, res: Response) => {
  try {
    await foodService.deleteFood(Number(req.params.id));
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
