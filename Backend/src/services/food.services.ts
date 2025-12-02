import { db } from "../config/db.config";
import { IFoodItem } from "../models/IFoodItem";
import { RowDataPacket } from "mysql2";


export const getAllFoods = async (): Promise<IFoodItem[]> => {
  debugger
  try {
    return await new Promise((resolve, reject) => {
      db.query("SELECT * FROM food_items", (err, results) => {
        if (err) return reject(err);
        resolve(results as IFoodItem[]);
      });
    });
  } catch (err) {
    throw err;
  }
};


export const getFoodById = async (id: string): Promise<IFoodItem | null> => {
  try {
    const fid:Number = Number(id)
  //  console.log("getFoodbyID" + typeof id + typeof fid)
    return await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM food_items WHERE id = ?",
        [fid],
        (err, results) => {
          if (err) return reject(err);
          const rows = results as RowDataPacket[];
          console.log(rows)
          resolve(rows[0] as IFoodItem);
        }
      );
    });
  } catch (err) {
    throw err;
  }
};


export const createFood = async (food: IFoodItem): Promise<void> => {
  try {
    const { name, price, category, description } = food;
    await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO food_items (name, price, category, description) VALUES (?, ?, ?, ?)",
        [name, price, category, description],
        (err) => {
          if (err) return reject(err);
          resolve(true);
        }
      );
    });
  } catch (err) {
    throw err;
  }
};


export const updateFood = async (
  id: number,
  food: IFoodItem
): Promise<void> => {
  try {
    const { name, price, category, description } = food;
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE food_items SET name = ?, price = ?, category = ?, description = ? WHERE id = ?",
        [name, price, category, description, id],
        (err) => {
          if (err) return reject(err);
          resolve(true);
        }
      );
    });
  } catch (err) {
    throw err;
  }
};


export const deleteFood = async (id: number): Promise<void> => {
  try {
    await new Promise((resolve, reject) => {
      console.log(id + "and" + "type of id =", typeof id);
      db.query("DELETE FROM food_items WHERE id = ?", [id], (err) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  } catch (err) {
    throw err;
  }
};
