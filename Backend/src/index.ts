import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodRoutes from "./routes/food.routes";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
console.log("inside index.ts")
app.use(cors());
app.use(express.json());
app.use("/api/foods", foodRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
